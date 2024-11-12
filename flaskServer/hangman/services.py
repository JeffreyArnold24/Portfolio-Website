from flask import abort
from authentication.services import *
from .models import HangmanGameInstance
from hangman import db
from hangman import wordList
from authentication.services import authTokenExists

"""
Creates an empty word of '_' characters.

:param numberCharacters: The number of '_' characters in the word.

:return: The empty word of '_' characters.

"""
def create_word(numberCharacters):
    return '_' * numberCharacters

"""
Checks if the user already has a game instance in the database.

:param username: The user whose game instance is being checked.

:return: True if there is a game instance already and False otherwise.

"""
def does_user_have_game(username):
    game_instance = HangmanGameInstance.query.filter_by(username=username).first()
    if game_instance:
        return True
    return False


"""
Creates a key to be used in the word_dic. This key represents
what the hangman word would look like if "word" was the word for
the game and letter was guessed. It uses the "key_word" as a starting spot

Ex: If "titan" was the word and t was the letter guessed, the key
    would be "t_t__". 
    If the key_word is "___a_", the word was "titan" and the guessed
    letter is t, the key would be "t_ta_".

:param word: The word that is having the key created for it.
:param letter: The letter that is being checked for.
:param key_word: A string of '_' characters except for the letters that we know are in the word.

:return: True if there is a game instance already and False otherwise.

"""
def create_key(word, letter, key_word):
        key = ""
        for index, char in enumerate(word):
            if (char == letter):
                key = key + letter
            else:
                if (key_word[index] != '_'):
                    key = key + key_word[index]
                else:
                    key = key + '_'
        return key

"""
Finds the key with the most values and returns all of the keys and values
that have that many values.

:param word_dic: The dictionary to be filtered.

:return: The keys and values of the dictionary where there are the most values.

"""
def filter_dictionary_for_size(word_dic):
    max_size = max(len(value) for value in word_dic.values())
    return {key: value for key, value in word_dic.items() if len(value) == max_size}

"""
Finds the key with the fewest number of characters.

:param word_dic: The dictionary to be filtered.

:return: The keys and values of the dictionary where there are the fewest letter characters.

"""
def filter_frequency(letter, word_dic):
    leastCommon = min(sum(1 for char in key if char == letter) for key in word_dic)
    return {key: value for key, value in word_dic.items() if sum(1 for char in key if char == letter) == leastCommon}

"""
Finds the key where the value of the key is the smallest.

:param word_dic: The dictionary to be filtered.

:return: The keys and values of the smallest key.

"""
def filter_right(word_dic):
    smallest = min(word_dic.keys())
    return {key: value for key, value in word_dic.items() if key == smallest}
    
   
"""
The main algorithm that determines the words in the hangman game.
Always returns a word that represents the hardest set of words to be guessed
according to the letters that have been guessed.

:param letters: The letters already guessed including the current letter being guessed.
:param word_length: The length of the word being guessed.
:param current_word: A string of '_' characters except for the letters that we know are in the word.

:return: The current state of the hangman word according to the letters guessed.

"""
def run_word_algorithm(letters, word_length, current_word):
    key_word = current_word
    possibleWords = wordList

    # for each letter, determine what the hardest set of words would be
    for letter in letters:
        word_dic = {}

        # organizes each word into a dictionary where the key is what the
        # word in the dictionary would look like if the given letter
        # was guessed and the value is an array of words that would
        # all look the same given the guess.
        # Ex. The currently known word is "_____" and the letter guessed was 'p',  "optic" and "spits" would both be under the key "_p___"
        # Ex. The currently known word is "__a__" and the letter guessed was 's',  "small" and "smack" would both be under the key "s_a__"
        for word in possibleWords:
            if len(word) != word_length:
                continue
            key = create_key(word, letter, key_word)
            if key in word_dic:
                word_dic[key].add(word)
            else:
                word_dic[key] = {word}
        
        # find the key with the most values
        word_dic = filter_dictionary_for_size(word_dic)
        if len(word_dic) > 1:
            # if still multiple keys, find the key with the fewest letters
            word_dic = filter_frequency(letter, word_dic)
            if len(word_dic) > 1:
                # if still multiple keys, pick the first one
                word_dic = filter_right(word_dic)
                for word in word_dic.keys():
                    key_word = word
            else:
                # set the new key word to the key in the dictionary
                for word in word_dic.keys():
                    key_word = word
        else:
            # set the new key word to the key in the dictionary
            for word in word_dic.keys():
                    key_word = word
                    
        # use the remaining set of words as the dictionary for the next iteration of the for loop         
        possibleWords = word_dic[key_word]

    
    return key_word
                
     
"""
Initializes the hangman game including creating or reseting
an instance of the game in the database.

:param username: The username of the user that started the game.
:param authToken: The authorization token of the user.
:param numberCharacters: How many letters should be in the hangman word.

:return word: A word that is all '_' characters to represent the hangman word.
"""
def initialize_game(username, authToken, numberCharacters):

    # throws an error if the user is not signed in
    if not authTokenExists(authToken):
        abort(400, description="User not recognized by system.")
    
    # checks if the user already has an instance of the game in the database
    # if so, the game instance is deleted
    if does_user_have_game(username):
        rows_deleted = HangmanGameInstance.query.filter_by(username=username).delete()
        db.session.commit()

    #creates a new word to be used as the word that the user initially sees
    new_word = create_word(numberCharacters)  

    # creates a new instance of the game in the database
    game_instance = HangmanGameInstance(
        username = username,
        guessedLetters = "",
        usedGuesses = 0,
        currentWord = new_word
    )
    db.session.add(game_instance)
    db.session.commit()

    # returns the temporary word that the user sees
    return new_word


"""
Performs the guess algorithm for a users guess in hangman.
Takes the given letter and returns a string that is all '_'
characters except for the letters that we know are in
the word based on this guess and previous guesses.

:param username: The username of the user that started the game.
:param authToken: The authorization token of the user.
:param letter: The letter guessed

:return new_word: The current state of the hangman word.

"""
def guess_letter_service(username, authToken, guessedLetter):

    # throws an error if the user is not signed in
    if not authTokenExists(authToken):
        abort(400, description="User not recognized by system.")

    # retrieve the curent instance of the game from the database
    game_instance = HangmanGameInstance.query.filter_by(username=username).first()

    # throws an error if there is no game instance
    if not game_instance:
        abort(400, description= "Game instance not found.")

    # throws an error if the letter was alread guessed
    if guessedLetter in game_instance.guessedLetters:
        abort(400, description= "Letter already guessed.")

    guessedLetters = game_instance.guessedLetters + guessedLetter.lower() 
    
    # the main algorithm that determines how the guessed letter interacts with the information that we already know
    new_word = run_word_algorithm(guessedLetters, len(game_instance.currentWord), game_instance.currentWord)

    # updates the database with the guessed letter and the current known word
    game_instance.guessedLetters = guessedLetters
    game_instance.currentWord = new_word
    db.session.commit()

    return new_word
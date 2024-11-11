from flask import abort
from authentication.services import *
from .models import HangmanGameInstance
from hangman import db
from hangman import wordList
from authentication.services import authTokenExists

def create_word(numberCharacters):
    return '_' * numberCharacters

def does_user_have_game(username):
    game_instance = HangmanGameInstance.query.filter_by(username=username).first()
    if game_instance:
        return True
    return False

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

def filter_dictionary_for_size(word_dic):
    max_size = max(len(value) for value in word_dic.values())
    return {key: value for key, value in word_dic.items() if len(value) == max_size}

def filter_frequency(letter, word_dic):
    leastCommon = min(sum(1 for char in key if char == letter) for key in word_dic)
    return {key: value for key, value in word_dic.items() if sum(1 for char in key if char == letter) == leastCommon}

def filter_right(letter, word_dic):
    smallest = min(word_dic.keys())
    return {key: value for key, value in word_dic.items() if key == smallest}
    

    

def run_word_algorithm(letters, word_length, current_word):
    key_word = current_word
    possibleWords = wordList
    for letter in letters:
        print(letter)
        print (possibleWords)
        word_dic = {}
        for word in possibleWords:
            if len(word) != word_length:
                continue
            key = create_key(word, letter, key_word)
            if key in word_dic:
                word_dic[key].add(word)
            else:
                word_dic[key] = {word}
        print(word_dic)
        word_dic = filter_dictionary_for_size(word_dic)
        if len(word_dic) > 1:
            word_dic = filter_frequency(letter, word_dic)
            if len(word_dic) > 1:
                word_dic = filter_right(letter, word_dic)
                for word in word_dic.keys():
                    key_word = word
            else:
                for word in word_dic.keys():
                    key_word = word
        else:
            for word in word_dic.keys():
                    key_word = word
        possibleWords = word_dic[key_word]
    print(word_dic)
    return key_word
                



        

def initialize_game(username, authToken, numberCharacters):

    if not authTokenExists(authToken):
        abort(400, description="User not recognized by system.")
    
    new_word = create_word(numberCharacters)  
    if does_user_have_game(username):
        rows_deleted = HangmanGameInstance.query.filter_by(username=username).delete()
        db.session.commit()

    game_instance = HangmanGameInstance(
        username = username,
        guessedLetters = "",
        usedGuesses = 0,
        currentWord = new_word
    )

    db.session.add(game_instance)
    db.session.commit()

    return new_word

def guess_letter_service(username, authToken, guessedLetter):
    game_instance = HangmanGameInstance.query.filter_by(username=username).first()

    if not game_instance:
        abort(400, description= "Game instance not found.")

    if guessedLetter in game_instance.guessedLetters:
        abort(400, description= "Letter already guessed.")

    guessedLetters = game_instance.guessedLetters + guessedLetter.lower() 
    
    new_word = run_word_algorithm(guessedLetters, len(game_instance.currentWord), game_instance.currentWord)

    game_instance.guessedLetters = guessedLetters
    game_instance.currentWord = new_word
    db.session.commit()
    return new_word
from hangman import app
from flask import jsonify, request
from .services import initialize_game, guess_letter_service

"""
Initializes the game of hangman.

:param username: The username of the user that started the game.
:param authToken: The authorization token of the user.
:param numberCharacters: How many letters should be in the hangman word.

:return word: A word that is all '_' characters to represent the hangman word.

"""
@app.route('/hangman/starthangman', methods=['POST'])
def initialize_hangman():
    data = request.get_json()
    word = initialize_game(data.get('username'), data.get('authToken'), data.get('numberCharacters'))
    response = {
        "word": word,
    }
    return jsonify(response), 200

"""
Performs the guess algorithm for a users guess in hangman.
Takes the given letter and returns a string that is all '_'
characters except for the letters that we know are in
the word based on this guess and previous guesses.

:param username: The username of the user that started the game.
:param authToken: The authorization token of the user.
:param letter: The letter guessed

:return word: The current state of the hangman word.

"""
@app.route('/hangman/guessletter', methods=['POST'])
def guess_letter():
    data = request.get_json()
    word = guess_letter_service(data.get('username'), data.get('authToken'), data.get('letter'))
    response = {
        "word": word,
    }
    return jsonify(response), 200
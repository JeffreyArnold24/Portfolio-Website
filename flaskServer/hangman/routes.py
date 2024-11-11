from hangman import app
from flask import jsonify, request
from .services import initialize_game, guess_letter_service

items = [
    {'id': 1, 'name': 'Item 1', 'price': 10.99},
    {'id': 2, 'name': 'Item 2', 'price': 19.99}
]

@app.route('/hangman/starthangman', methods=['POST'])
def initialize_hangman():
    data = request.get_json()
    word = initialize_game(data.get('username'), data.get('authToken'), data.get('numberCharacters'))
    response = {
        "word": word,
    }
    return jsonify(response), 200

@app.route('/hangman/guessletter', methods=['POST'])
def guess_letter():
    data = request.get_json()
    word = guess_letter_service(data.get('username'), data.get('authToken'), data.get('letter'))
    response = {
        "word": word,
    }
    return jsonify(response), 200
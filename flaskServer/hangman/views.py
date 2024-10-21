from hangman import app
from flask import jsonify, request
from .services import initialize_game

items = [
    {'id': 1, 'name': 'Item 1', 'price': 10.99},
    {'id': 2, 'name': 'Item 2', 'price': 19.99}
]

@app.route('/hangman/starthangman', methods=['POST'])
def initialize_hangman():
    data = request.get_json()
    word = initialize_game(data.get('username'), data.get('numberCharacters'))
    return jsonify(items), 200
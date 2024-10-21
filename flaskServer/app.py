from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

items = [
    {'id': 1, 'name': 'Item 1', 'price': 10.99},
    {'id': 2, 'name': 'Item 2', 'price': 19.99}
]

@app.route('/hangman/starthangman', methods=['POST'])
def get_items():
    return jsonify(items), 200

if __name__ == '__main__':
    app.run(debug=True)
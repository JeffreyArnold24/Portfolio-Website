from flask import request
from flask_cors import CORS
from hangman import app as hangmanApp
from authentication import app as authApp

CORS(hangmanApp, resources={r"/*": {"origins": "http://localhost:3000"}})
CORS(hangmanApp, resources={r"/*": {"origins": "http://localhost:3001"}})
CORS(hangmanApp, resources={r"/*": {"origins": "https://jeffreyarnoldportfolio.com"}})

if __name__ == '__main__':
    hangmanApp.run(debug=False, host="0.0.0.0", port=8081)
    authApp.run(debug=False, host="0.0.0.0", port=8082)
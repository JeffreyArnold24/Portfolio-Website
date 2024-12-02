from flask import request
from flask_cors import CORS
from hangman import app as hangmanApp
from authentication import app as authApp

CORS(hangmanApp, resources={r"/*": {"origins": "http://localhost:3000"}})

if __name__ == '__main__':
    hangmanApp.run(debug=True, port=8081)
    authApp.run(debug=True, port=8082)
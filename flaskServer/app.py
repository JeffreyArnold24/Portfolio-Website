from flask import request
from flask_cors import CORS
from flask_sslify import SSLify
from hangman import app as hangmanApp
from authentication import app as authApp


CORS(hangmanApp, resources={r"/*": {"origins": "http://localhost:3000"}})
CORS(hangmanApp, resources={r"/*": {"origins": "https://jeffreyarnoldportfolio.com"}})

if __name__ == '__main__':
    sslify = SSLify(hangmanApp)
    sslify = SSLify(authApp)
    hangmanApp.run(debug=False, host="0.0.0.0", port=8081, ssl_context=('cert.pem', 'key.pem'))
    authApp.run(debug=False, host="0.0.0.0", port=8082, ssl_context=('cert.pem', 'key.pem'))
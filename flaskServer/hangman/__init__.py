from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///../../sqlite database/web_database.db'
db = SQLAlchemy()
db.init_app(app)

# load the dictionary for hangman
with open("resources/dictionary.txt", "r") as file:
    wordList = file.read().splitlines()

from hangman import routes
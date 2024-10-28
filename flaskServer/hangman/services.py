from authentication.services import *
from .models import HangmanGameInstance
from hangman import db

def create_word(numberCharacters):
    return '_' * numberCharacters

def initialize_game(username, authToken, numberCharacters):
    new_word = create_word(numberCharacters)    
    game_instance = HangmanGameInstance(
        username = username,
        guessedLetters = "",
        usedGuesses = 0,
        currentWord = new_word
    )

    db.session.add(game_instance)
    db.session.commit()

    return new_word
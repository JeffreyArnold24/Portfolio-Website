from authentication.services import *
from .models import HangmanGameInstance
from hangman import db
from authentication.services import authTokenExists

def create_word(numberCharacters):
    return '_' * numberCharacters

def does_user_have_game(username):
    game_instance = HangmanGameInstance.query.filter_by(username=username).first()
    if game_instance:
        return True
    return False


def initialize_game(username, authToken, numberCharacters):

    if not authTokenExists(authToken):
        return "Error"
    
    if does_user_have_game(username):
        return "True"
    else:
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
from hangman import db

class HangmanGameInstance(db.Model):
    __tablename__ = 'hangman_game_instance'

    username = db.Column(db.Text, primary_key=True, nullable=False)
    guessedLetters = db.Column(db.Text, nullable=False)
    usedGuesses = db.Column(db.Integer, nullable=False)
    currentWord = db.Column(db.Text, nullable=False)
    
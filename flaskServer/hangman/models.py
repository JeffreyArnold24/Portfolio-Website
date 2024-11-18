from hangman import db

class HangmanGameInstance(db.Model):
    __tablename__ = 'hangman_game_instance'

    username = db.Column(db.Text, primary_key=True, nullable=False)
    guessedLetters = db.Column(db.Text, nullable=False)
    usedGuesses = db.Column(db.Integer, nullable=False)
    currentWord = db.Column(db.Text, nullable=False)

class Leaderboard(db.Model):
    __tablename__ = 'hangman_leaderboard'

    username = db.Column(db.Text, primary_key=True, nullable=False)
    final_word = db.Column(db.Text, nullable=False)
    number_guesses = db.Column(db.Integer, nullable=False)
    
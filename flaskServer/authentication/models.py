from hangman import db

class AuthToken(db.Model):
    __tablename__ = 'authToken'

    username = db.Column(db.Text, primary_key=True, nullable=False)
    authToken = db.Column(db.Text, nullable=False)
    creationDateTime = db.Column(db.Text, nullable=False)
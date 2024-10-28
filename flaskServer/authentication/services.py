from .models import AuthToken
from authentication import db


def authTokenExists(authToken):

    auth_token_instance = AuthToken.query.filter_by(authToken=authToken).first()

    if auth_token_instance:
        return True
    return False
from .models import AuthToken
from authentication import db

"""
Checks if an authToken exists in the database.

:param authToken: The authToken to check for.

:return: True if the authToken exists and false otherwise.

"""
def authTokenExists(authToken):

    auth_token_instance = AuthToken.query.filter_by(authToken=authToken).first()

    if auth_token_instance:
        return True
    return False
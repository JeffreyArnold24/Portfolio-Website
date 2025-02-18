# Flask Server
This server is currently used only to run an evil hangman game. The game dynamically filters out words from a dictionary to make guessing the word as hard as possible for the user.

# Authenticaion
This app is used to authenticate that a user is authorized to interact with the application through the usage of an authtoken.

It does not create authtokens because that functionality is in the Spring Boot server.

# Hangman
This app contains the main functionality of the hangman game. It can:
- Initialize a game between 3 and 10 letters and return the current state of the word.
- Guess a letter and return the current state of the word based on the letter guessed and previous letters. To do so, a dictionary or words is used and words are filtered out of the dictionary until there is only one possible word and all of the letters of that word are guessed.

 # Resources
 This currently just contains the dictionary of words. In the future, more resources may be added.

 # App.py
 This is just the file that starts and runs the server and all of its apps.

 # Notes
 The code is self documenting and contains plenty of comments. If you have specifics about algorithms used check the code and you should find the answers to your questions.

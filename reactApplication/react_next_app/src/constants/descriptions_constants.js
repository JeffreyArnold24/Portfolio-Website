export const componentDescriptions = {
    hangman: `Function: This hangman game uses an algorithm to make it as hard as possible for the user to guess the correct word\n
              Server Type: Flask\n
              Algorithm: When the user guesses a letter, the algorithm filters all of the possible words into a dictionary.
              The key for the dictionary is what that word would look like if the letter was guessed and the values are arrays of all of the words that would look the same.
              For example, if 'D' was guessed, the key for 'SLEDS' and 'BONDS' would both be '___D_' while the key for 'DINGO' would be 'D____'.
              After sorting the words into the dictionary, a maximum of three filters are used to eliminate words.
              The first filter finds the key with the most values in it.
              The second filter finds the key with the fewest known letters.
              The third filter simply picks a key.
              When there is only one key remaining, the keys and the words with that key are discarded.
              This happends for each letter that is guessed until there is only one word that can be guessed and all of the letters of that word are guessed.`
}
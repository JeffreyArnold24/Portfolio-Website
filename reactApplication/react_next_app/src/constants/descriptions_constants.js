export const componentDescriptions = {
    aboutMe:    `My name is Jeffrey Arnold.\n
                I have created this website as a means to showcase my coding knowledge and capabilities.\n
                Under each aspect of the website, there will be a description section that explains important information such as:\n
                The type of server used\n
                How to use the module\n
                Any algorithms or design principles used\n
                etc.\n
                Please look around and try things out.
                `,
    
    signIn:     `
                Function: Many aspects of this of this site store information on a database. This is just to give the user a primary key in the database.
                Because I expect a lot of turn-around on this site, if you sign-in, it will automatically create a user for you.\n
                Server Type: Springboot\n
                Principles Applied:
                The back-end uses dependency injection using springboot beans to manage each components and their lifecycles.
                Classes use inheritance through interfaces to make swaping out components easier such as changing databases.
                Passwords are properly hashed when stored in the database.
                Authtokens are created and used in other areas of the website to verify login.\n
                Extra Notes:
                While I do hash the passwords, please use proper cybersecurity principles and don't reuse passwords that you use elsewhere.
                I store the username and the authtoken in local storage which can be found in the developer tools for you to see.
                All users that are older than 30 days are deleted so that the databases don't become cluttered. All information associated with them is deleted as well.
                `,

    hangman:    `Function: This hangman game uses an algorithm to make it as hard as possible for the user to guess the correct word.\n
                Server Type: Flask\n
                Algorithm: When the user guesses a letter, the algorithm filters all of the possible words into a dictionary.
                The key for the dictionary is what that word would look like if the letter was guessed and the values are arrays of all of the words that would look the same.
                For example, if 'D' was guessed, the key for 'SLEDS' and 'BONDS' would both be '___D_' while the key for 'DINGO' would be 'D____'.
                After sorting the words into the dictionary, a maximum of three filters are used to eliminate words.
                The first filter finds the key with the most values in it.
                The second filter finds the key with the fewest known letters.
                The third filter simply picks a key.
                When there is only one key remaining, the keys and the words with that key are discarded.
                This happends for each letter that is guessed until there is only one word that can be guessed and all of the letters of that word are guessed.`,
}
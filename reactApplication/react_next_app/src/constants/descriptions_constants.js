export const componentDescriptions = {
    aboutMe:    `I graduated from BYU with a bachelor's degree in Computer Science.
                I am a full-stack developer with experience in developing dynamic solutions.
                I love the process of turning ideas into a reality and trying to solve the puzzles inherent in coding.
                I consider myself a self-starter. I am always eager to learn and improve.
                This was the primary motivation for the creation of this website.
                I hope that you take the time to look around and see what skills that I can offer for your company.
                `,

    aboutSite:  `This site has two primary purposes. The first is for me to give me a way to learn
                more about web-development and to help me to strengthen my coding knowledge and
                abilities. The other purpose to is have a place where I can showcase my talents
                to employers and recruiters. This site was built using React on the front-end
                and is currently connected to a SpringBoot server and a Flask server. In the future
                I intend on expanding on this as I learn new tools and frameworks. If you have any
                questions, please email me.
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

    inventory:  `Function: Demonstrate database management including creating, updating, and deleting as well as user-based permissions.\n
                Server Type: Ruby on Rails\n
                Skills Demonstrated: User-based permissions, database management, pagination, data organization.\n
                Roles:
                Admin - Access to read and write privileges for everything.
                Auditor - Access to read privileges for everything.
                Manager - Access to read and write privileges for everything in a given department.
                Technician - Access to read and write privileges for everything in a given department except for deletion.
                Employee - Access to read privileges for all assets assigned to them.`,
}
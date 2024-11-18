"use client";

import styles from './styles/hangman.css'
import { useState, useEffect } from "react";
import Image from 'next/image';
import { start_hangman, guess_letter, get_leaderboard } from '@/controllers/hangman_controller';



export default function Hangman() {

    const [hangmanGameStarted, setHangmanGameStarted] = useState(false);
    const [numberCharacters, setNumberCharacters] = useState(3);
    const [letter, setLetter] = useState();
    const [displayWord, setDisplayWord] = useState("");
    const [displayMessage, setDisplayMessage] = useState("")
    const [guessedLetters, setGuessedLetters] = useState("")

    useEffect(() => {
        const fetchLeaderboard = async() => {
            get_leaderboard();
        };

        fetchLeaderboard();
    }, []);

    const start_game = async () => {
        const {success, word} = await start_hangman(numberCharacters);
        if (success){
            setHangmanGameStarted(true)
            setDisplayWord(word)
            setDisplayMessage("")
            setGuessedLetters("")
        }
        else
        {
            setDisplayMessage(word)
        }
    }

    const guess_letter_box = async () => {
        const {success, word} = await guess_letter(letter);
        if (success){
            setDisplayMessage("")
            setDisplayWord(word)
            setGuessedLetters(guessedLetters + letter)
        }
        else
        {
            setDisplayMessage(word)
        }
    }


    return (
        //Everything in the hangman game
        <div className="hangman">
            <h2>Hangman</h2>
            {/* Contains everything in Hangman except the title*/}
            <div className="main_hangman_game">
                {/* Contains the Hangman image, word, guess bar, and reset game containers*/}
                <div className="hangman_left_section">
                    {hangmanGameStarted ? (
                        <Image
                        src="/hangman/base.png"
                        alt={"Hangman"}
                        width={256}
                        height={256}
                        />
                    ) : (<></>)}
                    
                    {displayWord && ( // Conditionally render the word if it exists
                        <div className="displayWord">
                            <h2>{displayWord}</h2>
                        </div>
                    )}

                    {hangmanGameStarted && ( // If the game is started show inputs
                    <div className="letterInput">
                        <label htmlFor="letterInput">Guess a letter: </label>
                        <input
                            type="text"
                            id="letterInput"
                            value={letter}
                            onChange={(e) => setLetter(e.target.value.toUpperCase())}
                            maxLength={1}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  guess_letter_box(); // Call the function when Enter is pressed
                                  setLetter("");
                                }
                            }}
                        />
                        <button onClick={() => {
                            guess_letter_box();
                            setLetter("");}}>Guess Letter</button>
                    </div>
                    )}

                    {/* Used to set the conditions of the game and start it*/}
                    <div className="gameStart">
                        <label htmlFor="numberDropdown">Number of letters: </label>
                        <select id="numberDropdown"
                                value={numberCharacters}  // Bind value to the state
                                onChange={(e) => setNumberCharacters(Number(e.target.value))}>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                        {!hangmanGameStarted ? (
                            <button onClick={() => start_game()}>Start Game</button>
                        ) : (<button onClick={() => start_game()}>Reset Game</button>)}
                    </div>
                </div>
                {/* Used to display errors*/}
                <div className = "hangman_middle_section">
                    <div className="guessedLetters">
                        <p>{guessedLetters}</p>
                    </div>
                    <div className="messageBox">
                        <p>{displayMessage}</p>
                    </div>
                </div>
                <div className = "hangman_right_section">
                    <div className="leaderboard">
                        <p>leaderboard</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
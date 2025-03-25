"use client";

import styles from './hangman.css'
import { useState, useEffect } from "react";
import Image from 'next/image';
import { start_hangman, guess_letter, get_leaderboard } from '@/controllers/hangman_controller';
import Accordion from '../accordion/accordion';
import { componentDescriptions } from '@/constants/descriptions_constants';



export default function Hangman() {

    const [hangmanGameStarted, setHangmanGameStarted] = useState(false);
    const [numberCharacters, setNumberCharacters] = useState(3);
    const [letter, setLetter] = useState();
    const [displayWord, setDisplayWord] = useState("");
    const [displayMessage, setDisplayMessage] = useState("")
    const [guessedLetters, setGuessedLetters] = useState("")
    const [leaderboard, setLeaderboard] = useState([]);
    const [isGuessButtonDisabled, setIsGuessButtonDisabled] = useState(false);
    const [hangmanStage, setHangmanStage] = useState(0);
    const hangmanImage = `hangman${hangmanStage}`
    const description = componentDescriptions.hangman

    {/*On page load, fetches and sets the leaderboard for hangman.*/}
    useEffect(() => {
        const fetchLeaderboard = async() => {
            const leaderboard = await get_leaderboard();
            setLeaderboard(leaderboard)
        };

        fetchLeaderboard();
    }, []);

    {/*Initializes the hangman game.*/}
    const start_game = async () => {
        const {success, word} = await start_hangman(numberCharacters);
        if (success){
            setHangmanGameStarted(true)
            setDisplayWord(word)
            setDisplayMessage("")
            setGuessedLetters("")
            setHangmanStage(0)
        }
        else
        {
            setDisplayMessage(word)
        }
    }

    {/*Tells the player they lost after 6 incorrect guesses.*/}
    useEffect(() => {
        if (hangmanStage === 6) {
            setDisplayMessage("You lose! Keep playing though to try and guess the word.");
        }
    }, [hangmanStage]);

    {/*Updates the hangman game based on a guessed letter.*/}
    const guess_letter_box = async () => {
        if (!isGuessButtonDisabled) {
            setIsGuessButtonDisabled(true)
            const {success, word} = await guess_letter(letter);
            if (success){
                setDisplayMessage("")
                if (word == displayWord && hangmanStage < 6){
                    setHangmanStage(hangmanStage + 1)
                }
                setDisplayWord(word)
                setGuessedLetters(guessedLetters + letter)
                setIsGuessButtonDisabled(false)
                if (!word.includes('_')){
                    setDisplayMessage("You won in " + (guessedLetters.length + 1) + " turns!")
                    setIsGuessButtonDisabled(true)
                }
            }
            else
            {
                setDisplayMessage(word)
                setIsGuessButtonDisabled(false)
            }
            
        }

    }


    return (
        //Everything in the hangman game
        <div className="hangman">
            <h1>Hangman</h1>
            {/* Contains everything in Hangman except the title*/}
            <div className ="hangmanDescription">
                <Accordion title = "Description" description = {description} />
            </div>
            <div className="main_hangman_game">
                {/* Contains the Hangman image, word, guess bar, and reset game containers*/}
                <div className="hangman_left_section">
                    {hangmanGameStarted && (
                        <Image
                        src={`/hangman/${hangmanImage}.png`}
                        alt={"Hangman"}
                        width={256}
                        height={256}
                        className='invertible'
                        />
                    )}
                    
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
                {/* Used to display information for the user*/}
                
                <div className = "hangman_middle_section">
                    {/* Letters the user has guessed*/}
                    {hangmanGameStarted && (
                    <div className="guessedLetters">
                        <p>{guessedLetters}</p>
                    </div>
                    )}
                    {/*Information such as guessing a duplicate letter or a server error*/}
                    <div className="messageBox">
                        <h3>{displayMessage}</h3>
                    </div>
                </div>
                <div className = "hangman_right_section">
                    <div className="leaderboard">
                        <h2>Leaderboard</h2>
                        <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Final Word</th>
                                    <th>Number of Guesses</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaderboard.map((entry, index) => (
                                    <tr key={index}>
                                        <td>{entry.username}</td>
                                        <td>{entry.final_word}</td>
                                        <td>{entry.numberGuesses}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
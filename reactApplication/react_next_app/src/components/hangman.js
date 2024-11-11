"use client";

import styles from './styles/hangman.css'
import { useState } from "react";
import Image from 'next/image';
import { start_hangman, guess_letter } from '@/controllers/hangman_controller';



export default function Hangman() {

    const [hangmanGameStarted, setHangmanGameStarted] = useState(false);
    const [numberCharacters, setNumberCharacters] = useState(3);
    const [letter, setLetter] = useState();
    const [displayWord, setDisplayWord] = useState("");

    const start_game = () => {
        const word = start_hangman(numberCharacters);
        setHangmanGameStarted(true);
        setDisplayWord(word)
    }

    const guess_letter_box = () => {
        const word = guess_letter(letter);
        setDisplayWord(word)
    }

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            guess_letter_box();
        }
    }


    return (
        <div className="hangman">
            <h2>Hangman</h2>
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
                    <p>{displayWord}</p>
                </div>
            )}

            {hangmanGameStarted && (
            <div className="letterInput">
                <label htmlFor="letterInput">Guess a letter: </label>
                <input
                    type="text"
                    id="letterInput"
                    value={letter}
                    onChange={(e) => setLetter(e.target.value.toUpperCase())} // Ensures uppercase
                    maxLength={1} // Only one letter can be input
                />
                <button onClick={guess_letter_box}>Guess Letter</button>
            </div>
            )}
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
    );
}
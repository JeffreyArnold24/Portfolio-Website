"use client";

import styles from './styles/hangman.css'
import { useState } from "react";

export default function Hangman() {

    const [hangmanGameStarted, setHangmanGameStarted] = useState(false);

    const start_game = () => {
        setHangmanGameStarted(true);
    }

    return (
        <div className="main-container">
            <div className="hangman">
                <h2>Hangman</h2>
                {!hangmanGameStarted ? (
                    <button onClick={() => start_game()}>Start Game</button>
                ) : (<></>)}
                <p>Guess the word:</p>
                <p>Remaining attempts:</p>


                <div>
                <input
                    type="text"
                    maxLength="1"
                    placeholder="Enter a letter"
                />
                </div>


            </div>
        </div>
    );
}
"use client";

import styles from './styles/hangman.css'
import { useState } from "react";
import Image from 'next/image';



export default function Hangman() {

    const [hangmanGameStarted, setHangmanGameStarted] = useState(false);

    const start_game = () => {
        setHangmanGameStarted(true);
    }


    return (
        <div className="main-container">
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
                <div className="gameStart">
                    <label htmlFor="numberDropdown">Number of letters: </label>
                    <select id="numberDropdown">
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
        </div>
    );
}
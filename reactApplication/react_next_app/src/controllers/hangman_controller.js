"use client";

const start_hangman = async(numberCharacters) => {
    const username = localStorage.getItem('username')
    const numberChars = numberCharacters
    const response = await fetch("http://localhost:8081/hangman/starthangman", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        numberCharacters: numberChars
      }),
    });

    const data = await response.json();
    console.log(data)
}

export {start_hangman};
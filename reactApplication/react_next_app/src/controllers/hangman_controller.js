"use client";

const start_hangman = async(numberCharacters) => {
    const username = localStorage.getItem('username')
    const authToken = localStorage.getItem('authToken')
    const numberChars = numberCharacters
    const response = await fetch("http://localhost:8081/hangman/starthangman", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        authToken: authToken,
        numberCharacters: numberChars
      }),
    });

    const data = await response.json();
    if (response.ok){
      const word = data.word
      const success = true
      return {success, word}
    }
    else{
      const message = data.message
      const success = false
      return {success, message}
    }

}

const guess_letter = async(letter) => {
  const username = localStorage.getItem('username')
  const authToken = localStorage.getItem('authToken')
  const guessedLetter = letter
  const response = await fetch("http://localhost:8081/hangman/guessletter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      authToken: authToken,
      letter: guessedLetter
    }),
  });

  const data = await response.json();
  if (response.ok){
    const word = data.word
    const success = true
    return {success, word}
  }
  else{
    const message = data.message
    const success = false
    return {success, message}
  }
}

export {start_hangman, guess_letter};
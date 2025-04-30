"use client";

const start_hangman = async(numberCharacters) => {
    const username = localStorage.getItem('username')
    const authToken = localStorage.getItem('authToken')
    const numberChars = numberCharacters
    var url = process.env.NEXT_PUBLIC_URL
    var port = process.env.NEXT_PUBLIC_HANGMAN_PORT
    const response = await fetch(url + port + "/hangman/starthangman", {
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
      var word = data.word
      word = word.split('').join(' '); //Adds space in between each character to make it more distinguishable
      const success = true
      return {success, word}
    }
    else{
      var word = data.description
      const success = false
      return {success, word}
    }

}

const guess_letter = async(letter) => {
  const username = localStorage.getItem('username')
  const authToken = localStorage.getItem('auth_token')
  const guessedLetter = letter
  var url = process.env.NEXT_PUBLIC_URL
  var port = process.env.NEXT_PUBLIC_HANGMAN_PORT
    const response = await fetch(url + port +  "/hangman/guessletter", {
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
    var word = data.word
    word = word.split('').join(' '); //Adds space in between each character to make it more distinguishable
    const success = true
    return {success, word}
  }
  else{
    var word = data.description
    const success = false
    return {success, word}
  }
}

const get_leaderboard = async() => {
  

  var url = process.env.NEXT_PUBLIC_URL
  var port = process.env.NEXT_PUBLIC_HANGMAN_PORT
    const response = await fetch(url + port + "/hangman/getLeaderboard", {
    method: "GET",
  });

  const data = await response.json();
  return data

}

export {start_hangman, guess_letter, get_leaderboard};
"use client";

const start_hangman = async() => {
    const username = localStorage.getItem("username")
    const authToken = localStorage.getItem("authToken")
    const response = await fetch("http://localhost:5000/hangman/starthangman", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        authToken: authToken,
      }),
    });

    const data = await response.json();
    console.log(data)
}

export {start_hangman};
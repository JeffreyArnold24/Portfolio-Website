"use client";

const start_game = async() => {
    e.preventDefault();
    const username = localStorage.getItem("username")
    const authToken = localStorage.getItem("authToken")
    const response = await fetch("http://localhost:8081/starthangman", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        authToken: authToken,
      }),
    });

    const data = await response.json();
}
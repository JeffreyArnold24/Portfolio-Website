"use client";
import { useState } from "react";

const handleSubmit = async (e, username, password) => {
    console.log("reached")
    e.preventDefault();
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      // If login successful, mark the user as authenticated
      console.log("Accepted")
    } else {
      // Display an error message if login fails
      console.log("Rejected")
    }
    return (<p></p>);
  }

export default handleSubmit;
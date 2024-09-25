"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const handleSubmit = async (e, username, password) => {
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
    if (response.ok && data.authToken) {
      // If login successful, mark the user as authenticated
      localStorage.setItem('authToken', data.authToken)
      localStorage.setItem('username', data.username)
    } else {
      // Display an error message if login fails
      console.log("Rejected")
    }
    return (<p></p>);
  }

export default handleSubmit;
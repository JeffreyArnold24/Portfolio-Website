"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const handleLoginSubmit = async (e, username, password) => {
    e.preventDefault();
    var url = NEXT_PUBLIC_URL
    const response = await fetch(url + ":8080/login", {
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
      const authToken = data.authToken
      const success = true;
      return {success, authToken}
    } else {
      // Display an error message if login fails
      const message = data.message
      const success = false
      return {success, message}
    }
    
  }

  const handleLogoutSubmit = async (e, username, authToken) => {
    e.preventDefault();
    var url = NEXT_PUBLIC_URL
    const response = await fetch(url + ":8080/logout", {
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
    if (response.ok) {
      // If logout successful, remove the username and authToken from storage
      localStorage.removeItem('authToken')
      localStorage.removeItem('username')
      const success = true;
      const message = "";
      return {success, message}
    } else {
      // Display an error message if logout fails
      const message = data.message
      const success = false
      return {success, message}
    }
    
  }

export {handleLoginSubmit, handleLogoutSubmit};
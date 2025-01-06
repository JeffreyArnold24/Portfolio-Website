"use client";

import styles from "./welcome_page_stylesheet.css";
import Toolbar from "@/components/top_toolbar";
import { useState, useEffect } from "react";
import {handleLoginSubmit, handleLogoutSubmit} from "@/controllers/login_controller.js"
import { componentDescriptions } from "@/constants/descriptions_constants";
import Accordion from "@/components/accordion";

export default function WelcomePage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [authToken, setAuthToken] = useState(null);
  const selfDescription = componentDescriptions.aboutMe
  const signInDescription = componentDescriptions.signIn

  useEffect(() => {
    // Check for authToken in local storage when the component mounts
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthToken(token); // Set authToken if it exists
    }
  }, []);

  const onLoginSubmit = async (e) => {
    e.preventDefault();
    const {success, message} = await handleLoginSubmit(e, username, password);
    if (success) {
      setErrorMessage("");
      window.location.reload();
    } else {
      setErrorMessage(message);
    }
  }

  const onLogoutSubmit = async (e) => {
    e.preventDefault();
    const {success, message} = await handleLogoutSubmit(e, localStorage.getItem("username"), localStorage.getItem("authToken"));
    if (success) {
      setErrorMessage("");
      window.location.reload();
    } else {
      setErrorMessage(message)
    }
  }

  return (
    <div className="welcome-main-container">
      <div><Toolbar /></div>
      {/* Title Section */}
      <div className="welcome-title-section">
        <h1>Welcome to the Portfolio of</h1>
        <h1>Jeffrey Arnold</h1>
      </div>

      {/* Description and Sign-In Section */}
      <div className="welcome-secondary-section">
        {/* Description Section on the left */}
        <div className="welcome-description-section">
          <div className="welcome-main_info-section">
            <div>{selfDescription.split('\n').map((line, index) => (
                <div key={index}>
                    {line}
                </div>
                ))}</div>
          </div>
          <div className="welcome-link-section">
            <p>Email: jeffarnold02@gmail.com</p>
            <a href="https://github.com/JeffreyArnold24/reactApplication">Source Files</a>
          </div>
        </div>

        {/* Sign-in Section on the right */}
        <div className="welcome-sign-in-section">
          {authToken ? (
            <div>
              <p>You are signed in.</p>
              <button type="submit" onClick={onLogoutSubmit}>Sign Out</button>
              {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Conditionally display the error message */}
            </div>
          ) : (
          <div>
            <div className="welcome-sign-in-title">
              <h2>Sign In</h2>
            </div>
            <form onSubmit={(e) => onLoginSubmit(e)}>
              <input type="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
              <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
              {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Conditionally display the error message */}
              <button type="submit">Sign In</button>
            </form>
          </div>
          )}
        </div>
      </div>
      <div className = "sign-in-description">
        <Accordion description={signInDescription}/>
      </div>
    </div>
  );
}
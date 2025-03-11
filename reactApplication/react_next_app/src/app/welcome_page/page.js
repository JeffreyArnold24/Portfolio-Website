"use client";

import styles from "./welcome_page_stylesheet.css";
import Toolbar from "@/components/toolbar/top_toolbar";
import { useState, useEffect } from "react";
import {handleLoginSubmit, handleLogoutSubmit} from "@/controllers/login_controller.js"
import { componentDescriptions } from "@/constants/descriptions_constants";
import Accordion from "@/components/accordion/accordion";
import Image from 'next/image';

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
        </div>

        
      </div>
      <div className = "sign-in-description">
        <Accordion description={signInDescription}/>
      </div>
    </div>
  );
}
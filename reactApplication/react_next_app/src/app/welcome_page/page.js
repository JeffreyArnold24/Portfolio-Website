"use client";

import styles from "./welcome_page_stylesheet.css";
import Toolbar from "@/components/top_toolbar";
import { useState } from "react";
import handleSubmit from "@/controllers/login_controller.js"

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="main-container">
    <div><Toolbar /></div>
    {/* Title Section */}
      <div className="title-section">
        <h1>Welcome to the Portfolio of</h1>
        <h1>Jeffrey Arnold</h1>
      </div>

      {/* Description and Sign-In Section */}
      <div className="secondary-section">
        {/* Description Section on the left */}
        <div className="description-section">
          <div className="main_info-section">
            <p>My name is Jeffrey Arnold. I have created this website to 
              showcase some projects that I have been working on. 
              I am going to ask you to create an account so that I can
              link items in the databases. I delete each
              user and everything related to them each night because
              this is only meant for demonstration.</p>
          </div>
          <div className="link-section">
            <p>Email: jeffarnold02@gmail.com</p>
            <a href="https://github.com/JeffreyArnold24/reactApplication">Source Files</a>
          </div>
        </div>

        {/* Sign-in Section on the right */}
        <div className="sign-in-section">
          <div className="sign-in-title">
            <h2>Sign In</h2>
          </div>
          <form onSubmit={(e) => handleSubmit(e, username, password)}>
            <input type="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
}
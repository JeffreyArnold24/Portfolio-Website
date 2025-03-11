"use client";

import styles from "./welcome_page_stylesheet.css";
import Toolbar from "@/components/toolbar/top_toolbar";
import { useState, useEffect } from "react";
import {handleLoginSubmit, handleLogoutSubmit} from "@/controllers/login_controller.js"
import { componentDescriptions } from "@/constants/descriptions_constants";
import Accordion from "@/components/accordion/accordion";
import Image from 'next/image';

export default function WelcomePage() {
  

  return (
    <div className="welcome-main-container">
      <div><Toolbar /></div>
      {/* Title Section */}
      <div className="welcome-title-section">
        <h1>Welcome to the Portfolio of</h1>
        <h1>Jeffrey Arnold</h1>
      </div>

      
    </div>
  );
}
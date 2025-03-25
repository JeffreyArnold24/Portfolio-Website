"use client";

import Toolbar from "@/components/toolbar/top_toolbar";
import { componentDescriptions } from "@/constants/descriptions_constants";
import Accordion from "@/components/accordion/accordion";
import styles from "./about.css"
import Image from "next/image";
import React from "react";

export default function About() {

    const selfDescription = componentDescriptions.aboutMe
    const siteDescription = componentDescriptions.aboutSite
    const signInDescription = componentDescriptions.signIn
    
    return (
    <div className="about-container">
        <div><Toolbar /></div>
        {/* Description and Sign-In Section */}
        <div className="about-me-section">
            <div className="about-me-image">
                <Image src="/about_me/profile_pic.jpg" alt="Profile" width={308} height={412} className="profileImage" />
            </div>
            <div className="about-me-info">
                <h1>Jeffrey Arnold</h1>
                <p>{selfDescription}</p>
                <p>Email: jeffarnold@gmail.com</p>
            </div>
        </div>
        <div className= "about-site-section">
            <h1>About the Site</h1>
            <p>{siteDescription}</p>
        </div>        
    </div>
    );
}
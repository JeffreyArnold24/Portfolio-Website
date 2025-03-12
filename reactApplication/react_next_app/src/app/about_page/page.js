"use client";

import Toolbar from "@/components/toolbar/top_toolbar";
import { componentDescriptions } from "@/constants/descriptions_constants";
import Accordion from "@/components/accordion/accordion";
import styles from "./about.css"
import Image from "next/image";

export default function About() {

    const selfDescription = componentDescriptions.aboutMe
    const signInDescription = componentDescriptions.signIn
    
    return (
    <div className="about-container">
        <div><Toolbar /></div>
        {/* Description and Sign-In Section */}
        <div className="about-me-section">
            <div className="about-me-image">
                <Image src="/about_me/profile_pic.jpg" alt="Profile" width={308} height={412} className="profileImage" />;
            </div>
            <div className="about-me-info">
                <h1>Jeffrey Arnold</h1>
                <p>Short bio about yourself. Mention your background, interests, and skills.</p>
                <p>Email: jeffreyarnold@gmail.com</p>
            </div>
        </div>
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

            
        
        <div className = "sign-in-description">
            <Accordion title = "Sign In" description={signInDescription}/>
        </div>
        
    </div>
    );
}
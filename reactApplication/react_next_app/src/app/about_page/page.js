"use client";

import Toolbar from "@/components/toolbar/top_toolbar";
import { componentDescriptions } from "@/constants/descriptions_constants";
import Accordion from "@/components/accordion/accordion";

export default function About() {

    const selfDescription = componentDescriptions.aboutMe
  const signInDescription = componentDescriptions.signIn
    
    return (
    <div className="games-container">
        <div><Toolbar /></div>
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
            <Accordion title = "Sign In" description={signInDescription}/>
        </div>
        
    </div>
    );
}
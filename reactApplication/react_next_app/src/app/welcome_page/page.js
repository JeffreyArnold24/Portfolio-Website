"use client";

import styles from "./welcome_page_stylesheet.css";
import Toolbar from "@/components/toolbar/top_toolbar";
import { useRouter } from "next/navigation";

export default function WelcomePage() {

  const router = useRouter();

  const handleRedirect = () => {
    router.push("/about_page"); // Change to your desired route
  };
  
  return (
    <div className="welcome-main-container">
      <div><Toolbar /></div>
      {/* Title Section */}
      <div className="welcome-title-section">
        <h1>Welcome to the Portfolio of</h1>
        <h1>Jeffrey Arnold</h1>
      </div>
      
      <button onClick={handleRedirect} className="redirect-button">
        About Me
      </button>

      
    </div>
  );
}
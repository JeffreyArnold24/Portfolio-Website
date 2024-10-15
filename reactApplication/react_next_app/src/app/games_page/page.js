"use client";

import styles from "./games_page_stylesheet.css";
import Toolbar from "@/components/top_toolbar";
import Hangman from "@/components/hangman";

export default function Games() {
    
    return (
    <div className="main-container">
        <div><Toolbar /></div>
        <div><Hangman /></div>
    </div>
    );
}
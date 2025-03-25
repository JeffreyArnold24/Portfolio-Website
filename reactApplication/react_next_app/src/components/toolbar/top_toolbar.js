import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import ThemeToggle from "@/components/dark_theme_toggle_button";
import {SignIn} from "@/components/signin/signin";
import styles from './toolbar.css'

export default function Toolbar() {
  const router = useRouter();
  const currentPath = router.pathname;

  const [username, setUsername] = useState(null);

  // Retrieve username from localStorage when component mounts
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    else{
      setUsername('')
    }
  }, []);

  const handleLinkClick = (path) => {
    window.location.href = path;
  };

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about_page'},
    { name: 'Games', path: '/games_page' },
  ];

  return (
    <div className="toolbar">
      <nav>
        <ul>
          {links.map((link) => (
            <li key={link.name} className={currentPath === link.path ? 'active' : ''}>
              <a onClick={(e) => { e.preventDefault(); handleLinkClick(link.path); }}>
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className='username_dark_theme'>
        {/* Display the username if it exists */}
        {username && (
          <div className="username_display">
            {username}
          </div>
        )}

        <div className = 'email'>
          <p>jeffarnold02@gmail.com</p>
        </div>

        <div className = 'source_files_link'>
          <a href="https://github.com/JeffreyArnold24//Portfolio-Website">Source Files</a>
        </div>

        <div className = 'sign-in button'>
          <SignIn />
        </div>
      </div>
    </div>
  );
}
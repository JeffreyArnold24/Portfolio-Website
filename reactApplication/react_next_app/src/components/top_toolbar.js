import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import ThemeToggle from "@/components/dark_theme_toggle_button";
import styles from './styles/toolbar.css'

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

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Games', path: '/games_page' },
  ];

  return (
    <div className="toolbar">
      <nav>
        <ul>
          {links.map((link) => (
            <li key={link.name} className={currentPath === link.path ? 'active' : ''}>
              <Link href={link.path}>{link.name}</Link>
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

        <div className='dark_theme_button'>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ThemeToggle from "@/components/dark_theme_toggle_button";
import styles from './styles/toolbar.css'

export default function Toolbar() {
  const router = useRouter();
  const currentPath = router.pathname;

  const links = [
    { name: 'Home', path: '/' },
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
      <div className='dark_theme_button'>
        <ThemeToggle />
      </div>
    </div>
  );
}
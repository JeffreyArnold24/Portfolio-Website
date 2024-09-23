"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {

  const router = useRouter();
    // Automatically redirect to 'welcome_page.js'
    useEffect(() => {
      // Use the router to redirect to /welcome_page
      router.push('/welcome_page');
    }, [router]);

  return (
    <div></div>
  );
}

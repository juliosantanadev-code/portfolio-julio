import { Hero } from '../components/sections/Hero';
import { Services } from '../components/sections/Services';
import { Projects } from '../components/sections/Projects';
import { Skills } from '../components/sections/Skills';
import { About } from '../components/sections/About';
import { useAutoSnap } from '../hooks/useAutoSnap';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function Home() {
  useAutoSnap();
  
  // Handle smooth scrolling when navigating back from other pages with a hash
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [hash]);

  return (
    <main>
      <Hero />
      <Services />
      <Projects />
      <Skills />
      <About />
    </main>
  );
}

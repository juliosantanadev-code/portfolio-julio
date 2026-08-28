import { useEffect } from 'react';

export function useAutoSnap() {
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        // Prevent snapping if user is at the very bottom of the page (e.g. looking at footer)
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
            return;
        }

        const sections = Array.from(document.querySelectorAll('section'));
        const windowHeight = window.innerHeight;
        
        for (let i = 0; i < sections.length; i++) {
          const section = sections[i];
          const rect = section.getBoundingClientRect();
          
          // Check if the top boundary of the section is visible on screen
          if (rect.top > 10 && rect.top < windowHeight - 10) {
            
            // If it takes up more than 40% of the screen (rect.top is in the top 60% of viewport)
            if (rect.top < windowHeight * 0.6) {
              // Snap down to align this section's top with the viewport
              const targetScroll = window.scrollY + rect.top;
              window.scrollTo({ top: targetScroll, behavior: 'smooth' });
            } else {
              // Snap up to hide this section and return to the previous one
              // by aligning this section's top exactly with the viewport bottom
              const targetScroll = window.scrollY + rect.top - windowHeight;
              window.scrollTo({ top: targetScroll, behavior: 'smooth' });
            }
            break;
          }
        }
      }, 500); // 0.5 seconds
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);
}

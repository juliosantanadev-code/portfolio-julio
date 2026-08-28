import { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/Button';
import { Download, ChevronRight } from 'lucide-react';
import { FaWhatsapp, FaLinkedin } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { GalaxyBackground } from '../ui/GalaxyBackground';

export function Hero() {
  const roles = [
    'Desarrollo Full Stack',
    'Automatización con IA',
    'Análisis de Datos'
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const fullText = roles[roleIndex];
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < fullText.length) {
          setDisplayText(fullText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 3000); // Wait longer before deleting
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(fullText.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 30 : 80);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, fullText]);

  const contentRef = useRef<HTMLDivElement>(null);

  // Cinematic DOM Transition
  useEffect(() => {
    let animationFrameId: number;

    const tick = () => {
      if (contentRef.current) {
        const scrollY = window.scrollY;
        // Hero fades out over the first 400px of scroll
        const maxScroll = 400;
        const progress = Math.min(scrollY / maxScroll, 1.0);
        
        // Calculate transition values
        const opacity = 1.0 - progress;
        const blur = progress * 12; // 0px to 12px
        const scale = 1.0 + progress * 0.1; // 1.0 to 1.1
        const translateY = progress * -50; // 0px to -50px
        
        // Apply hardware-accelerated styles
        contentRef.current.style.opacity = opacity.toString();
        contentRef.current.style.filter = `blur(${blur}px)`;
        contentRef.current.style.transform = `scale(${scale}) translateY(${translateY}px)`;
        contentRef.current.style.willChange = 'opacity, transform, filter';
        
        // Disable pointer events when invisible to prevent blocking
        contentRef.current.style.pointerEvents = progress > 0.8 ? 'none' : 'auto';
      }
      animationFrameId = window.requestAnimationFrame(tick);
    };

    tick();
    return () => window.cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <section className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      <GalaxyBackground />
      <div ref={contentRef} className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        
        <h2 className="text-white font-mono tracking-widest uppercase mb-6 text-sm border-l-2 border-white pl-4 min-h-[20px]">
          {displayText}<span className="inline-block w-[8px] h-[15px] bg-white ml-1 animate-cursor-blink align-middle"></span>
        </h2>
        <h1 className="text-6xl md:text-8xl font-serif text-white mb-12 tracking-tight">
          Julio Santana<span className="animate-cursor-blink text-crimson-500">_</span>
        </h1>

        <div className="flex flex-col gap-8 font-mono">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <a href="/cv.html" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" className="w-full sm:w-auto float-2">
                <Download size={20} />
                Ver Curriculum
              </Button>
            </a>
            <Button 
              variant="outline"
              className="float-3"
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Ver Proyectos
              <ChevronRight size={20} />
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://wa.me/51917983492" target="_blank" rel="noopener noreferrer" className="transition-none p-3 border border-white bg-background-dark hover:bg-white flex items-center justify-center group float-1 hover-scale">
              <FaWhatsapp size={22} className="text-[#25D366] drop-shadow-[0_0_8px_rgba(37,211,102,0.8)] group-hover:drop-shadow-none" />
            </a>
            <a href="https://www.linkedin.com/in/julio-santana-131527417/" target="_blank" rel="noopener noreferrer" className="transition-none p-3 border border-white bg-background-dark hover:bg-white flex items-center justify-center group float-2 hover-scale">
              <FaLinkedin size={22} className="text-[#0A66C2] drop-shadow-[0_0_8px_rgba(10,102,194,0.8)] group-hover:drop-shadow-none" />
            </a>
            <a href="mailto:juliosantana.dev@gmail.com" target="_blank" rel="noopener noreferrer" className="transition-none p-3 border border-white bg-background-dark hover:bg-white flex items-center justify-center group float-3 hover-scale">
              <SiGmail size={22} className="text-[#EA4335] drop-shadow-[0_0_8px_rgba(234,67,53,0.8)] group-hover:drop-shadow-none" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

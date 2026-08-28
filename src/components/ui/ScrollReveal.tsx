import { useEffect, useRef, type ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
}

export function ScrollReveal({ children, className = '' }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const tick = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        let opacity = 1.0;
        let blur = 0;
        let scale = 1.0;
        let translateY = 0;
        
        // Zona de salida (la sección sube y sale por arriba de la pantalla)
        const exitThreshold = windowHeight * 0.4; // Cuando el final de la sección llega al 40% de la pantalla
        if (rect.bottom < exitThreshold) {
            const exitProgress = Math.min(1.0, Math.max(0, (exitThreshold - rect.bottom) / 300));
            opacity = 1.0 - exitProgress;
            blur = exitProgress * 12;
            scale = 1.0 + exitProgress * 0.1; // Zoom in como en el Hero
            translateY = exitProgress * -50;
        } 
        // Zona de entrada (la sección entra por debajo de la pantalla)
        const entryThreshold = windowHeight - 100;
        if (rect.top > entryThreshold - 400 && rect.bottom >= exitThreshold) {
            const entryProgress = Math.min(1.0, Math.max(0, (rect.top - (entryThreshold - 400)) / 400));
            opacity = 1.0 - entryProgress;
            blur = entryProgress * 12;
            scale = 1.0 - entryProgress * 0.1; // Viene desde más pequeño (0.9) hacia su tamaño original (1.0)
            translateY = entryProgress * 50;
        }

        ref.current.style.opacity = opacity.toString();
        ref.current.style.filter = `blur(${blur}px)`;
        ref.current.style.transform = `scale(${scale}) translateY(${translateY}px)`;
        ref.current.style.willChange = 'opacity, transform, filter';
        
        // Deshabilitar interacción si está muy invisible
        ref.current.style.pointerEvents = opacity < 0.2 ? 'none' : 'auto';
      }
      animationFrameId = window.requestAnimationFrame(tick);
    };

    tick();
    return () => window.cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

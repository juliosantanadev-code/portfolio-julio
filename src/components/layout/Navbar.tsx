import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const contactLink = "https://wa.me/51917983492?text=Estimado%20Julio%2C%20he%20revisado%20su%20portafolio%20profesional%20y%20me%20gustar%C3%ADa%20conversar%20acerca%20de%20una%20posible%20oportunidad%20de%20colaboraci%C3%B3n.";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b-white/10 rounded-none bg-white/5">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <a href="#" className="text-xl font-bold text-white tracking-wider flex items-center gap-2 text-glow">
          JS<span className="text-crimson-500">.</span>
        </a>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-[13px] font-medium text-gray-300">
          <a href="#services" className="hover:text-white transition-colors">Servicios</a>
          <a href="#projects" className="hover:text-white transition-colors">Proyectos</a>
          <a href="#skills" className="hover:text-white transition-colors">Skills</a>
          <a href="#about" className="hover:text-white transition-colors">Sobre Mí</a>
        </div>

        <div className="hidden md:block">
          <a 
            href={contactLink}
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-1.5 glass glass-hover rounded-[8px] text-[13px] font-medium text-white transition-all inline-block"
          >
            Contactar
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-gray-300 hover:text-white transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden glass border-t border-white/10 bg-black/90 p-6 flex flex-col gap-6 text-center animate-in slide-in-from-top-2">
          <a href="#services" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white transition-colors font-medium">Servicios</a>
          <a href="#projects" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white transition-colors font-medium">Proyectos</a>
          <a href="#skills" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white transition-colors font-medium">Skills</a>
          <a href="#about" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white transition-colors font-medium">Sobre Mí</a>
          <a 
            href={contactLink}
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-2 py-3 glass glass-hover rounded-[8px] text-sm font-medium text-white transition-all mx-auto w-full max-w-[200px]"
            onClick={() => setIsOpen(false)}
          >
            Contactar por WhatsApp
          </a>
        </div>
      )}
    </nav>
  );
}

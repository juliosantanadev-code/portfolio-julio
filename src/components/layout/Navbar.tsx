import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logojs-transparent.png';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  // Helper for in-page anchors
  const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
    if (isHome) {
      return <a href={href} className="text-gray-400 hover:text-black hover:bg-white transition-none px-2 py-1">{children}</a>;
    }
    return <Link to={`/${href}`} className="text-gray-400 hover:text-black hover:bg-white transition-none px-2 py-1">{children}</Link>;
  };
  
  const MobileNavLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
    if (isHome) {
      return <a href={href} onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-black hover:bg-white px-2 py-2 inline-block">{children}</a>;
    }
    return <Link to={`/${href}`} onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-black hover:bg-white px-2 py-2 inline-block">{children}</Link>;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background-dark">
      {/* Thin black gradient separator */}
      <div className="absolute -bottom-4 left-0 right-0 h-4 bg-gradient-to-b from-background-dark to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center justify-between font-mono">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Julio Santana Logo" className="h-10 w-auto" />
          </Link>
          <button 
            className="md:hidden text-text-main hover:text-white transition-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-[14px]">
          <NavLink href="#services">Servicios</NavLink>
          <NavLink href="#projects">Proyectos</NavLink>
          <NavLink href="#skills">Skills</NavLink>
          <NavLink href="#about">Sobre mí</NavLink>
          
          <Link 
            to="/contact"
            className="border border-white px-4 py-1.5 text-[14px] font-medium text-white bg-background-dark hover:bg-white hover:text-black transition-none group flex items-center float-1 hover-scale"
          >
            <span className="hidden group-hover:inline-block mr-2">{"["}</span>
            <span>Contactar</span>
            <span className="hidden group-hover:inline-block ml-2">{"]"}</span>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-border-dark bg-background-dark p-6 flex flex-col gap-4 font-mono text-[14px]">
          <MobileNavLink href="#services">Servicios</MobileNavLink>
          <MobileNavLink href="#projects">Proyectos</MobileNavLink>
          <MobileNavLink href="#skills">Skills</MobileNavLink>
          <MobileNavLink href="#about">Sobre mí</MobileNavLink>
          <Link 
            to="/contact"
            className="mt-4 border border-white px-4 py-3 text-white bg-background-dark hover:bg-white hover:text-black transition-none flex items-center justify-center group float-1 hover-scale"
            onClick={() => setIsOpen(false)}
          >
            <span className="hidden group-hover:inline-block mr-2">{"["}</span>
            <span>Contactar</span>
            <span className="hidden group-hover:inline-block ml-2">{"]"}</span>
          </Link>
        </div>
      )}
    </nav>
  );
}

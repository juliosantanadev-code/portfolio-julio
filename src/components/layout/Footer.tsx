import { portfolioData } from '../../data/portfolioData';

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 mt-20 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-crimson-600/20 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between relative z-10">
        <div className="mb-4 md:mb-0">
          <a href="#" className="text-2xl font-bold text-white text-glow">
            JS<span className="text-crimson-500">.</span>
          </a>
          <p className="text-gray-400 text-sm mt-2">© {new Date().getFullYear()} {portfolioData.personal.name}. Todos los derechos reservados.</p>
        </div>
        
        <div className="flex gap-6">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/julio-santana-131527417/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0077b5] transition-colors">LinkedIn</a>
          <a href="mailto:juliosantana.dev@gmail.com" className="text-gray-400 hover:text-crimson-500 transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
}

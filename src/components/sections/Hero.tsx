import { Button } from '../ui/Button';
import { portfolioData } from '../../data/portfolioData';
import { Download, ChevronRight } from 'lucide-react';
import { FaWhatsapp, FaLinkedin } from 'react-icons/fa';

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-crimson-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        
        {/* Avatar Minimalista */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-8 mx-auto group -mt-8">
          <div className="absolute inset-0 bg-crimson-500/20 blur-[20px] rounded-full group-hover:bg-crimson-500/40 transition-colors duration-500"></div>
          <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10 glass z-10 transition-transform duration-500 group-hover:scale-105">
            <img 
              src="/images/profile.jpg" 
              alt="Julio Santana" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop";
              }}
            />
          </div>
        </div>

        <h2 className="text-crimson-500 font-medium tracking-widest uppercase mb-4 text-sm">
          {portfolioData.personal.role}
        </h2>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
          Julio Santana
        </h1>
        <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
          {portfolioData.personal.bio}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/cv.html" target="_blank" rel="noopener noreferrer">
            <Button variant="primary" className="w-full sm:w-auto">
              <Download size={20} />
              Ver Curriculum
            </Button>
          </a>
          <Button variant="glass">
            Ver Proyectos
            <ChevronRight size={20} />
          </Button>
          <div className="flex items-center gap-4 sm:ml-2">
            <a href="https://wa.me/51917983492" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#25D366] transition-all p-3 glass rounded-full glass-hover flex items-center justify-center">
              <FaWhatsapp size={22} />
            </a>
            <a href="https://www.linkedin.com/in/julio-santana-131527417/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0077b5] transition-all p-3 glass rounded-full glass-hover flex items-center justify-center">
              <FaLinkedin size={22} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

import { GlassCard } from '../ui/GlassCard';
import { portfolioData } from '../../data/portfolioData';
import { Award } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-glow">Sobre Mí</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Soy un desarrollador web apasionado por construir sistemas robustos y eficientes. Mi enfoque principal es la optimización y automatización de procesos mediante el uso de Inteligencia Artificial y análisis de datos avanzado.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Me especializo en entregar soluciones completas de inicio a fin, abarcando desde la arquitectura de bases de datos y minería de datos hasta interfaces de usuario (UI/UX) de alto nivel con React.
            </p>
            
            <GlassCard hoverable={false} className="border-crimson-500/20 bg-crimson-500/5">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Award className="text-crimson-500" /> Logros Destacados
              </h3>
              <ul className="space-y-3">
                {portfolioData.personal.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-crimson-500 mt-2 flex-shrink-0"></span>
                    <span className="text-gray-300">{achievement}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
          
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 bg-crimson-600/20 blur-[50px] rounded-full"></div>
              <div className="relative w-full h-full glass rounded-2xl overflow-hidden border-2 border-white/10 rotate-3 transition-transform hover:rotate-0 duration-500">
                <img 
                  src="/images/profile.jpg" 
                  alt={portfolioData.personal.name} 
                  className="w-full h-full object-cover opacity-80"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

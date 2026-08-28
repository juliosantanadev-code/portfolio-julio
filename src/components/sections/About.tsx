import { TechCard } from '../ui/TechCard';
import { portfolioData } from '../../data/portfolioData';
import { Award } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

export function About() {
  return (
    <section id="about" className="py-24 relative">
      <ScrollReveal className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="w-full">
            <div className="mb-16 border-l-4 border-white pl-6">
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Sobre Mí</h2>
              <p className="text-gray-400 font-mono">Un vistazo a mi trayectoria y enfoque tecnológico.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <p className="text-white leading-relaxed mb-6 font-mono">
                  Soy un desarrollador web apasionado por construir sistemas robustos y eficientes. Mi enfoque principal es la optimización y automatización de procesos mediante el uso de Inteligencia Artificial y análisis de datos avanzado.
                </p>
                <p className="text-white leading-relaxed font-mono">
                  Me especializo en entregar soluciones completas de inicio a fin, abarcando desde la arquitectura de bases de datos y minería de datos hasta interfaces de usuario (UI/UX) de alto nivel con React.
                </p>
              </div>
              
              <TechCard hoverable={true} className="border-white/20 hover:border-white transition-colors duration-300">
                <h3 className="text-xl font-mono text-white mb-6 flex items-center gap-3">
                  <Award className="text-white" /> Logros Destacados
                </h3>
                <ul className="space-y-4 font-mono text-sm">
                  {portfolioData.personal.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-white mt-0.5">{"//"}</span>
                      <span className="text-gray-400">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </TechCard>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

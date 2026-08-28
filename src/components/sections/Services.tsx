import { TechCard } from '../ui/TechCard';
import { portfolioData } from '../../data/portfolioData';
import * as Icons from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

export function Services() {
  return (
    <section id="services" className="py-24 relative border-t border-border-dark">
      <ScrollReveal className="max-w-7xl mx-auto px-6">
        <div className="mb-16 border-l-4 border-white pl-6">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Servicios</h2>
          <p className="text-gray-400 font-mono">Automatización, análisis de datos y desarrollo web avanzado.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioData.services.map((service, index) => {
            const IconComponent = (Icons as any)[service.iconName];
            return (
              <TechCard key={index} className="flex flex-col gap-6 group hover:bg-white hover:text-black transition-none cursor-default">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center border border-border-dark group-hover:border-black">
                    {IconComponent && <IconComponent size={24} className="text-white group-hover:text-black" />}
                  </div>
                  <h3 className="text-xl font-mono text-white group-hover:text-black font-bold uppercase">{service.title}</h3>
                </div>
                <p className="text-gray-400 group-hover:text-black font-mono text-sm leading-relaxed">{service.description}</p>
              </TechCard>
            );
          })}
        </div>
      </ScrollReveal>
    </section>
  );
}

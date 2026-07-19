import { GlassCard } from '../ui/GlassCard';
import { portfolioData } from '../../data/portfolioData';
import * as Icons from 'lucide-react';

export function Services() {
  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-glow">Servicios Especializados</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Soluciones de alto rendimiento enfocadas en la automatización, análisis de datos y desarrollo web completo.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioData.services.map((service, index) => {
            const IconComponent = (Icons as any)[service.iconName];
            return (
              <GlassCard key={index} className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-lg bg-crimson-500/10 flex items-center justify-center text-crimson-500 mb-2 border border-crimson-500/20">
                  {IconComponent && <IconComponent size={24} />}
                </div>
                <h3 className="text-xl font-bold text-white">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed">{service.description}</p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

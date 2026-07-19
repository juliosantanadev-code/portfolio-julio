import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { portfolioData } from '../../data/portfolioData';
import { ExternalLink } from 'lucide-react';

export function Projects() {
  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-glow">Proyectos Destacados</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Soluciones reales construidas con tecnologías modernas.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {portfolioData.projects.map((project, index) => (
            <GlassCard key={index} className="flex flex-col h-full overflow-hidden !p-0 group/card">
              
              {/* Imagen del Proyecto */}
              {project.image && (
                <div className="w-full h-56 relative overflow-hidden border-b border-white/10">
                  <div className="absolute inset-0 bg-crimson-500/20 mix-blend-overlay z-10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop";
                    }}
                  />
                </div>
              )}
              
              {/* Contenido */}
              <div className="p-6 sm:p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-crimson-500 text-sm font-medium mb-1">{project.type}</p>
                    <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                  </div>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-crimson-500 transition-colors mt-1">
                    <ExternalLink size={24} />
                  </a>
                </div>
                <p className="text-gray-400 mb-6 flex-grow leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.stack.map((tech, i) => (
                    <Badge key={i}>{tech}</Badge>
                  ))}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

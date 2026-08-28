import { TechCard } from '../ui/TechCard';
import { Badge } from '../ui/Badge';
import { portfolioData } from '../../data/portfolioData';
import { ExternalLink } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

export function Projects() {
  return (
    <section id="projects" className="py-24 relative">
      <ScrollReveal className="max-w-7xl mx-auto px-6">
        <div className="mb-16 border-l-4 border-white pl-6">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Proyectos</h2>
          <p className="text-gray-400 font-mono">Soluciones reales construidas con tecnologías modernas.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {portfolioData.projects.map((project, index) => (
            <TechCard key={index} className="flex flex-col h-full !p-0 group">
              
              {/* Imagen del Proyecto */}
              {project.image && (
                <div className="w-full h-56 relative overflow-hidden border-b border-border-dark">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop";
                    }}
                  />
                </div>
              )}
              
              {/* Contenido */}
              <div className="p-6 sm:p-8 flex flex-col flex-grow bg-background-surface">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-white text-xs font-mono mb-2 uppercase tracking-widest">[{project.type}]</p>
                    <h3 className="text-2xl font-serif text-white">{project.title}</h3>
                  </div>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-none p-2 border border-border-dark hover:border-white hover:bg-white hover:text-black">
                    <ExternalLink size={20} />
                  </a>
                </div>
                <p className="text-gray-400 mb-8 flex-grow leading-relaxed font-mono text-sm">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.stack.map((tech, i) => (
                    <Badge key={i}>{tech}</Badge>
                  ))}
                </div>
              </div>
            </TechCard>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}

import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { portfolioData } from '../../data/portfolioData';

export function Skills() {
  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-glow">Skills & Stack</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Herramientas y tecnologías que utilizo para construir soluciones.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <GlassCard>
            <h3 className="text-xl font-bold text-white mb-4">Stack Principal</h3>
            <div className="flex flex-wrap gap-2">
              {portfolioData.skills.primary.map((skill, i) => (
                <Badge key={i}>{skill}</Badge>
              ))}
            </div>
          </GlassCard>
          
          <GlassCard>
            <h3 className="text-xl font-bold text-white mb-4">Stack Secundario</h3>
            <div className="flex flex-wrap gap-2">
              {portfolioData.skills.secondary.map((skill, i) => (
                <Badge key={i}>{skill}</Badge>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="text-xl font-bold text-white mb-4">Herramientas</h3>
            <div className="flex flex-wrap gap-2">
              {portfolioData.skills.tools.map((skill, i) => (
                <Badge key={i}>{skill}</Badge>
              ))}
            </div>
          </GlassCard>
          
          <GlassCard>
            <h3 className="text-xl font-bold text-white mb-4">Aprendiendo Actualmente</h3>
            <div className="flex flex-wrap gap-2">
              {portfolioData.skills.learning.map((skill, i) => (
                <Badge key={i}>{skill}</Badge>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

import { TechCard } from '../ui/TechCard';
import { Badge } from '../ui/Badge';
import { ScrollReveal } from '../ui/ScrollReveal';
import { portfolioData } from '../../data/portfolioData';
import { TechIcon } from '../ui/TechIcon';

export function Skills() {
  return (
    <section id="skills" className="py-24 relative border-y border-border-dark">
      <ScrollReveal className="max-w-7xl mx-auto px-6">
        <div className="mb-16 border-l-4 border-white pl-6">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Skills</h2>
          <p className="text-gray-400 font-mono text-sm">Stack tecnológico</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TechCard>
            <h3 className="text-lg font-mono text-white mb-6 uppercase tracking-widest border-b border-border-dark pb-2">Stack Principal</h3>
            <div className="flex flex-wrap gap-2">
              {portfolioData.skills.primary.map((skill, i) => (
                <Badge key={i}>{skill}</Badge>
              ))}
            </div>
          </TechCard>

          <TechCard>
            <h3 className="text-lg font-mono text-white mb-6 uppercase tracking-widest border-b border-border-dark pb-2">Stack Secundario</h3>
            <div className="flex flex-wrap gap-2">
              {portfolioData.skills.secondary.map((skill, i) => (
                <Badge key={i}>{skill}</Badge>
              ))}
            </div>
          </TechCard>

          <TechCard>
            <h3 className="text-lg font-mono text-white mb-6 uppercase tracking-widest border-b border-border-dark pb-2">Herramientas</h3>
            <div className="flex flex-wrap gap-2">
              {portfolioData.skills.tools.map((skill, i) => (
                <Badge key={i}>{skill}</Badge>
              ))}
            </div>
          </TechCard>

          <TechCard className="bg-white group">
            <h3 className="text-lg font-mono text-black mb-6 uppercase tracking-widest border-b border-black pb-2">Aprendiendo</h3>
            <div className="flex flex-wrap gap-2">
              {portfolioData.skills.learning.map((skill, i) => (
                <span key={i} className="flex items-center gap-2 px-3 py-1 text-[13px] font-mono border border-black text-black">
                  <TechIcon name={skill} className="text-[15px]" />
                  {skill}
                </span>
              ))}
            </div>
          </TechCard>
        </div>
      </ScrollReveal>
    </section>
  );
}

import React from 'react';
import { 
  FaReact, FaJava, FaDatabase, FaCss3Alt 
} from 'react-icons/fa';
import { 
  SiPython, SiHtml5, SiJavascript, SiNodedotjs, 
  SiPandas, SiScikitlearn, SiGo, SiR, 
  SiVuedotjs, SiTailwindcss, SiTypescript, SiGit, SiDocker, 
  SiGithub, SiNpm, SiCplusplus, SiOllama
} from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
import { VscVscode } from 'react-icons/vsc';
import { DiVisualstudio } from 'react-icons/di';

interface TechIconProps {
  name: string;
  className?: string;
}

export function TechIcon({ name, className = "" }: TechIconProps) {
  const iconData: Record<string, { icon: React.ElementType, color: string }> = {
    'React': { icon: FaReact, color: '#61DAFB' },
    'SQL': { icon: FaDatabase, color: '#336791' },
    'Python': { icon: SiPython, color: '#3776AB' },
    'Java': { icon: FaJava, color: '#007396' },
    'HTML': { icon: SiHtml5, color: '#E34F26' },
    'CSS': { icon: FaCss3Alt, color: '#1572B6' },
    'JavaScript': { icon: SiJavascript, color: '#F7DF1E' },
    'Node.js': { icon: SiNodedotjs, color: '#339933' },
    'Pandas': { icon: SiPandas, color: '#150458' },
    'Scikit-Learn': { icon: SiScikitlearn, color: '#F7931E' },
    'C#': { icon: TbBrandCSharp, color: '#239120' },
    'Go': { icon: SiGo, color: '#00ADD8' },
    'R': { icon: SiR, color: '#276DC3' },
    'Vue.js': { icon: SiVuedotjs, color: '#4FC08D' },
    'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
    'TypeScript': { icon: SiTypescript, color: '#3178C6' },
    'Git': { icon: SiGit, color: '#F05032' },
    'Docker': { icon: SiDocker, color: '#2496ED' },
    'VS Code': { icon: VscVscode, color: '#007ACC' },
    'GitHub': { icon: SiGithub, color: '#ffffff' },
    'npm': { icon: SiNpm, color: '#CB3837' },
    'VBS': { icon: DiVisualstudio, color: '#5C2D91' },
    'C++': { icon: SiCplusplus, color: '#00599C' },
    'OLlama': { icon: SiOllama, color: '#ffffff' },
  };

  const data = iconData[name];

  if (!data) {
    return null;
  }

  const { icon: IconComponent, color } = data;

  return <IconComponent className={className} style={{ color }} />;
}

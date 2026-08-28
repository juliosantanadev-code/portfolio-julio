import React from 'react';
import { TechIcon } from './TechIcon';

interface BadgeProps {
  children: React.ReactNode;
}

export function Badge({ children }: BadgeProps) {
  const isString = typeof children === 'string';
  
  return (
    <span className="flex items-center gap-2 px-3 py-1 text-[13px] font-mono bg-background-surface border border-border-dark text-text-main hover:border-white hover:bg-white hover:text-black transition-none cursor-default">
      {isString && <TechIcon name={children as string} className="text-[15px]" />}
      <span>{children}</span>
    </span>
  );
}

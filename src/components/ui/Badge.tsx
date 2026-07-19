import React from 'react';
import { TechIcon } from './TechIcon';

interface BadgeProps {
  children: React.ReactNode;
}

export function Badge({ children }: BadgeProps) {
  const isString = typeof children === 'string';
  
  return (
    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-[10px] text-[13px] font-medium bg-white/5 border border-white/10 text-gray-200 hover:bg-white/10 hover:border-white/20 transition-all cursor-default">
      {isString && <TechIcon name={children as string} className="text-[15px]" />}
      {children}
    </span>
  );
}

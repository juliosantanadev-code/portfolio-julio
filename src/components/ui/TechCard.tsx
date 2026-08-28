import React from 'react';

interface TechCardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export function TechCard({ children, className = '', hoverable = true }: TechCardProps) {
  return (
    <div className={`bg-background-surface border border-border-dark p-6 ${hoverable ? 'hover:border-white transition-colors duration-150' : ''} ${className}`}>
      {children}
    </div>
  );
}

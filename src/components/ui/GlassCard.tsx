import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export function GlassCard({ children, className = '', hoverable = true }: GlassCardProps) {
  return (
    <div className={`glass rounded-xl p-6 ${hoverable ? 'glass-hover' : ''} ${className}`}>
      {children}
    </div>
  );
}

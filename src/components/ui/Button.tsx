import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'glass';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseClasses = 'px-6 py-3 rounded-md font-semibold transition-all duration-300 flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-crimson-600 hover:bg-crimson-500 text-white shadow-[0_0_15px_rgba(166,28,46,0.5)] hover:shadow-[0_0_25px_rgba(166,28,46,0.8)] border border-crimson-500/50',
    glass: 'glass glass-hover text-gray-200'
  };

  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

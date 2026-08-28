import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseClasses = 'px-6 py-3 font-mono font-medium transition-none flex items-center justify-center gap-2 border border-white group hover-scale';
  
  const variants = {
    primary: 'bg-background-dark text-white hover:bg-white hover:text-black',
    outline: 'bg-background-dark text-white hover:bg-white hover:text-black'
  };

  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
      <span className="hidden group-hover:inline-block">{"["}</span>
      <span className="flex items-center gap-2">{children}</span>
      <span className="hidden group-hover:inline-block">{"]"}</span>
    </button>
  );
}

import React from 'react';

interface NeotroLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'green' | 'original';
}

export const NeotroLogo: React.FC<NeotroLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'green'
}) => {
  const heightClasses = {
    sm: 'h-10 sm:h-12',
    md: 'h-14 sm:h-16',
    lg: 'h-18 sm:h-20',
    xl: 'h-24 sm:h-28'
  }[size];

  // Uses the complete unified logo where the Africa 3D 'N' emblem and the curved 'NEOTRO' with 'Ltd' go together
  const logoSrc = variant === 'green'
    ? '/logos/neotro-africa-full-green.jpg'
    : '/logos/neotro-africa-full.jpg';

  return (
    <div className={`flex items-center shrink-0 group ${className}`}>
      <img
        src={logoSrc}
        alt="Neotro Ltd"
        className={`${heightClasses} w-auto object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-200 select-none py-1`}
      />
    </div>
  );
};

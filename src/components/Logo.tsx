interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="4" fill="none"/>
        <path d="M25 70V35L35 45L45 35L50 40L55 35L65 45L75 35V70H65V50L55 60L50 55L45 60L35 50V70H25Z" fill="currentColor"/>
      </svg>
    </div>
  );
}

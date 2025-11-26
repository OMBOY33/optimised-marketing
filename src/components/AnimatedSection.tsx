import { ReactNode } from 'react';
import { useScrollAnimation, useCountUp } from '../hooks/useScrollAnimation';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale';
  delay?: number;
}

export default function AnimatedSection({
  children,
  className = '',
  animation = 'fadeIn',
  delay = 0
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation(0.1);

  const animations = {
    fadeIn: 'opacity-0 translate-y-0',
    slideUp: 'opacity-0 translate-y-12',
    slideLeft: 'opacity-0 translate-x-12',
    slideRight: 'opacity-0 -translate-x-12',
    scale: 'opacity-0 scale-95'
  };

  const visibleClass = 'opacity-100 translate-y-0 translate-x-0 scale-100';

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? visibleClass : animations[animation]
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function AnimatedStat({ value, label, suffix = '', prefix = '' }: {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
}) {
  const { ref, count } = useCountUp(value, 2000);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl font-black text-[#FDB515] mb-3">
        {prefix}{count}{suffix}
      </div>
      <div className="text-white font-bold mb-2 uppercase text-sm">{label}</div>
    </div>
  );
}

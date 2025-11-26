import { Star, Users, TrendingUp, Award } from 'lucide-react';
import { useCountUp } from '../hooks/useScrollAnimation';

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  suffix?: string;
  prefix?: string;
  decimal?: boolean;
  label: string;
}

function StatItem({ icon, value, suffix = '', prefix = '', decimal = false, label }: StatItemProps) {
  const { ref, count } = useCountUp(value, 2500);

  const displayValue = decimal ? (count / 10).toFixed(1) : count;

  return (
    <div ref={ref} className="text-center group hover:scale-110 transition-transform duration-300">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-[#FDB515]/10 border border-[#FDB515]/30 rounded-lg mb-3 text-[#FDB515] group-hover:bg-[#FDB515] group-hover:text-black transition-all">
        {icon}
      </div>
      <div className="text-3xl font-black text-white mb-1">
        {prefix}{displayValue}{suffix}
      </div>
      <div className="text-sm text-gray-400 uppercase tracking-wide">{label}</div>
    </div>
  );
}

export default function AnimatedStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
      <StatItem
        icon={<Star className="w-6 h-6" />}
        value={49}
        decimal={true}
        suffix="/5"
        label="Google Rating"
      />
      <StatItem
        icon={<Users className="w-6 h-6" />}
        value={150}
        suffix="+"
        label="Active Clients"
      />
      <StatItem
        icon={<TrendingUp className="w-6 h-6" />}
        value={285}
        suffix="%"
        label="Avg Growth"
      />
      <StatItem
        icon={<Award className="w-6 h-6" />}
        value={10}
        suffix="+"
        label="Years Experience"
      />
    </div>
  );
}

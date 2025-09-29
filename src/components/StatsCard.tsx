import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  amount: string;
  icon: LucideIcon;
  variant: 'withdraw' | 'deposit' | 'invest' | 'current' | 'balance';
  className?: string;
}

const StatsCard = ({ title, amount, icon: Icon, variant, className }: StatsCardProps) => {
  const variantClasses = {
    withdraw: 'bg-gradient-withdraw',
    deposit: 'bg-gradient-deposit', 
    invest: 'bg-gradient-invest',
    current: 'bg-gradient-current',
    balance: 'bg-gradient-balance'
  };

  return (
    <div className={cn(
      'rounded-2xl p-6 text-white shadow-card transition-transform duration-300 hover:scale-105',
      variantClasses[variant],
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-white/80 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold tracking-tight">{amount}</p>
        </div>
        <div className="rounded-full bg-white/20 p-3">
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
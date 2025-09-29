import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OptionButtonProps {
  title: string;
  icon: LucideIcon;
  color: string;
  onClick?: () => void;
  className?: string;
}

const OptionButton = ({ title, icon: Icon, color, onClick, className }: OptionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-col items-center space-y-3 transition-all duration-300 hover:scale-105 active:scale-95',
        className
      )}
    >
      <div 
        className="flex h-16 w-16 items-center justify-center rounded-full shadow-card"
        style={{ backgroundColor: color }}
      >
        <Icon className="h-7 w-7 text-white" />
      </div>
      <span className="text-sm font-medium text-foreground text-center">{title}</span>
    </button>
  );
};

export default OptionButton;
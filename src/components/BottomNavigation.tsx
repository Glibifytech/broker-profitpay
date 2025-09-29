import { Home, Wallet, TrendingUp, ArrowDownLeft, ArrowRightLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  const tabs = [
    { id: 'deposit', label: 'Deposit', icon: ArrowDownLeft },
    { id: 'invest', label: 'My invest', icon: TrendingUp },
    { id: 'home', label: 'Home', icon: Home },
    { id: 'withdraw', label: 'Withdraw', icon: Wallet },
    { id: 'transfer', label: 'Transfer', icon: ArrowRightLeft },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-all duration-300',
                isActive 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <div className={cn(
                'p-2 rounded-full transition-colors duration-300',
                isActive ? 'bg-primary/10' : 'hover:bg-muted'
              )}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
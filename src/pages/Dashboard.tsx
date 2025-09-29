import { useState } from 'react';
import { 
  Wallet, 
  Timer, 
  TrendingUp, 
  FolderOpen,
  FileText,
  Users,
  ArrowRightLeft,
  DollarSign,
  BarChart3,
  LogOut
} from 'lucide-react';
import StatsCard from '@/components/StatsCard';
import OptionButton from '@/components/OptionButton';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';

interface DashboardProps {
  onLogout: () => void;
  user: { username: string };
}

const Dashboard = ({ onLogout, user }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState('home');

  const stats = [
    {
      title: 'Account balance',
      amount: '0.00 $',
      icon: DollarSign,
      variant: 'balance' as const,
      className: 'col-span-2'
    },
    {
      title: 'Total withdraw',
      amount: '0.00 $',
      icon: Wallet,
      variant: 'withdraw' as const
    },
    {
      title: 'Total deposit', 
      amount: '0.00 $',
      icon: Timer,
      variant: 'deposit' as const
    },
    {
      title: 'Total invest',
      amount: '0.00 $',
      icon: TrendingUp,
      variant: 'invest' as const
    },
    {
      title: 'Current invest',
      amount: '0 $',
      icon: FolderOpen,
      variant: 'current' as const
    }
  ];

  const options = [
    { title: 'Invest log', icon: FileText, color: 'hsl(25, 90%, 60%)' },
    { title: 'Deposit log', icon: FileText, color: 'hsl(185, 85%, 55%)' },
    { title: 'Withdraw log', icon: FileText, color: 'hsl(220, 85%, 60%)' },
    { title: 'Interest log', icon: FileText, color: 'hsl(145, 70%, 50%)' },
    { title: 'Money transfer log', icon: ArrowRightLeft, color: 'hsl(15, 80%, 65%)' },
    { title: 'Transaction log', icon: BarChart3, color: 'hsl(195, 85%, 60%)' },
    { title: 'Referral log', icon: Users, color: 'hsl(235, 75%, 65%)' }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-balance p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">ProfitPay Investment</h1>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium">{user.username}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onLogout}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              amount={stat.amount}
              icon={stat.icon}
              variant={stat.variant}
              className={stat.className}
            />
          ))}
        </div>

        {/* More Options */}
        <div className="bg-card rounded-2xl p-6 shadow-card">
          <h2 className="text-xl font-bold text-foreground mb-6">More options</h2>
          <div className="grid grid-cols-3 gap-6">
            {options.map((option, index) => (
              <OptionButton
                key={index}
                title={option.title}
                icon={option.icon}
                color={option.color}
                onClick={() => console.log(`Clicked ${option.title}`)}
              />
            ))}
          </div>
        </div>

        {/* Referral Section */}
        <div className="bg-card rounded-2xl p-6 shadow-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">Your Referral Link</h3>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground font-mono break-all">
              https://profitpayinvestment.com/ref/{user.username}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Dashboard;
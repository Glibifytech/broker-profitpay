import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  LogOut,
  Bell,
  Settings,
  Shield
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import StatsCard from '@/components/StatsCard';
import OptionButton from '@/components/OptionButton';
import BottomNavigation from '@/components/BottomNavigation';
import DepositFlow from '@/pages/DepositFlow';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardProps {
  onLogout: () => void;
  user: { email?: string; id: string };
}

const Dashboard = ({ onLogout, user }: DashboardProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [showDepositFlow, setShowDepositFlow] = useState(false);

  // Real stats - all zero except account balance (which comes from database)
  const realStats = {
    totalWithdraw: 0.00,
    totalDeposit: 0.00,
    totalInvest: 0.00,
    currentInvest: 0.00
  };

  useEffect(() => {
    loadUserData();
  }, [user.id]);

  const loadUserData = async () => {
    // Load profile balance
    const { data: profile } = await supabase
      .from('profiles')
      .select('balance')
      .eq('id', user.id)
      .single();

    if (profile) {
      setBalance(profile.balance);
    }

    setLoading(false);
  };

  const stats = [
    {
      title: 'Account balance',
      amount: `$${balance.toFixed(2)}`,
      icon: DollarSign,
      variant: 'balance' as const,
      className: 'col-span-2'
    },
    {
      title: 'Total withdraw',
      amount: `$${realStats.totalWithdraw.toFixed(2)}`,
      icon: Wallet,
      variant: 'withdraw' as const
    },
    {
      title: 'Total deposit', 
      amount: `$${realStats.totalDeposit.toFixed(2)}`,
      icon: Timer,
      variant: 'deposit' as const
    },
    {
      title: 'Total invest',
      amount: `$${realStats.totalInvest.toFixed(2)}`,
      icon: TrendingUp,
      variant: 'invest' as const
    },
    {
      title: 'Current invest',
      amount: `$${realStats.currentInvest.toFixed(2)}`,
      icon: FolderOpen,
      variant: 'current' as const
    }
  ];

  const showComingSoon = (title: string) => {
    alert(`${title} - Coming Soon!`);
  };

  const baseOptions = [
    { title: 'Invest log', icon: FileText, color: 'hsl(25, 90%, 60%)', onClick: () => showComingSoon('Invest log') },
    { title: 'Deposit log', icon: FileText, color: 'hsl(185, 85%, 55%)', onClick: () => showComingSoon('Deposit log') },
    { title: 'Withdraw log', icon: FileText, color: 'hsl(220, 85%, 60%)', onClick: () => showComingSoon('Withdraw log') },
    { title: 'Interest log', icon: FileText, color: 'hsl(145, 70%, 50%)', onClick: () => showComingSoon('Interest log') },
    { title: 'Money transfer log', icon: ArrowRightLeft, color: 'hsl(15, 80%, 65%)', onClick: () => showComingSoon('Money transfer log') },
    { title: 'Transaction log', icon: BarChart3, color: 'hsl(195, 85%, 60%)', onClick: () => showComingSoon('Transaction log') },
    { title: 'Referral log', icon: Users, color: 'hsl(235, 75%, 65%)', onClick: () => showComingSoon('Referral log') }
  ];

  const options = baseOptions;

  const handleTabChange = (tab: string) => {
    if (tab === 'deposit') {
      setShowDepositFlow(true);
    } else if (tab === 'invest') {
      showComingSoon('My Invest');
    } else if (tab === 'withdraw') {
      showComingSoon('Withdraw');
    } else if (tab === 'transfer') {
      showComingSoon('Transfer');
    } else {
      setActiveTab(tab);
    }
  };

  const handleBackFromDeposit = () => {
    setShowDepositFlow(false);
    setActiveTab('home');
  };

  if (showDepositFlow) {
    return <DepositFlow user={user} onBack={handleBackFromDeposit} />;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-balance p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">ProfitPay Investment</h1>
            <p className="text-sm text-white/80">Welcome back, {user.email?.split('@')[0] || 'User'}!</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <Bell className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <Settings className="h-4 w-4" />
            </Button>
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
        {/* Portfolio Performance */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Portfolio Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">$0.00</p>
                <p className="text-sm text-muted-foreground">Total Return</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">$0.00</p>
                <p className="text-sm text-muted-foreground">This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
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
                onClick={option.onClick || (() => console.log(`Clicked ${option.title}`))}
              />
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-center p-8 text-muted-foreground">
                <p>No transactions yet. Start by making a deposit!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default Dashboard;
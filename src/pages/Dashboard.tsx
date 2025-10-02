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
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generateMockStats, generateMockTransactions, generateMockPortfolio } from '@/components/MockDataGenerator';

interface DashboardProps {
  onLogout: () => void;
  user: { email?: string; id: string };
  onNavigateAdmin?: () => void;
}

const Dashboard = ({ onLogout, user, onNavigateAdmin }: DashboardProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [balance, setBalance] = useState<number>(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Generate mock data based on username
  const mockStats = generateMockStats(user.email || 'user');
  const mockTransactions = generateMockTransactions(user.email || 'user');
  const mockPortfolio = generateMockPortfolio();

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

    // Check if user is admin
    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle();

    setIsAdmin(!!roles);
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
      amount: `$${mockStats.totalWithdraw}`,
      icon: Wallet,
      variant: 'withdraw' as const
    },
    {
      title: 'Total deposit', 
      amount: `$${mockStats.totalDeposit}`,
      icon: Timer,
      variant: 'deposit' as const
    },
    {
      title: 'Total invest',
      amount: `$${mockStats.totalInvest}`,
      icon: TrendingUp,
      variant: 'invest' as const
    },
    {
      title: 'Current invest',
      amount: `$${mockStats.currentInvest}`,
      icon: FolderOpen,
      variant: 'current' as const
    }
  ];

  const baseOptions = [
    { title: 'Invest log', icon: FileText, color: 'hsl(25, 90%, 60%)', onClick: undefined },
    { title: 'Deposit log', icon: FileText, color: 'hsl(185, 85%, 55%)', onClick: undefined },
    { title: 'Withdraw log', icon: FileText, color: 'hsl(220, 85%, 60%)', onClick: undefined },
    { title: 'Interest log', icon: FileText, color: 'hsl(145, 70%, 50%)', onClick: undefined },
    { title: 'Money transfer log', icon: ArrowRightLeft, color: 'hsl(15, 80%, 65%)', onClick: undefined },
    { title: 'Transaction log', icon: BarChart3, color: 'hsl(195, 85%, 60%)', onClick: undefined },
    { title: 'Referral log', icon: Users, color: 'hsl(235, 75%, 65%)', onClick: undefined }
  ];

  const adminOption = { 
    title: 'Admin Panel', 
    icon: Shield, 
    color: 'hsl(0, 80%, 60%)',
    onClick: onNavigateAdmin 
  };

  const options = isAdmin ? [adminOption, ...baseOptions] : baseOptions;

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
            {isAdmin && onNavigateAdmin && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onNavigateAdmin}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
                title="Admin Panel"
              >
                <Shield className="h-4 w-4" />
              </Button>
            )}
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
                <p className="text-2xl font-bold text-green-600">{mockPortfolio.totalReturn}</p>
                <p className="text-sm text-muted-foreground">Total Return</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{mockPortfolio.monthlyReturn}</p>
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
              {mockTransactions.slice(0, 3).map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      transaction.type === 'deposit' ? 'bg-green-100 text-green-600' :
                      transaction.type === 'withdraw' ? 'bg-blue-100 text-blue-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {transaction.type === 'deposit' ? '↓' : 
                       transaction.type === 'withdraw' ? '↑' : '→'}
                    </div>
                    <div>
                      <p className="font-medium capitalize">{transaction.type}</p>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${transaction.amount.toLocaleString()}</p>
                    <p className={`text-sm ${
                      transaction.status === 'completed' ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {transaction.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Dashboard;
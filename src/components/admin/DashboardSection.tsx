import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, DollarSign, TrendingUp, Activity } from 'lucide-react';

interface DashboardSectionProps {
  totalUsers: number;
  totalBalance: number;
}

export function DashboardSection({ totalUsers, totalBalance }: DashboardSectionProps) {
  const stats = [
    {
      title: 'Total Users',
      value: totalUsers,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Total Balance',
      value: `$${totalBalance.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Active Sessions',
      value: '127',
      icon: Activity,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Growth',
      value: '+12.5%',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome, Administrator</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <button className="p-4 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors font-medium">
              View Deposits
            </button>
            <button className="p-4 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-colors font-medium">
              Manage Users
            </button>
            <button className="p-4 border-2 border-orange-600 text-orange-600 rounded-lg hover:bg-orange-600 hover:text-white transition-colors font-medium">
              Withdrawals
            </button>
            <button className="p-4 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition-colors font-medium">
              KYC Requests
            </button>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { action: 'New user registered', time: '2 minutes ago' },
                { action: 'Withdrawal approved', time: '15 minutes ago' },
                { action: 'KYC document submitted', time: '1 hour ago' },
                { action: 'Deposit received', time: '2 hours ago' },
              ].map((activity, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                  <span className="text-sm text-foreground">{activity.action}</span>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

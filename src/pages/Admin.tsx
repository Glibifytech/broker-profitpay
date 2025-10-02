import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { LogOut, Menu } from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { DashboardSection } from '@/components/admin/DashboardSection';
import { UsersSection } from '@/components/admin/UsersSection';

interface Profile {
  id: string;
  email: string;
  balance: number;
  created_at: string;
}

interface AdminProps {
  onLogout: () => void;
  onBack: () => void;
}

export default function Admin({ onLogout }: AdminProps) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState('dashboard');
  const { toast } = useToast();

  useEffect(() => {
    loadProfiles();
    
    const channel = supabase
      .channel('profiles-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => {
        loadProfiles();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProfiles(data || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to load users',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTopUp = async (userId: string, amount: string) => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) {
      toast({
        title: 'Invalid Amount',
        description: 'Please enter a valid amount',
        variant: 'destructive',
      });
      return;
    }

    try {
      const profile = profiles.find(p => p.id === userId);
      if (!profile) throw new Error('User not found');

      const newBalance = Number(profile.balance) + numAmount;

      const { error } = await supabase
        .from('profiles')
        .update({ balance: newBalance })
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: `Balance updated for ${profile.email}`,
      });

      loadProfiles();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update balance',
        variant: 'destructive',
      });
    }
  };

  const totalBalance = profiles.reduce((sum, p) => sum + Number(p.balance), 0);

  const renderSection = () => {
    switch (currentSection) {
      case 'dashboard':
        return <DashboardSection totalUsers={profiles.length} totalBalance={totalBalance} />;
      case 'users':
        return <UsersSection profiles={profiles} onTopUp={handleTopUp} />;
      case 'deposits':
        return (
          <div>
            <h1 className="text-3xl font-bold">Manage Deposits</h1>
            <p className="text-muted-foreground mt-2">View and manage user deposits</p>
            <div className="mt-6 p-8 border-2 border-dashed rounded-lg text-center text-muted-foreground">
              Deposit management coming soon
            </div>
          </div>
        );
      case 'withdrawal':
        return (
          <div>
            <h1 className="text-3xl font-bold">Manage Withdrawals</h1>
            <p className="text-muted-foreground mt-2">Process withdrawal requests</p>
            <div className="mt-6 p-8 border-2 border-dashed rounded-lg text-center text-muted-foreground">
              Withdrawal management coming soon
            </div>
          </div>
        );
      case 'kyc':
        return (
          <div>
            <h1 className="text-3xl font-bold">Manage KYC</h1>
            <p className="text-muted-foreground mt-2">Review KYC submissions</p>
            <div className="mt-6 p-8 border-2 border-dashed rounded-lg text-center text-muted-foreground">
              KYC management coming soon
            </div>
          </div>
        );
      case 'settings':
        return (
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground mt-2">Configure admin panel settings</p>
            <div className="mt-6 p-8 border-2 border-dashed rounded-lg text-center text-muted-foreground">
              Settings coming soon
            </div>
          </div>
        );
      default:
        return <DashboardSection totalUsers={profiles.length} totalBalance={totalBalance} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading admin panel...</p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar currentSection={currentSection} onSectionChange={setCurrentSection} />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b bg-card flex items-center justify-between px-6 sticky top-0 z-40">
            <div className="flex items-center gap-4">
              <SidebarTrigger>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SidebarTrigger>
              <h2 className="font-semibold text-lg">ProfitPay Admin</h2>
            </div>
            
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-auto">
            {renderSection()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

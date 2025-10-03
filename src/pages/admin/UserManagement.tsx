import { useState, useEffect } from 'react';
import { adminSupabase } from '@/integrations/supabase/adminClient';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  DollarSign, 
  Activity, 
  Shield, 
  ShieldOff, 
  History, 
  Bot, 
  Coins, 
  Edit, 
  UserPlus, 
  Mail,
  Trash2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Profile {
  id: string;
  email: string;
  balance: number;
  created_at: string;
  updated_at: string;
  is_blocked?: boolean;
  kyc_status?: string;
}

interface UserManagementProps {
  userId: string;
  onBack: () => void;
}

const UserManagement = ({ userId, onBack }: UserManagementProps) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [creditAmount, setCreditAmount] = useState('');
  const [debitAmount, setDebitAmount] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadUser();
  }, [userId]);

  const loadUser = async () => {
    try {
      console.log('Loading user with ID:', userId);
      const { data, error } = await adminSupabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      console.log('User data:', data);
      console.log('User error:', error);

      if (error) throw error;
      setUser(data);
    } catch (error: any) {
      console.error('Failed to load user:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to load user',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreditDebit = async (amount: string, type: 'credit' | 'debit') => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast({
        title: 'Invalid Amount',
        description: 'Please enter a valid positive amount',
        variant: 'destructive',
      });
      return;
    }

    if (!user) return;

    try {
      const newBalance = type === 'credit' 
        ? Number(user.balance) + numAmount 
        : Number(user.balance) - numAmount;

      if (newBalance < 0) {
        toast({
          title: 'Insufficient Balance',
          description: 'Cannot debit more than current balance',
          variant: 'destructive',
        });
        return;
      }

      console.log(`${type === 'credit' ? 'Crediting' : 'Debiting'} ${numAmount} to user ${user.email}. New balance: ${newBalance}`);
      
      const { error } = await adminSupabase
        .from('profiles')
        .update({ 
          balance: newBalance,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: `${type === 'credit' ? 'Credited' : 'Debited'} $${numAmount} ${type === 'credit' ? 'to' : 'from'} ${user.email}`,
      });

      // Clear input and reload user
      if (type === 'credit') setCreditAmount('');
      if (type === 'debit') setDebitAmount('');
      loadUser();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || `Failed to ${type} balance`,
        variant: 'destructive',
      });
    }
  };

  const handleBlockUser = async () => {
    if (!user) return;
    
    try {
      // For now, we'll use a simple approach. In production, you'd have a proper user status system
      toast({
        title: 'Feature Coming Soon',
        description: 'User blocking functionality will be implemented',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to block user',
        variant: 'destructive',
      });
    }
  };

  const handleAction = (action: string) => {
    switch (action) {
      case 'login-activity':
        toast({ title: 'Feature Coming Soon', description: 'Login activity tracking will be implemented' });
        break;
      case 'block':
        handleBlockUser();
        break;
      case 'turn-off-trade':
        toast({ title: 'Feature Coming Soon', description: 'Trade management will be implemented' });
        break;
      case 'reset-password':
        toast({ title: 'Feature Coming Soon', description: 'Password reset will be implemented' });
        break;
      case 'clear-account':
        toast({ title: 'Feature Coming Soon', description: 'Account clearing will be implemented' });
        break;
      case 'add-trading-history':
        toast({ title: 'Feature Coming Soon', description: 'Trading history management will be implemented' });
        break;
      case 'add-bot-history':
        toast({ title: 'Feature Coming Soon', description: 'Bot trading history will be implemented' });
        break;
      case 'add-coin-history':
        toast({ title: 'Feature Coming Soon', description: 'Coin history management will be implemented' });
        break;
      case 'edit':
        toast({ title: 'Feature Coming Soon', description: 'User editing will be implemented' });
        break;
      case 'add-referral':
        toast({ title: 'Feature Coming Soon', description: 'Referral management will be implemented' });
        break;
      case 'send-email':
        toast({ title: 'Feature Coming Soon', description: 'Email sending will be implemented' });
        break;
      case 'login-as':
        toast({ title: 'Feature Coming Soon', description: 'Login as user will be implemented' });
        break;
      case 'delete':
        toast({ title: 'Feature Coming Soon', description: 'User deletion will be implemented' });
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading user details...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">User not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-blue-600">{user.email}</h1>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => handleAction('login-activity')}>
                <Activity className="h-4 w-4 mr-2" />
                Login Activity
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('block')}>
                <ShieldOff className="h-4 w-4 mr-2" />
                Block
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('turn-off-trade')}>
                <Shield className="h-4 w-4 mr-2" />
                Turn off trade
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('reset-password')}>
                <Shield className="h-4 w-4 mr-2" />
                Reset Password
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('clear-account')}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Account
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('add-trading-history')}>
                <History className="h-4 w-4 mr-2" />
                Add Trading History
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('add-bot-history')}>
                <Bot className="h-4 w-4 mr-2" />
                Add Bot Trading History
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('add-coin-history')}>
                <Coins className="h-4 w-4 mr-2" />
                Add Coin History
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('edit')}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('add-referral')}>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Referral
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('send-email')}>
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('login-as')} className="text-green-600">
                <Shield className="h-4 w-4 mr-2" />
                Login as {user.email.split('@')[0]}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('delete')} className="text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete {user.email.split('@')[0]}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Account Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${Number(user.balance).toFixed(2)}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$0</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Referral Bonus</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$0</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bonus</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$0</div>
              </CardContent>
            </Card>
          </div>

          {/* User Status & Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Account Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Active
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Investment Plans</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">No Investment Plan</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>KYC</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant="destructive">
                  Not Verified Yet
                </Badge>
              </CardContent>
            </Card>

            {/* Credit/Debit Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Credit/Debit Balance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Credit Amount</label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Enter amount to credit"
                      value={creditAmount}
                      onChange={(e) => setCreditAmount(e.target.value)}
                    />
                    <Button 
                      onClick={() => handleCreditDebit(creditAmount, 'credit')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Credit
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Debit Amount</label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Enter amount to debit"
                      value={debitAmount}
                      onChange={(e) => setDebitAmount(e.target.value)}
                    />
                    <Button 
                      onClick={() => handleCreditDebit(debitAmount, 'debit')}
                      variant="destructive"
                    >
                      Debit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;

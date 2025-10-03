import { useState, useEffect } from 'react';
import { adminSupabase } from '@/integrations/supabase/adminClient';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, DollarSign } from 'lucide-react';

interface Deposit {
  id: string;
  user_id: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  payment_method: string;
  crypto_type: string;
  wallet_address: string;
  created_at: string;
  profiles?: {
    email: string;
  };
}

export function DepositsSection() {
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadDeposits();
    
    // Set up real-time subscription
    const channel = adminSupabase
      .channel('deposits-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'deposits' }, () => {
        console.log('Deposit change detected, reloading...');
        loadDeposits();
      })
      .subscribe();

    return () => {
      adminSupabase.removeChannel(channel);
    };
  }, []);

  const loadDeposits = async () => {
    try {
      console.log('Loading deposits...');
      const { data, error } = await adminSupabase
        .from('deposits')
        .select(`
          *,
          profiles:user_id (
            email
          )
        `)
        .order('created_at', { ascending: false });

      console.log('Deposits data:', data);
      console.log('Deposits error:', error);

      if (error) throw error;
      setDeposits(data || []);
    } catch (error: any) {
      console.error('Failed to load deposits:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to load deposits',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDepositAction = async (depositId: string, action: 'approve' | 'reject') => {
    try {
      const deposit = deposits.find(d => d.id === depositId);
      if (!deposit) throw new Error('Deposit not found');

      console.log(`${action === 'approve' ? 'Approving' : 'Rejecting'} deposit:`, depositId);

      // Update deposit status
      const { error: updateError } = await adminSupabase
        .from('deposits')
        .update({
          status: action === 'approve' ? 'approved' : 'rejected',
          processed_at: new Date().toISOString()
        })
        .eq('id', depositId);

      if (updateError) throw updateError;

      // If approved, add to user balance
      if (action === 'approve') {
        console.log(`Adding ${deposit.amount} to user ${deposit.user_id} balance`);
        
        // Get current user balance
        const { data: profileData, error: profileError } = await adminSupabase
          .from('profiles')
          .select('balance')
          .eq('id', deposit.user_id)
          .single();

        if (profileError) throw profileError;

        const newBalance = Number(profileData.balance) + Number(deposit.amount);

        // Update user balance
        const { error: balanceError } = await adminSupabase
          .from('profiles')
          .update({ balance: newBalance })
          .eq('id', deposit.user_id);

        if (balanceError) throw balanceError;

        toast({
          title: 'Deposit Approved',
          description: `$${deposit.amount} added to user balance`,
        });
      } else {
        toast({
          title: 'Deposit Rejected',
          description: 'Deposit has been rejected',
        });
      }

      loadDeposits();
    } catch (error: any) {
      console.error(`Failed to ${action} deposit:`, error);
      toast({
        title: 'Error',
        description: error.message || `Failed to ${action} deposit`,
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'approved':
        return <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge variant="secondary" className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground">Loading deposits...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Manage Deposits</h1>
        <p className="text-muted-foreground mt-2">Review and process user deposits</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Deposits</p>
                <p className="text-2xl font-bold">{deposits.length}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {deposits.filter(d => d.status === 'pending').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold text-green-600">
                  {deposits.filter(d => d.status === 'approved').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rejected</p>
                <p className="text-2xl font-bold text-red-600">
                  {deposits.filter(d => d.status === 'rejected').length}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Deposits Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Deposits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deposits.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No deposits found
                    </TableCell>
                  </TableRow>
                ) : (
                  deposits.map((deposit) => (
                    <TableRow key={deposit.id}>
                      <TableCell className="font-medium">
                        {deposit.profiles?.email || 'Unknown User'}
                      </TableCell>
                      <TableCell className="font-semibold text-green-600">
                        ${Number(deposit.amount).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="capitalize">{deposit.payment_method}</span>
                          {deposit.crypto_type && (
                            <Badge variant="outline" className="text-xs">
                              {deposit.crypto_type.toUpperCase()}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(deposit.status)}
                      </TableCell>
                      <TableCell>
                        {new Date(deposit.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {deposit.status === 'pending' && (
                          <div className="flex gap-2 justify-end">
                            <Button
                              size="sm"
                              onClick={() => handleDepositAction(deposit.id, 'approve')}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDepositAction(deposit.id, 'reject')}
                            >
                              <XCircle className="h-3 w-3 mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}
                        {deposit.status !== 'pending' && (
                          <span className="text-sm text-muted-foreground">
                            {deposit.status === 'approved' ? 'Processed' : 'Rejected'}
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

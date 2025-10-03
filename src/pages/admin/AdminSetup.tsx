import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Shield } from 'lucide-react';

const AdminSetup = () => {
  const [email, setEmail] = useState('hzqi86x4ic@ozsaip.com');
  const [password, setPassword] = useState('hzqi86x4ic@ozsaip.com');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const createAdminUser = async () => {
    setLoading(true);
    try {
      // 1. Create the user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // 2. Create profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            email: authData.user.email!,
            balance: 1000 // Give admin some initial balance
          });

        if (profileError) {
          console.warn('Profile creation error (might already exist):', profileError);
        }

        // 3. Add admin role
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert({
            user_id: authData.user.id,
            role: 'admin'
          });

        if (roleError) {
          console.warn('Role creation error (might already exist):', roleError);
        }

        toast({
          title: 'Success!',
          description: `Admin user created successfully! Email: ${email}, Password: ${password}`,
        });
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create admin user',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-balance flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-balance rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Admin Setup</CardTitle>
          <CardDescription>
            Create an admin user for testing (Development Only)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Admin Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Admin Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            onClick={createAdminUser}
            disabled={loading}
            className="w-full bg-gradient-balance hover:opacity-90"
          >
            {loading ? 'Creating Admin...' : 'Create Admin User'}
          </Button>
          
          <div className="text-sm text-muted-foreground space-y-2">
            <p><strong>After creating admin:</strong></p>
            <p>1. Go to <code>/admin</code> or <code>/secure-admin-panel-2024</code></p>
            <p>2. Login with the credentials above</p>
            <p>3. You'll have full admin access!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSetup;

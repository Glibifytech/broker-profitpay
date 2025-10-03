import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MoreHorizontal, DollarSign, User, Settings } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Profile {
  id: string;
  email: string;
  balance: number;
  created_at: string;
}

interface UsersSectionProps {
  profiles: Profile[];
  onTopUp: (userId: string, amount: string) => void;
  onUserClick: (userId: string) => void;
}

export function UsersSection({ profiles, onTopUp, onUserClick }: UsersSectionProps) {
  const [topUpUserId, setTopUpUserId] = useState<string>('');
  const [topUpAmount, setTopUpAmount] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProfiles = profiles.filter(profile =>
    profile.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTopUpSubmit = () => {
    if (topUpUserId && topUpAmount) {
      onTopUp(topUpUserId, topUpAmount);
      setTopUpUserId('');
      setTopUpAmount('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Manage Users</h1>
        <p className="text-muted-foreground mt-2">View and manage user accounts</p>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>User Accounts</CardTitle>
            <Input
              placeholder="Search by email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-xs"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProfiles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProfiles.map((profile) => (
                    <TableRow key={profile.id}>
                      <TableCell className="font-medium">{profile.email}</TableCell>
                      <TableCell className="text-green-600 font-semibold">
                        ${Number(profile.balance).toFixed(2)}
                      </TableCell>
                      <TableCell>{new Date(profile.created_at).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-background border shadow-lg z-50">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => onUserClick(profile.id)}
                            >
                              <User className="mr-2 h-4 w-4" />
                              Manage User
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setTopUpUserId(profile.id);
                                setTopUpAmount('');
                              }}
                            >
                              <DollarSign className="mr-2 h-4 w-4" />
                              Quick Balance Adjust
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {topUpUserId && (
        <Card className="border-2 border-primary shadow-lg">
          <CardHeader>
            <CardTitle>Adjust User Balance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                User: <span className="font-medium text-foreground">
                  {profiles.find(p => p.id === topUpUserId)?.email}
                </span>
              </p>
              <p className="text-sm text-muted-foreground">
                Current Balance: <span className="font-medium text-green-600">
                  ${Number(profiles.find(p => p.id === topUpUserId)?.balance || 0).toFixed(2)}
                </span>
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount to Add ($)</label>
              <Input
                type="number"
                step="0.01"
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(e.target.value)}
                placeholder="Enter amount (use negative to subtract)"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleTopUpSubmit}
                disabled={!topUpAmount}
                className="flex-1"
              >
                Confirm
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setTopUpUserId('');
                  setTopUpAmount('');
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

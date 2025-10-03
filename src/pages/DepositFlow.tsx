import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Copy, CreditCard, Smartphone, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { adminSupabase } from '@/integrations/supabase/adminClient';

interface DepositFlowProps {
  user: { id: string; email?: string };
  onBack: () => void;
}

type DepositStep = 'payment-method' | 'crypto-selection' | 'wallet-address' | 'processing' | 'completed';

const DepositFlow = ({ user, onBack }: DepositFlowProps) => {
  const [currentStep, setCurrentStep] = useState<DepositStep>('payment-method');
  const [amount, setAmount] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [depositId, setDepositId] = useState('');
  const { toast } = useToast();

  const SOLANA_WALLET = '4VMixhmNThQDU9gSNRwFishcFPFsHDYLBWjsaRo5yPpx';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'Wallet address copied to clipboard',
    });
  };

  const handlePaymentMethodSelect = (method: string) => {
    if (method === 'crypto') {
      setCurrentStep('crypto-selection');
    } else {
      toast({
        title: 'Coming Soon',
        description: 'This payment method will be available soon',
      });
    }
  };

  const handleCryptoSelect = (crypto: string) => {
    setSelectedCrypto(crypto);
    if (crypto === 'solana') {
      setCurrentStep('wallet-address');
    } else {
      toast({
        title: 'Coming Soon',
        description: 'This cryptocurrency will be available soon',
      });
    }
  };

  const handleProcessDeposit = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: 'Invalid Amount',
        description: 'Please enter a valid amount',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { data, error } = await adminSupabase
        .from('deposits')
        .insert({
          user_id: user.id,
          amount: parseFloat(amount),
          status: 'pending',
          payment_method: 'crypto',
          crypto_type: 'solana',
          wallet_address: SOLANA_WALLET,
        })
        .select()
        .single();

      if (error) throw error;

      setDepositId(data.id);
      setCurrentStep('processing');

      toast({
        title: 'Deposit Submitted',
        description: 'Your deposit is being processed',
      });
    } catch (error: any) {
      console.error('Failed to create deposit:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to submit deposit',
        variant: 'destructive',
      });
    }
  };

  const renderPaymentMethod = () => (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          Select Payment Method
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={() => handlePaymentMethodSelect('crypto')}
          className="w-full h-16 flex items-center justify-start gap-4 text-left"
          variant="outline"
        >
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <span className="text-orange-600 font-bold">₿</span>
          </div>
          <div>
            <p className="font-semibold">Cryptocurrency</p>
            <p className="text-sm text-muted-foreground">Bitcoin, Solana, etc.</p>
          </div>
        </Button>

        <Button
          onClick={() => handlePaymentMethodSelect('card')}
          className="w-full h-16 flex items-center justify-start gap-4 text-left"
          variant="outline"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <CreditCard className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="font-semibold">Credit/Debit Card</p>
            <p className="text-sm text-muted-foreground">Coming Soon</p>
          </div>
        </Button>

        <Button
          onClick={() => handlePaymentMethodSelect('mobile')}
          className="w-full h-16 flex items-center justify-start gap-4 text-left"
          variant="outline"
        >
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Smartphone className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="font-semibold">Mobile Money</p>
            <p className="text-sm text-muted-foreground">Coming Soon</p>
          </div>
        </Button>
      </CardContent>
    </Card>
  );

  const renderCryptoSelection = () => (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setCurrentStep('payment-method')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          Select Cryptocurrency
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={() => handleCryptoSelect('solana')}
          className="w-full h-16 flex items-center justify-start gap-4 text-left"
          variant="outline"
        >
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-purple-600 font-bold">SOL</span>
          </div>
          <div>
            <p className="font-semibold">Solana</p>
            <p className="text-sm text-muted-foreground">Fast & Low Fees</p>
          </div>
        </Button>

        <Button
          onClick={() => handleCryptoSelect('bitcoin')}
          className="w-full h-16 flex items-center justify-start gap-4 text-left"
          variant="outline"
        >
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <span className="text-orange-600 font-bold">₿</span>
          </div>
          <div>
            <p className="font-semibold">Bitcoin</p>
            <p className="text-sm text-muted-foreground">Coming Soon</p>
          </div>
        </Button>

        <Button
          onClick={() => handleCryptoSelect('ethereum')}
          className="w-full h-16 flex items-center justify-start gap-4 text-left"
          variant="outline"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-bold">ETH</span>
          </div>
          <div>
            <p className="font-semibold">Ethereum</p>
            <p className="text-sm text-muted-foreground">Coming Soon</p>
          </div>
        </Button>
      </CardContent>
    </Card>
  );

  const renderWalletAddress = () => (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setCurrentStep('crypto-selection')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          Deposit Solana
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount (USD)</Label>
          <Input
            id="amount"
            type="number"
            placeholder="100"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Wallet Address</Label>
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between">
              <p className="text-sm font-mono break-all">{SOLANA_WALLET}</p>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => copyToClipboard(SOLANA_WALLET)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Instructions:</strong>
            <br />
            1. Copy the wallet address above
            <br />
            2. Send exactly ${amount || '0'} worth of SOL to this address
            <br />
            3. Click "I've Sent Payment" below
            <br />
            4. Wait for admin approval
          </p>
        </div>

        <Button
          onClick={handleProcessDeposit}
          className="w-full"
          disabled={!amount || parseFloat(amount) <= 0}
        >
          I've Sent Payment
        </Button>
      </CardContent>
    </Card>
  );

  const renderProcessing = () => (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Processing Deposit</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-6">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
          <div className="w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        
        <div>
          <p className="font-semibold">Deposit Submitted</p>
          <p className="text-sm text-muted-foreground mt-2">
            Your deposit of ${amount} is being reviewed by our team.
            <br />
            You will be notified once it's approved.
          </p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Deposit ID:</strong> {depositId.slice(0, 8)}...
            <br />
            <strong>Status:</strong> Pending Review
            <br />
            <strong>Amount:</strong> ${amount}
          </p>
        </div>

        <Button onClick={onBack} variant="outline" className="w-full">
          Back to Dashboard
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      {currentStep === 'payment-method' && renderPaymentMethod()}
      {currentStep === 'crypto-selection' && renderCryptoSelection()}
      {currentStep === 'wallet-address' && renderWalletAddress()}
      {currentStep === 'processing' && renderProcessing()}
    </div>
  );
};

export default DepositFlow;

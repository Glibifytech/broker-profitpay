-- Create deposits table for manual deposit processing
CREATE TABLE IF NOT EXISTS public.deposits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  payment_method TEXT NOT NULL DEFAULT 'crypto',
  crypto_type TEXT NOT NULL DEFAULT 'solana',
  wallet_address TEXT NOT NULL,
  proof_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed_by UUID REFERENCES public.profiles(id),
  processed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on deposits (but we'll disable it for now like profiles)
ALTER TABLE public.deposits ENABLE ROW LEVEL SECURITY;

-- Temporarily disable RLS for testing
ALTER TABLE public.deposits DISABLE ROW LEVEL SECURITY;

-- Create trigger for updated_at
CREATE TRIGGER update_deposits_updated_at
  BEFORE UPDATE ON public.deposits
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

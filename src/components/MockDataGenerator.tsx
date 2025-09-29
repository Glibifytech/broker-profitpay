// Mock data for dashboard stats with realistic values
export const generateMockStats = (username: string) => {
  // Generate consistent mock data based on username
  const seed = username.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  const random = (min: number, max: number) => {
    const x = Math.sin(seed) * 10000;
    return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min;
  };

  const balance = random(1000, 25000);
  const totalDeposit = random(5000, 50000);
  const totalWithdraw = random(2000, totalDeposit - 1000);
  const totalInvest = random(3000, 15000);
  const currentInvest = random(500, totalInvest);

  return {
    balance: balance.toLocaleString('en-US'),
    totalDeposit: totalDeposit.toLocaleString('en-US'),
    totalWithdraw: totalWithdraw.toLocaleString('en-US'),
    totalInvest: totalInvest.toLocaleString('en-US'),
    currentInvest: currentInvest.toLocaleString('en-US')
  };
};

// Mock transaction data
export const generateMockTransactions = (username: string) => {
  const transactions = [
    { type: 'deposit', amount: 5000, date: '2024-01-15', status: 'completed' },
    { type: 'invest', amount: 2500, date: '2024-01-16', status: 'active' },
    { type: 'withdraw', amount: 1200, date: '2024-01-18', status: 'completed' },
    { type: 'deposit', amount: 3000, date: '2024-01-20', status: 'completed' },
    { type: 'invest', amount: 1800, date: '2024-01-22', status: 'active' },
  ];
  
  return transactions;
};

// Mock portfolio performance
export const generateMockPortfolio = () => {
  return {
    totalReturn: '+23.5%',
    monthlyReturn: '+4.2%',
    winRate: '87%',
    activeInvestments: 5
  };
};
// Revenue-specific data models and generators

export interface Transaction {
  id: string;
  date: Date;
  amount: number;
  customer: string;
  product: string;
  category: string;
  status: 'completed' | 'pending' | 'refunded';
  paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer' | 'crypto';
}

export interface RevenueMetrics {
  totalRevenue: number;
  growth: number;
  averageOrderValue: number;
  transactionCount: number;
  recurringRevenue: number;
  oneTimeRevenue: number;
  refundRate: number;
  topProducts: Array<{ name: string; revenue: number; count: number }>;
}

export interface RevenueGoal {
  target: number;
  current: number;
  percentage: number;
  daysRemaining: number;
  projectedTotal: number;
  status: 'on-track' | 'behind' | 'ahead';
}

// Product categories
const categories = ['Software', 'Services', 'Consulting', 'Support', 'Training'];
const products = [
  'Enterprise Plan', 'Pro Plan', 'Starter Plan', 
  'Custom Development', 'API Access', 'Priority Support',
  'Training Workshop', 'Consultation Package'
];

const customers = [
  'Acme Corp', 'TechStart Inc', 'Global Solutions', 'Digital Ventures',
  'Innovation Labs', 'Future Systems', 'Cloud Dynamics', 'Data Insights Co'
];

const paymentMethods: Transaction['paymentMethod'][] = ['credit_card', 'paypal', 'bank_transfer', 'crypto'];

// Generate random transactions
export function generateTransactions(count: number = 50): Transaction[] {
  const transactions: Transaction[] = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const daysAgo = Math.floor(Math.random() * 30);
    const date = new Date(now);
    date.setDate(date.getDate() - daysAgo);
    
    const status = Math.random() > 0.95 ? 'refunded' : 
                   Math.random() > 0.9 ? 'pending' : 'completed';
    
    transactions.push({
      id: `TRX-${String(i + 1000).padStart(5, '0')}`,
      date,
      amount: Math.floor(Math.random() * 5000) + 500,
      customer: customers[Math.floor(Math.random() * customers.length)],
      product: products[Math.floor(Math.random() * products.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      status,
      paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)]
    });
  }
  
  return transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
}

// Calculate revenue metrics
export function calculateMetrics(transactions: Transaction[]): RevenueMetrics {
  const completed = transactions.filter(t => t.status === 'completed');
  const refunded = transactions.filter(t => t.status === 'refunded');
  
  const totalRevenue = completed.reduce((sum, t) => sum + t.amount, 0);
  const refundAmount = refunded.reduce((sum, t) => sum + t.amount, 0);
  
  // Calculate growth (mock - comparing to "previous period")
  const growth = 15 + Math.random() * 20;
  
  // Product revenue aggregation
  const productRevenue = new Map<string, { revenue: number; count: number }>();
  completed.forEach(t => {
    const current = productRevenue.get(t.product) || { revenue: 0, count: 0 };
    productRevenue.set(t.product, {
      revenue: current.revenue + t.amount,
      count: current.count + 1
    });
  });
  
  const topProducts = Array.from(productRevenue.entries())
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);
  
  // Separate recurring vs one-time (mock logic)
  const recurringProducts = ['Enterprise Plan', 'Pro Plan', 'Starter Plan', 'Priority Support'];
  const recurringRevenue = completed
    .filter(t => recurringProducts.includes(t.product))
    .reduce((sum, t) => sum + t.amount, 0);
  
  return {
    totalRevenue,
    growth,
    averageOrderValue: completed.length > 0 ? totalRevenue / completed.length : 0,
    transactionCount: transactions.length,
    recurringRevenue,
    oneTimeRevenue: totalRevenue - recurringRevenue,
    refundRate: transactions.length > 0 ? (refunded.length / transactions.length) * 100 : 0,
    topProducts
  };
}

// Generate daily revenue data for charts
export function generateDailyRevenue(days: number = 30) {
  const data = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Generate realistic revenue pattern
    const dayOfWeek = date.getDay();
    const baseRevenue = 15000 + Math.random() * 10000;
    const weekendMultiplier = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.7 : 1;
    
    data.push({
      date: date.toISOString().split('T')[0],
      revenue: Math.floor(baseRevenue * weekendMultiplier),
      transactions: Math.floor(20 + Math.random() * 30)
    });
  }
  
  return data;
}

// Calculate revenue goals
export function calculateRevenueGoal(currentRevenue: number, targetRevenue: number = 500000): RevenueGoal {
  const now = new Date();
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const daysRemaining = Math.ceil((endOfMonth.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  const dailyAverage = currentRevenue / now.getDate();
  const projectedTotal = currentRevenue + (dailyAverage * daysRemaining);
  const percentage = (currentRevenue / targetRevenue) * 100;
  
  let status: RevenueGoal['status'] = 'on-track';
  if (percentage < (now.getDate() / endOfMonth.getDate()) * 100 - 10) {
    status = 'behind';
  } else if (percentage > (now.getDate() / endOfMonth.getDate()) * 100 + 10) {
    status = 'ahead';
  }
  
  return {
    target: targetRevenue,
    current: currentRevenue,
    percentage,
    daysRemaining,
    projectedTotal,
    status
  };
}

// Generate forecast data
export function generateForecast(historicalData: any[], futureDays: number = 7) {
  const lastValue = historicalData[historicalData.length - 1]?.revenue || 20000;
  const trend = 1.02; // 2% growth trend
  
  const forecast = [];
  const now = new Date();
  
  for (let i = 1; i <= futureDays; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() + i);
    
    const forecastValue = lastValue * Math.pow(trend, i) * (0.9 + Math.random() * 0.2);
    
    forecast.push({
      date: date.toISOString().split('T')[0],
      revenue: Math.floor(forecastValue),
      isForecast: true
    });
  }
  
  return forecast;
}
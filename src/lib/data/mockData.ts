export interface MetricData {
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: string;
  prefix?: string;
  suffix?: string;
}

export interface DashboardMetrics {
  revenue: MetricData;
  users: MetricData;
  pageViews: MetricData;
  conversionRate: MetricData;
}

function getRandomChange(min: number = -20, max: number = 50): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomValue(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateDashboardMetrics(): DashboardMetrics {
  const revenueValue = getRandomValue(45000, 125000);
  const revenueChange = getRandomChange(-10, 30);
  
  const usersValue = getRandomValue(1200, 3500);
  const usersChange = getRandomChange(-5, 25);
  
  const pageViewsValue = getRandomValue(8000, 25000);
  const pageViewsChange = getRandomChange(-15, 40);
  
  const conversionValue = parseFloat((Math.random() * 5 + 2).toFixed(2));
  const conversionChange = getRandomChange(-20, 20);

  return {
    revenue: {
      title: 'Total Revenue',
      value: revenueValue.toLocaleString(),
      change: Math.abs(revenueChange),
      changeType: revenueChange >= 0 ? 'increase' : 'decrease',
      icon: '💰',
      prefix: '$'
    },
    users: {
      title: 'Active Users',
      value: usersValue.toLocaleString(),
      change: Math.abs(usersChange),
      changeType: usersChange >= 0 ? 'increase' : 'decrease',
      icon: '👥'
    },
    pageViews: {
      title: 'Page Views',
      value: pageViewsValue.toLocaleString(),
      change: Math.abs(pageViewsChange),
      changeType: pageViewsChange >= 0 ? 'increase' : 'decrease',
      icon: '📊'
    },
    conversionRate: {
      title: 'Conversion Rate',
      value: conversionValue,
      change: Math.abs(conversionChange),
      changeType: conversionChange >= 0 ? 'increase' : 'decrease',
      icon: '📈',
      suffix: '%'
    }
  };
}

// Generate time series data for charts
export interface TimeSeriesData {
  label: string;
  value: number;
}

export function generateTimeSeriesData(points: number = 7): TimeSeriesData[] {
  const data: TimeSeriesData[] = [];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  for (let i = 0; i < points; i++) {
    data.push({
      label: days[i] || `Day ${i + 1}`,
      value: getRandomValue(1000, 5000)
    });
  }
  
  return data;
}

// Generate user activity data
export interface UserActivity {
  hour: string;
  active: number;
  new: number;
}

export function generateUserActivityData(): UserActivity[] {
  const data: UserActivity[] = [];
  
  for (let i = 0; i < 24; i++) {
    data.push({
      hour: `${i}:00`,
      active: getRandomValue(50, 300),
      new: getRandomValue(5, 50)
    });
  }
  
  return data;
}

// Generate revenue breakdown
export interface RevenueBreakdown {
  category: string;
  amount: number;
  percentage: number;
}

export function generateRevenueBreakdown(): RevenueBreakdown[] {
  const categories = [
    { name: 'Product Sales', weight: 0.4 },
    { name: 'Subscriptions', weight: 0.25 },
    { name: 'Services', weight: 0.2 },
    { name: 'Licensing', weight: 0.15 }
  ];
  
  const total = getRandomValue(80000, 150000);
  
  return categories.map(cat => ({
    category: cat.name,
    amount: Math.floor(total * cat.weight),
    percentage: Math.floor(cat.weight * 100)
  }));
}
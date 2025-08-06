<script lang="ts">
  import { onMount } from 'svelte';
  import LineChart from '$lib/components/charts/LineChart.svelte';
  import DoughnutChart from '$lib/components/charts/DoughnutChart.svelte';
  import { 
    generateTransactions, 
    calculateMetrics, 
    generateDailyRevenue,
    calculateRevenueGoal,
    generateForecast,
    type Transaction,
    type RevenueMetrics,
    type RevenueGoal
  } from '$lib/data/revenueData';
  
  // State management
  let transactions = $state<Transaction[]>(generateTransactions(100));
  let metrics = $state<RevenueMetrics>(calculateMetrics(transactions));
  let dailyRevenue = $state(generateDailyRevenue(30));
  let revenueGoal = $state<RevenueGoal>(calculateRevenueGoal(metrics.totalRevenue));
  let forecastData = $state(generateForecast(dailyRevenue, 7));
  
  // Filters
  let dateRange = $state('month');
  let statusFilter = $state('all');
  let searchTerm = $state('');
  let showForecast = $state(false);
  
  // Filtered transactions
  let filteredTransactions = $derived(() => {
    let filtered = [...transactions];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(t => t.status === statusFilter);
    }
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(t => 
        t.customer.toLowerCase().includes(term) ||
        t.product.toLowerCase().includes(term) ||
        t.id.toLowerCase().includes(term)
      );
    }
    
    // Apply date range filter
    const now = new Date();
    const startDate = new Date();
    
    switch (dateRange) {
      case 'today':
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
    }
    
    if (dateRange !== 'all') {
      filtered = filtered.filter(t => t.date >= startDate);
    }
    
    return filtered.slice(0, 10); // Show only first 10 for performance
  });
  
  // Chart data preparation
  let revenueChartData = $derived(() => {
    const chartData = showForecast ? [...dailyRevenue, ...forecastData] : dailyRevenue;
    
    return JSON.parse(JSON.stringify({
      labels: chartData.map(d => {
        const date = new Date(d.date);
        return date.toLocaleDateString('en', { month: 'short', day: 'numeric' });
      }),
      datasets: [
        {
          label: 'Revenue',
          data: chartData.map(d => d.revenue),
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.3,
          borderWidth: 2,
          pointRadius: chartData.map(d => 'isForecast' in d ? 2 : 3),
          borderDash: chartData.map(d => 'isForecast' in d ? [5, 5] : []),
        }
      ]
    }));
  });
  
  let categoryChartData = $derived(() => {
    const categoryRevenue = new Map<string, number>();
    transactions
      .filter(t => t.status === 'completed')
      .forEach(t => {
        categoryRevenue.set(t.category, (categoryRevenue.get(t.category) || 0) + t.amount);
      });
    
    return JSON.parse(JSON.stringify({
      labels: Array.from(categoryRevenue.keys()),
      datasets: [{
        data: Array.from(categoryRevenue.values()),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(244, 63, 94, 0.8)'
        ],
        borderWidth: 0,
      }]
    }));
  });
  
  // Simulate real-time updates
  onMount(() => {
    const interval = setInterval(() => {
      // Add a new transaction
      const newTransaction: Transaction = {
        id: `TRX-${Date.now()}`,
        date: new Date(),
        amount: Math.floor(Math.random() * 3000) + 500,
        customer: 'New Customer',
        product: 'Enterprise Plan',
        category: 'Software',
        status: 'completed',
        paymentMethod: 'credit_card'
      };
      
      transactions = [newTransaction, ...transactions.slice(0, 99)];
      metrics = calculateMetrics(transactions);
      revenueGoal = calculateRevenueGoal(metrics.totalRevenue);
    }, 8000);
    
    return () => clearInterval(interval);
  });
  
  // Format currency
  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }
  
  // Format date
  function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
</script>

<div class="p-6 max-w-7xl mx-auto">
  <!-- Header with Goal Progress -->
  <div class="mb-8">
    <div class="flex justify-between items-start mb-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Revenue Dashboard</h1>
        <p class="mt-2 text-gray-600">Track revenue performance and financial metrics</p>
      </div>
      <button 
        onclick={() => showForecast = !showForecast}
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        {showForecast ? 'Hide' : 'Show'} Forecast
      </button>
    </div>
    
    <!-- Revenue Goal Progress -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex justify-between items-center mb-4">
        <div>
          <p class="text-sm text-gray-600">Monthly Revenue Goal</p>
          <p class="text-2xl font-bold text-gray-900">{formatCurrency(revenueGoal.current)} / {formatCurrency(revenueGoal.target)}</p>
        </div>
        <div class="text-right">
          <span class={`inline-flex px-3 py-1 rounded-full text-sm font-medium
            ${revenueGoal.status === 'ahead' ? 'bg-green-100 text-green-800' : 
              revenueGoal.status === 'on-track' ? 'bg-blue-100 text-blue-800' : 
              'bg-red-100 text-red-800'}`}>
            {revenueGoal.status === 'ahead' ? '🚀 Ahead' : 
             revenueGoal.status === 'on-track' ? '✓ On Track' : 
             '⚠️ Behind'}
          </span>
          <p class="text-sm text-gray-600 mt-2">{revenueGoal.daysRemaining} days remaining</p>
        </div>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-3">
        <div 
          class="h-3 rounded-full transition-all duration-500 {revenueGoal.percentage > 100 ? 'bg-green-500' : 'bg-blue-500'}"
          style="width: {Math.min(revenueGoal.percentage, 100)}%"
        ></div>
      </div>
      <p class="text-sm text-gray-600 mt-2">
        Projected: {formatCurrency(revenueGoal.projectedTotal)} ({revenueGoal.percentage.toFixed(1)}% of goal)
      </p>
    </div>
  </div>
  
  <!-- Key Metrics -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <p class="text-sm text-gray-600">Total Revenue</p>
      <p class="text-2xl font-bold text-gray-900">{formatCurrency(metrics.totalRevenue)}</p>
      <p class="text-xs text-green-600">+{metrics.growth.toFixed(1)}% from last period</p>
    </div>
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <p class="text-sm text-gray-600">Avg Order Value</p>
      <p class="text-2xl font-bold text-gray-900">{formatCurrency(metrics.averageOrderValue)}</p>
      <p class="text-xs text-gray-500">{metrics.transactionCount} transactions</p>
    </div>
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <p class="text-sm text-gray-600">Recurring Revenue</p>
      <p class="text-2xl font-bold text-gray-900">{formatCurrency(metrics.recurringRevenue)}</p>
      <p class="text-xs text-gray-500">{((metrics.recurringRevenue / metrics.totalRevenue) * 100).toFixed(0)}% of total</p>
    </div>
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <p class="text-sm text-gray-600">Refund Rate</p>
      <p class="text-2xl font-bold text-gray-900">{metrics.refundRate.toFixed(1)}%</p>
      <p class="text-xs text-red-600">Target: &lt; 5%</p>
    </div>
  </div>
  
  <!-- Charts -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
    <div class="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">
        Revenue Trend {showForecast ? '(with 7-day forecast)' : ''}
      </h2>
      <LineChart data={revenueChartData()} height="300px" />
    </div>
    
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Revenue by Category</h2>
      <DoughnutChart data={categoryChartData()} height="250px" />
    </div>
  </div>
  
  <!-- Top Products -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Top Products</h2>
      <div class="space-y-3">
        {#each metrics.topProducts as product, i}
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <span class="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                {i + 1}
              </span>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-900">{product.name}</p>
                <p class="text-xs text-gray-500">{product.count} sales</p>
              </div>
            </div>
            <p class="text-sm font-bold text-gray-900">{formatCurrency(product.revenue)}</p>
          </div>
        {/each}
      </div>
    </div>
    
    <!-- Payment Methods Distribution -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h2>
      <div class="space-y-3">
        {#each ['credit_card', 'paypal', 'bank_transfer', 'crypto'] as method}
          {@const methodTransactions = transactions.filter(t => t.paymentMethod === method && t.status === 'completed')}
          {@const methodRevenue = methodTransactions.reduce((sum, t) => sum + t.amount, 0)}
          {@const percentage = (methodRevenue / metrics.totalRevenue) * 100}
          <div>
            <div class="flex justify-between text-sm mb-1">
              <span class="capitalize text-gray-700">{method.replace('_', ' ')}</span>
              <span class="text-gray-900 font-medium">{formatCurrency(methodRevenue)}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div 
                class="h-2 rounded-full bg-blue-500 transition-all duration-500"
                style="width: {percentage}%"
              ></div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
  
  <!-- Recent Transactions -->
  <div class="bg-white rounded-lg shadow-md p-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold text-gray-900">Recent Transactions</h2>
      <div class="flex gap-2">
        <input 
          type="text"
          bind:value={searchTerm}
          placeholder="Search transactions..."
          class="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select 
          bind:value={statusFilter}
          class="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="refunded">Refunded</option>
        </select>
        <select 
          bind:value={dateRange}
          class="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
          <option value="all">All Time</option>
        </select>
      </div>
    </div>
    
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-gray-200">
            <th class="text-left py-2 px-3 text-xs font-medium text-gray-500 uppercase">ID</th>
            <th class="text-left py-2 px-3 text-xs font-medium text-gray-500 uppercase">Date</th>
            <th class="text-left py-2 px-3 text-xs font-medium text-gray-500 uppercase">Customer</th>
            <th class="text-left py-2 px-3 text-xs font-medium text-gray-500 uppercase">Product</th>
            <th class="text-left py-2 px-3 text-xs font-medium text-gray-500 uppercase">Amount</th>
            <th class="text-left py-2 px-3 text-xs font-medium text-gray-500 uppercase">Status</th>
          </tr>
        </thead>
        <tbody>
          {#each filteredTransactions() as transaction}
            <tr class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td class="py-2 px-3 text-sm text-gray-900 font-mono">{transaction.id}</td>
              <td class="py-2 px-3 text-sm text-gray-600">{formatDate(transaction.date)}</td>
              <td class="py-2 px-3 text-sm text-gray-900">{transaction.customer}</td>
              <td class="py-2 px-3 text-sm text-gray-600">{transaction.product}</td>
              <td class="py-2 px-3 text-sm font-medium text-gray-900">{formatCurrency(transaction.amount)}</td>
              <td class="py-2 px-3">
                <span class={`inline-flex px-2 py-1 text-xs font-medium rounded-full
                  ${transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                    transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'}`}>
                  {transaction.status}
                </span>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
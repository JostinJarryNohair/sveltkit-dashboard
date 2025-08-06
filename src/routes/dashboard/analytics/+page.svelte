<script lang="ts">
  import { onMount } from 'svelte';
  import LineChart from '$lib/components/charts/LineChart.svelte';
  import BarChart from '$lib/components/charts/BarChart.svelte';
  import DoughnutChart from '$lib/components/charts/DoughnutChart.svelte';
  import { 
    generateComparisonData, 
    generateMonthlyData, 
    generateRevenueBreakdown,
    generateUserActivityData 
  } from '$lib/data/mockData';
  
  let comparisonData = $state(generateComparisonData());
  let monthlyData = $state(generateMonthlyData());
  let revenueBreakdown = $state(generateRevenueBreakdown());
  let userActivityData = $state(generateUserActivityData());
  
  let selectedPeriod = $state('week');
  let selectedMetric = $state('revenue');
  
  // Convert revenue breakdown to chart format - create plain objects
  let doughnutData = $derived({
    labels: revenueBreakdown.map(item => item.category),
    datasets: [{
      data: revenueBreakdown.map(item => item.amount),
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(251, 146, 60, 0.8)',
        'rgba(168, 85, 247, 0.8)',
      ],
      borderWidth: 0,
    }]
  });
  
  // Convert user activity to chart format - create plain objects
  let activityData = $derived({
    labels: userActivityData.slice(0, 12).map(item => item.hour),
    datasets: [
      {
        label: 'Active Users',
        data: userActivityData.slice(0, 12).map(item => item.active),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
      },
      {
        label: 'New Users',
        data: userActivityData.slice(0, 12).map(item => item.new),
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
      }
    ]
  });
  
  // Simulate real-time updates
  onMount(() => {
    const interval = setInterval(() => {
      comparisonData = generateComparisonData();
      monthlyData = generateMonthlyData();
      revenueBreakdown = generateRevenueBreakdown();
      userActivityData = generateUserActivityData();
    }, 15000); // Update every 15 seconds
    
    return () => clearInterval(interval);
  });
  
  function handlePeriodChange(period: string) {
    selectedPeriod = period;
    // Trigger data refresh
    comparisonData = generateComparisonData();
    monthlyData = generateMonthlyData();
  }
  
  // Create plain objects for Chart.js to avoid Svelte state issues
  let plainComparisonData = $derived(JSON.parse(JSON.stringify(comparisonData)));
  let plainMonthlyData = $derived(JSON.parse(JSON.stringify(monthlyData)));
</script>

<div class="p-6">
  <!-- Header -->
  <div class="mb-8">
    <h1 class="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
    <p class="mt-2 text-gray-600">Track your business performance with detailed insights and trends.</p>
  </div>
  
  <!-- Filters -->
  <div class="mb-6 flex flex-wrap gap-4">
    <div class="flex bg-white rounded-lg shadow-sm border border-gray-200">
      <button 
        onclick={() => handlePeriodChange('week')}
        class="px-4 py-2 text-sm font-medium rounded-l-lg transition-colors
               {selectedPeriod === 'week' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-50'}"
      >
        This Week
      </button>
      <button 
        onclick={() => handlePeriodChange('month')}
        class="px-4 py-2 text-sm font-medium transition-colors
               {selectedPeriod === 'month' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-50'}"
      >
        This Month
      </button>
      <button 
        onclick={() => handlePeriodChange('year')}
        class="px-4 py-2 text-sm font-medium rounded-r-lg transition-colors
               {selectedPeriod === 'year' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-50'}"
      >
        This Year
      </button>
    </div>
    
    <select 
      bind:value={selectedMetric}
      class="px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 text-sm font-medium text-gray-700"
    >
      <option value="revenue">Revenue</option>
      <option value="users">Users</option>
      <option value="conversions">Conversions</option>
    </select>
  </div>
  
  <!-- Charts Grid -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
    <!-- Traffic Comparison -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Traffic Comparison</h2>
      <LineChart data={plainComparisonData} height="300px" />
    </div>
    
    <!-- Revenue vs Expenses -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Revenue vs Expenses</h2>
      <BarChart data={plainMonthlyData} height="300px" />
    </div>
  </div>
  
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Revenue Breakdown -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Revenue Breakdown</h2>
      <DoughnutChart data={doughnutData} height="250px" />
    </div>
    
    <!-- User Activity -->
    <div class="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">User Activity (12 Hours)</h2>
      <BarChart data={activityData} height="250px" />
    </div>
  </div>
  
  <!-- Stats Cards -->
  <div class="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <p class="text-sm text-gray-600">Avg. Session Duration</p>
      <p class="text-2xl font-bold text-gray-900">4m 32s</p>
      <p class="text-xs text-green-600">+12% from last period</p>
    </div>
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <p class="text-sm text-gray-600">Bounce Rate</p>
      <p class="text-2xl font-bold text-gray-900">32.5%</p>
      <p class="text-xs text-green-600">-5% from last period</p>
    </div>
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <p class="text-sm text-gray-600">Pages / Session</p>
      <p class="text-2xl font-bold text-gray-900">4.8</p>
      <p class="text-xs text-green-600">+8% from last period</p>
    </div>
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <p class="text-sm text-gray-600">Goal Completions</p>
      <p class="text-2xl font-bold text-gray-900">248</p>
      <p class="text-xs text-green-600">+18% from last period</p>
    </div>
  </div>
</div>
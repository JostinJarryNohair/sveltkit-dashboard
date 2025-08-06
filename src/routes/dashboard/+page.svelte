<script lang="ts">
  import MetricCard from "$lib/components/dashboard/MetricCard.svelte";
  import { generateDashboardMetrics, generateTimeSeriesData } from "$lib/data/mockData";
  import { onMount } from 'svelte';
  
  let metrics = $state(generateDashboardMetrics());
  let chartData = $state(generateTimeSeriesData());
  
  // Simulate real-time updates
  onMount(() => {
    const interval = setInterval(() => {
      metrics = generateDashboardMetrics();
      chartData = generateTimeSeriesData();
    }, 10000); // Update every 10 seconds
    
    return () => clearInterval(interval);
  });
</script>

<div class="p-6">
  <div class="mb-8">
    <h1 class="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
    <p class="mt-2 text-gray-600">Welcome back! Here's what's happening with your business today.</p>
  </div>
  
  <!-- Metric Cards Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <MetricCard metric={metrics.revenue} />
    <MetricCard metric={metrics.users} />
    <MetricCard metric={metrics.pageViews} />
    <MetricCard metric={metrics.conversionRate} />
  </div>
  
  <!-- Chart Section (Placeholder for now) -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Weekly Performance</h2>
      <div class="h-64 flex items-center justify-center text-gray-400">
        <p>Chart coming soon...</p>
      </div>
    </div>
    
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">User Activity</h2>
      <div class="h-64 flex items-center justify-center text-gray-400">
        <p>Chart coming soon...</p>
      </div>
    </div>
  </div>
</div>
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type { Chart as ChartType } from 'chart.js';
  
  let Chart: typeof ChartType;
  
  interface Props {
    data: any;
    options?: any;
    height?: string;
  }
  
  let { data, options = {}, height = '300px' }: Props = $props();
  
  let canvas: HTMLCanvasElement;
  let chart: ChartType | null = null;
  
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += '$' + context.parsed.toLocaleString();
            }
            return label;
          }
        }
      }
    },
  };
  
  onMount(async () => {
    // Import Chart.js only on client side
    const chartModule = await import('chart.js');
    Chart = chartModule.Chart;
    chartModule.registerables.forEach(item => Chart.register(item));
    
    if (!canvas) {
      console.error('Canvas element not found');
      return;
    }
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      try {
        chart = new Chart(ctx, {
          type: 'doughnut',
          data: data,
          options: { ...defaultOptions, ...options },
        });
      } catch (error) {
        console.error('Error creating doughnut chart:', error);
      }
    }
  });
  
  onDestroy(() => {
    if (chart) {
      chart.destroy();
    }
  });
  
  $effect(() => {
    if (chart) {
      chart.data = data;
      chart.update();
    }
  });
</script>

<div style="height: {height}; position: relative;">
  <canvas bind:this={canvas}></canvas>
</div>
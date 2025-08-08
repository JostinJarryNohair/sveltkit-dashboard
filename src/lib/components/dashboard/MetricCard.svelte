<script lang="ts">
	import type { MetricData } from '$lib/data/mockData';

	interface Props {
		metric: MetricData;
	}

	let { metric }: Props = $props();
</script>

<div class="rounded-lg bg-white p-6 shadow-md transition-shadow duration-200 hover:shadow-lg">
	<div class="flex items-start justify-between">
		<div class="flex-1">
			<p class="text-sm font-medium text-gray-600">{metric.title}</p>
			<p class="mt-2 text-3xl font-bold text-gray-900">
				{metric.prefix || ''}{metric.value}{metric.suffix || ''}
			</p>
			<div class="mt-2 flex items-center">
				<span
					class={`inline-flex items-center text-sm font-medium
          ${metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}
				>
					{#if metric.changeType === 'increase'}
						<svg class="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
								clip-rule="evenodd"
							/>
						</svg>
					{:else}
						<svg class="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
								clip-rule="evenodd"
							/>
						</svg>
					{/if}
					{metric.change}%
				</span>
				<span class="ml-2 text-sm text-gray-500">vs last period</span>
			</div>
		</div>
		<div class="ml-4 flex-shrink-0">
			<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-2xl">
				{metric.icon}
			</div>
		</div>
	</div>
</div>

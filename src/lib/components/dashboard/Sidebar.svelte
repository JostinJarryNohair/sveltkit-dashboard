<script>
	import { page } from '$app/stores';
	import { HousePlus, ChartBar, DollarSign, Users } from 'lucide-svelte';

	$: currentPath = $page.url.pathname;

	const navItems = [
		{ href: '/dashboard', label: 'Overview', icon: HousePlus },
		{ href: '/dashboard/analytics', label: 'Analytics', icon: ChartBar },
		{ href: '/dashboard/revenue', label: 'Revenue', icon: DollarSign },
		{ href: '/dashboard/users', label: 'Users', icon: Users }
	];
</script>

<nav class="fixed left-0 top-0 z-30 flex h-screen w-64 flex-col bg-white shadow-lg">
	<div class="border-b p-6">
		<h1 class="text-xl font-bold text-gray-800">Dashboard</h1>
	</div>

	<div class="flex-1 p-4">
		<ul class="space-y-2">
			{#each navItems as item}
				<li>
					<a
						href={item.href}
						class="flex items-center rounded-lg px-4 py-3 transition-colors duration-200
                   {currentPath === item.href
							? 'bg-blue-100 font-medium text-blue-700'
							: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}"
					>
						<!-- svelte:component renders a component dynamically - the component to render is
   determined at runtime -->
						<svelte:component this={item.icon} size={20} class="mr-3" />
						{item.label}
					</a>
				</li>
			{/each}
		</ul>
	</div>

	<div class="border-t p-4">
		<div class="flex items-center text-sm text-gray-500">
			<span class="mr-3 h-8 w-8 rounded-full bg-gray-300"></span>
			<div>
				<p class="font-medium text-gray-900">Admin User</p>
				<p>admin@dashboard.com</p>
			</div>
		</div>
	</div>
</nav>

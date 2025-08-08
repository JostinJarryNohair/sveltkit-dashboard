<script>
	import Sidebar from '$lib/components/dashboard/Sidebar.svelte';
	import Topbar from '$lib/components/dashboard/Topbar.svelte';

	let sidebarOpen = $state(false);

	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}

	function closeSidebar() {
		sidebarOpen = false;
	}
</script>

<div class="h-screen bg-gray-50">
	<Topbar {toggleSidebar} />
	<Sidebar {sidebarOpen} {closeSidebar} />

	<!-- Mobile overlay -->
	{#if sidebarOpen}
		<div 
			class="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden" 
			onclick={closeSidebar}
			role="button"
			tabindex="0"
			onkeydown={(e) => e.key === 'Escape' && closeSidebar()}
		></div>
	{/if}

	<main class="ml-0 mt-16 overflow-auto lg:ml-64" style="height: calc(100vh - 4rem);">
		<slot />
	</main>
</div>

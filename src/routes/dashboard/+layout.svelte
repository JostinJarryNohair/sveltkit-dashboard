<script>
	import Sidebar from '$lib/components/dashboard/Sidebar.svelte';
	import Topbar from '$lib/components/dashboard/Topbar.svelte';
</script>

<div class="h-screen bg-gray-50">
	<Topbar />
	<Sidebar />

	<main class="ml-64 mt-16 overflow-auto" style="height: calc(100vh - 4rem);">
		<slot />
	</main>
</div>

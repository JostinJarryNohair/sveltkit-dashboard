<script>
  import Sidebar from '$lib/components/dashboard/Sidebar.svelte';
  import Topbar from '$lib/components/dashboard/Topbar.svelte';
</script>

<div class="flex flex-col h-screen bg-gray-50">
  <Topbar />
  
  <div class="flex flex-1">
    <Sidebar />
    <main class="flex-1 overflow-auto">
      <slot />
    </main>
  </div>
</div>
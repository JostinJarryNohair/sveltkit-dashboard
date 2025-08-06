<script>
  import { page } from '$app/stores';
  import { HousePlus , ChartBar, DollarSign, Users } from 'lucide-svelte';
  
  $: currentPath = $page.url.pathname;
  
  const navItems = [
    { href: '/dashboard', label: 'Overview', icon: HousePlus },
    { href: '/dashboard/analytics', label: 'Analytics', icon: ChartBar },
    { href: '/dashboard/revenue', label: 'Revenue', icon: DollarSign },
    { href: '/dashboard/users', label: 'Users', icon: Users }
  ];
</script>

<nav class="w-64 bg-white shadow-lg h-full flex flex-col">
  <div class="p-6 border-b">
    <h1 class="text-xl font-bold text-gray-800">Dashboard</h1>
  </div>
  
  <div class="flex-1 p-4">
    <ul class="space-y-2">
      {#each navItems as item}
        <li>
          <a 
            href={item.href}
            class="flex items-center px-4 py-3 rounded-lg transition-colors duration-200
                   {currentPath === item.href 
                     ? 'bg-blue-100 text-blue-700 font-medium' 
                     : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}"
          >
            <svelte:component this={item.icon} size={20} class="mr-3" />
            {item.label}
          </a>
        </li>
      {/each}
    </ul>
  </div>
  
  <div class="p-4 border-t">
    <div class="flex items-center text-sm text-gray-500">
      <span class="w-8 h-8 bg-gray-300 rounded-full mr-3"></span>
      <div>
        <p class="font-medium text-gray-900">Admin User</p>
        <p>admin@dashboard.com</p>
      </div>
    </div>
  </div>
</nav>
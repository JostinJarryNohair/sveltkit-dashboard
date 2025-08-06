<script lang="ts">
  import { onMount } from 'svelte';
  
  let currentTime = $state(new Date());
  let user = $state<any>(null);
  
  // Update time every minute
  onMount(() => {
    const interval = setInterval(() => {
      currentTime = new Date();
    }, 60000);
    
    // Load user from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      user = JSON.parse(savedUser);
    }
    
    return () => clearInterval(interval);
  });
  
  function handleLogout() {
    localStorage.removeItem('user');
    window.location.href = '/';
  }
  
  function formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  }
  
  function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  }
</script>

<div class="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
  <!-- Left side - Date/Time -->
  <div class="flex items-center space-x-4">
    <div class="hidden md:block">
      <p class="text-sm text-gray-500">{formatDate(currentTime)}</p>
      <p class="text-xs text-gray-400">{formatTime(currentTime)}</p>
    </div>
  </div>
  
  <!-- Center - Search bar -->
  <div class="flex-1 max-w-md mx-4">
    <div class="relative">
      <input 
        type="text" 
        placeholder="Search dashboard..." 
        class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  </div>
  
  <!-- Right side - User menu and notifications -->
  <div class="flex items-center space-x-4">
    <!-- Notifications -->
    <button class="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative">
      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-3-3v-6a5 5 0 10-10 0v6l-3 3h5a5 5 0 0010 0z" />
      </svg>
      <span class="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
    </button>
    
    <!-- Settings -->
    <button class="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </button>
    
    <!-- User Profile -->
    <div class="flex items-center space-x-3">
      <div class="hidden sm:block text-right">
        <p class="text-sm font-medium text-gray-900">{user?.email || 'User'}</p>
        <p class="text-xs text-gray-500">{user?.role || 'Member'}</p>
      </div>
      <div class="relative group">
        <button class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium hover:bg-blue-600 transition-colors">
          {user?.email?.[0]?.toUpperCase() || 'U'}
        </button>
        
        <!-- Dropdown Menu -->
        <div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profile Settings</a>
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Account</a>
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Preferences</a>
          <hr class="my-2 border-gray-200" />
          <button 
            onclick={handleLogout}
            class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
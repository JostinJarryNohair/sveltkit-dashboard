<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  
  // Form state
  let email = $state('');
  let password = $state('');
  let rememberMe = $state(false);
  let isLoading = $state(false);
  let errors = $state<Record<string, string>>({});
  let loginAttempts = $state(0);
  
  // Demo credentials
  const demoCredentials = [
    { email: 'admin@dashboard.com', password: 'admin123', role: 'Admin' },
    { email: 'user@dashboard.com', password: 'user123', role: 'User' },
    { email: 'demo@dashboard.com', password: 'demo123', role: 'Demo' }
  ];
  
  // Validation
  function validateForm(): boolean {
    errors = {};
    
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    return Object.keys(errors).length === 0;
  }
  
  // Mock authentication
  async function handleLogin(event: Event) {
    event.preventDefault();
    
    if (!validateForm()) return;
    
    isLoading = true;
    loginAttempts++;
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check credentials
    const user = demoCredentials.find(
      u => u.email === email && u.password === password
    );
    
    if (user) {
      // Store user in localStorage (in real app, use proper session management)
      localStorage.setItem('user', JSON.stringify(user));
      
      // Redirect to dashboard
      goto('/dashboard');
    } else {
      errors.general = 'Invalid email or password. Try the demo credentials below.';
    }
    
    isLoading = false;
  }
  
  // Auto-fill demo credentials
  function fillDemoCredentials(index: number) {
    const cred = demoCredentials[index];
    email = cred.email;
    password = cred.password;
  }
  
  // Check if already logged in
  onMount(() => {
    const user = localStorage.getItem('user');
    if (user) {
      goto('/dashboard');
    }
  });
</script>

<svelte:head>
  <title>Login - Dashboard</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center p-6">
  <div class="w-full max-w-md">
    <!-- Logo/Header -->
    <div class="text-center mb-8">
      <div class="mx-auto w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
        <span class="text-2xl text-white font-bold">D</span>
      </div>
      <h1 class="text-3xl font-bold text-gray-900">Welcome Back</h1>
      <p class="text-gray-600 mt-2">Sign in to access your dashboard</p>
    </div>
    
    <!-- Login Form -->
    <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <form onsubmit={handleLogin} class="space-y-6">
        <!-- Email Field -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            bind:value={email}
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors
                   {errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}"
            placeholder="Enter your email"
            disabled={isLoading}
          />
          {#if errors.email}
            <p class="mt-1 text-sm text-red-600">{errors.email}</p>
          {/if}
        </div>
        
        <!-- Password Field -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            bind:value={password}
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors
                   {errors.password ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}"
            placeholder="Enter your password"
            disabled={isLoading}
          />
          {#if errors.password}
            <p class="mt-1 text-sm text-red-600">{errors.password}</p>
          {/if}
        </div>
        
        <!-- Remember Me & Forgot Password -->
        <div class="flex items-center justify-between">
          <label class="flex items-center">
            <input
              type="checkbox"
              bind:checked={rememberMe}
              class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              disabled={isLoading}
            />
            <span class="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <button
            type="button"
            class="text-sm text-blue-600 hover:text-blue-700 transition-colors"
            disabled={isLoading}
          >
            Forgot password?
          </button>
        </div>
        
        <!-- General Error -->
        {#if errors.general}
          <div class="bg-red-50 border border-red-200 rounded-lg p-4">
            <p class="text-sm text-red-600">{errors.general}</p>
          </div>
        {/if}
        
        <!-- Submit Button -->
        <button
          type="submit"
          disabled={isLoading}
          class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {#if isLoading}
            <div class="flex items-center justify-center">
              <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Signing in...
            </div>
          {:else}
            Sign In
          {/if}
        </button>
        
        <!-- Login Stats -->
        {#if loginAttempts > 0}
          <div class="text-center text-sm text-gray-500">
            Attempt {loginAttempts} {loginAttempts > 1 ? '| Try demo credentials below' : ''}
          </div>
        {/if}
      </form>
    </div>
    
    <!-- Demo Credentials -->
    <div class="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Demo Credentials</h3>
      <div class="space-y-3">
        {#each demoCredentials as cred, index}
          <button
            onclick={() => fillDemoCredentials(index)}
            class="w-full text-left p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
            disabled={isLoading}
          >
            <div class="flex justify-between items-center">
              <div>
                <p class="font-medium text-gray-900 group-hover:text-blue-700">{cred.email}</p>
                <p class="text-sm text-gray-500">{cred.role} Account</p>
              </div>
              <div class="text-xs text-gray-400 font-mono bg-gray-100 px-2 py-1 rounded">
                {cred.password}
              </div>
            </div>
          </button>
        {/each}
      </div>
      <p class="mt-4 text-xs text-gray-500 text-center">
        Click any credential above to auto-fill the login form
      </p>
    </div>
    
    <!-- Features Preview -->
    <div class="mt-8 text-center">
      <h4 class="text-sm font-medium text-gray-700 mb-3">Dashboard Features</h4>
      <div class="flex flex-wrap justify-center gap-2">
        <span class="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">📊 Analytics</span>
        <span class="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">💰 Revenue</span>
        <span class="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">👥 Users</span>
        <span class="px-3 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">📈 Charts</span>
        <span class="px-3 py-1 bg-pink-100 text-pink-800 text-xs rounded-full">⚡ Real-time</span>
      </div>
    </div>
    
    <!-- Footer -->
    <div class="mt-8 text-center text-sm text-gray-500">
      <p>© 2024 Dashboard Demo. Built with SvelteKit & TypeScript</p>
    </div>
  </div>
</div>
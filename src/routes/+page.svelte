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
		await new Promise((resolve) => setTimeout(resolve, 1500));

		// Check credentials
		const user = demoCredentials.find((u) => u.email === email && u.password === password);

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

	// onMount runs after component renders to DOM - perfect for browser-only code like localStorage
	onMount(() => {
		const user = localStorage.getItem('user');
		if (user) {
			goto('/dashboard');
		}
	});
</script>

<!-- svelte:head is used to set the title of the page ets you inject content into the head of the page -->
<svelte:head>
	<title>Login - Dashboard</title>
</svelte:head>

<div
	class="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-gray-50 p-6"
>
	<div class="w-full max-w-md">
		<!-- Logo/Header -->
		<div class="mb-8 text-center">
			<div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500">
				<span class="text-2xl font-bold text-white">D</span>
			</div>
			<h1 class="text-3xl font-bold text-gray-900">Welcome Back</h1>
			<p class="mt-2 text-gray-600">Sign in to access your dashboard</p>
		</div>

		<!-- Login Form -->
		<div class="rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
			<form onsubmit={handleLogin} class="space-y-6">
				<!-- Email Field -->
				<div>
					<label for="email" class="mb-2 block text-sm font-medium text-gray-700">
						Email Address
					</label>
					<input
						id="email"
						type="email"
						bind:value={email}
						class="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500
                   {errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}"
						placeholder="Enter your email"
						disabled={isLoading}
					/>
					{#if errors.email}
						<p class="mt-1 text-sm text-red-600">{errors.email}</p>
					{/if}
				</div>

				<!-- Password Field -->
				<div>
					<label for="password" class="mb-2 block text-sm font-medium text-gray-700">
						Password
					</label>
					<input
						id="password"
						type="password"
						bind:value={password}
						class="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500
                   {errors.password
							? 'border-red-500 focus:border-red-500 focus:ring-red-500'
							: ''}"
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
						class="text-sm text-blue-600 transition-colors hover:text-blue-700"
						disabled={isLoading}
					>
						Forgot password?
					</button>
				</div>

				<!-- General Error -->
				{#if errors.general}
					<div class="rounded-lg border border-red-200 bg-red-50 p-4">
						<p class="text-sm text-red-600">{errors.general}</p>
					</div>
				{/if}

				<!-- Submit Button -->
				<button
					type="submit"
					disabled={isLoading}
					class="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{#if isLoading}
						<div class="flex items-center justify-center">
							<div class="mr-2 h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
							Signing in...
						</div>
					{:else}
						Sign In
					{/if}
				</button>

				<!-- Login Stats -->
				{#if loginAttempts > 0}
					<div class="text-center text-sm text-gray-500">
						Attempt {loginAttempts}
						{loginAttempts > 1 ? '| Try demo credentials below' : ''}
					</div>
				{/if}
			</form>
		</div>

		<!-- Demo Credentials -->
		<div class="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-6">
			<h3 class="mb-4 text-lg font-semibold text-gray-900">Demo Credentials</h3>
			<div class="space-y-3">
				{#each demoCredentials as cred, index}
					<button
						onclick={() => fillDemoCredentials(index)}
						class="group w-full rounded-lg border border-gray-200 bg-white p-3 text-left transition-colors hover:border-blue-300 hover:bg-blue-50"
						disabled={isLoading}
					>
						<div class="flex items-center justify-between">
							<div>
								<p class="font-medium text-gray-900 group-hover:text-blue-700">{cred.email}</p>
								<p class="text-sm text-gray-500">{cred.role} Account</p>
							</div>
							<div class="rounded bg-gray-100 px-2 py-1 font-mono text-xs text-gray-400">
								{cred.password}
							</div>
						</div>
					</button>
				{/each}
			</div>
			<p class="mt-4 text-center text-xs text-gray-500">
				Click any credential above to auto-fill the login form
			</p>
		</div>

		<!-- Features Preview -->
		<div class="mt-8 text-center">
			<h4 class="mb-3 text-sm font-medium text-gray-700">Dashboard Features</h4>
			<div class="flex flex-wrap justify-center gap-2">
				<span class="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800">📊 Analytics</span>
				<span class="rounded-full bg-green-100 px-3 py-1 text-xs text-green-800">💰 Revenue</span>
				<span class="rounded-full bg-purple-100 px-3 py-1 text-xs text-purple-800">👥 Users</span>
				<span class="rounded-full bg-orange-100 px-3 py-1 text-xs text-orange-800">📈 Charts</span>
				<span class="rounded-full bg-pink-100 px-3 py-1 text-xs text-pink-800">⚡ Real-time</span>
			</div>
		</div>

		<!-- Footer -->
		<div class="mt-8 text-center text-sm text-gray-500">
			<p>© 2024 Dashboard Demo. Built with SvelteKit & TypeScript</p>
		</div>
	</div>
</div>

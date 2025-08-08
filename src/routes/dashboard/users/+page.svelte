<script lang="ts">
	import MetricCard from '$lib/components/dashboard/MetricCard.svelte';
	import AddUserModal from '$lib/components/user/AddUserModal.svelte';
	import { generateUserMetrics, generateUsers, type User } from '$lib/data/mockData';
	import { Search, UserPlus, MoreHorizontal } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let metrics = $state(generateUserMetrics());
	let allUsers = $state(generateUsers(50));
	let filteredUsers = $state<User[]>([]);
	let searchTerm = $state('');
	let statusFilter = $state('All');
	let roleFilter = $state('All');
	let currentPage = $state(1);
	let usersPerPage = 10;
	let isAddUserModalOpen = $state(false);

	// Computed values using $derived
	let totalPages = $derived(Math.ceil(filteredUsers.length / usersPerPage));
	let startIndex = $derived((currentPage - 1) * usersPerPage);
	let endIndex = $derived(startIndex + usersPerPage);
	let paginatedUsers = $derived(filteredUsers.slice(startIndex, endIndex));

	// Filter users based on search and filters
	$effect(() => {
		filteredUsers = allUsers.filter((user) => {
			const matchesSearch =
				user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				user.email.toLowerCase().includes(searchTerm.toLowerCase());
			const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
			const matchesRole = roleFilter === 'All' || user.role === roleFilter;

			return matchesSearch && matchesStatus && matchesRole;
		});

		// Reset to first page when filters change
		currentPage = 1;
	});

	// Real-time metric updates
	onMount(() => {
		const interval = setInterval(() => {
			metrics = generateUserMetrics();
		}, 15000); // Update every 15 seconds

		return () => clearInterval(interval);
	});

	function getStatusColor(status: string): string {
		switch (status) {
			case 'Active':
				return 'bg-green-100 text-green-800';
			case 'Inactive':
				return 'bg-gray-100 text-gray-800';
			case 'Pending':
				return 'bg-yellow-100 text-yellow-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	}

	function getRoleColor(role: string): string {
		switch (role) {
			case 'Admin':
				return 'bg-purple-100 text-purple-800';
			case 'Editor':
				return 'bg-blue-100 text-blue-800';
			case 'User':
				return 'bg-green-100 text-green-800';
			case 'Viewer':
				return 'bg-gray-100 text-gray-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	}

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}

	function handleAddUser(newUserData: Omit<User, 'id' | 'lastActive' | 'joinDate'>) {
		const newUser: User = {
			id: `user-${Date.now()}`,
			...newUserData,
			lastActive: new Date().toISOString(),
			joinDate: new Date().toISOString()
		};

		allUsers = [newUser, ...allUsers];
		metrics = generateUserMetrics();
	}
</script>

<div class="p-6">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="text-3xl font-bold text-gray-900">User Management</h1>
		<p class="mt-2 text-gray-600">Manage and monitor your user base</p>
	</div>

	<!-- Metrics Grid -->
	<div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
		<MetricCard metric={metrics.totalUsers} />
		<MetricCard metric={metrics.activeUsers} />
		<MetricCard metric={metrics.newUsers} />
		<MetricCard metric={metrics.userGrowth} />
	</div>

	<!-- User Management Panel -->
	<div class="rounded-lg bg-white shadow-md">
		<!-- Controls Header -->
		<div class="border-b border-gray-200 p-6">
			<div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
				<div class="flex flex-1 flex-col gap-4 sm:flex-row">
					<!-- Search -->
					<div class="relative max-w-md flex-1">
						<Search
							class="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400"
							size={20}
						/>
						<input
							type="text"
							placeholder="Search users..."
							class="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
							bind:value={searchTerm}
						/>
					</div>

					<!-- Filters -->
					<div class="flex gap-2">
						<select
							class="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
							bind:value={statusFilter}
						>
							<option value="All">All Status</option>
							<option value="Active">Active</option>
							<option value="Inactive">Inactive</option>
							<option value="Pending">Pending</option>
						</select>

						<select
							class="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
							bind:value={roleFilter}
						>
							<option value="All">All Roles</option>
							<option value="Admin">Admin</option>
							<option value="Editor">Editor</option>
							<option value="User">User</option>
							<option value="Viewer">Viewer</option>
						</select>
					</div>
				</div>

				<!-- Add User Button -->
				<button
					onclick={() => (isAddUserModalOpen = true)}
					class="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
				>
					<UserPlus size={20} class="mr-2" />
					Add User
				</button>
			</div>
		</div>

		<!-- Users Table -->
		<div class="overflow-x-auto">
			<table class="w-full">
				<thead class="bg-gray-50">
					<tr>
						<th
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>User</th
						>
						<th
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>Role</th
						>
						<th
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>Status</th
						>
						<th
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>Last Active</th
						>
						<th
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>Join Date</th
						>
						<th
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>Actions</th
						>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200 bg-white">
					{#each paginatedUsers as user (user.id)}
						<tr class="hover:bg-gray-50">
							<td class="px-6 py-4 whitespace-nowrap">
								<div class="flex items-center">
									<div class="h-10 w-10 flex-shrink-0">
										<div
											class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 text-sm font-medium text-gray-700"
										>
											{user.name
												.split(' ')
												.map((n) => n[0])
												.join('')}
										</div>
									</div>
									<div class="ml-4">
										<div class="text-sm font-medium text-gray-900">{user.name}</div>
										<div class="text-sm text-gray-500">{user.email}</div>
									</div>
								</div>
							</td>
							<td class="px-6 py-4 whitespace-nowrap">
								<span
									class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium {getRoleColor(
										user.role
									)}"
								>
									{user.role}
								</span>
							</td>
							<td class="px-6 py-4 whitespace-nowrap">
								<span
									class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium {getStatusColor(
										user.status
									)}"
								>
									{user.status}
								</span>
							</td>
							<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
								{formatDate(user.lastActive)}
							</td>
							<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
								{formatDate(user.joinDate)}
							</td>
							<td class="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
								<button class="text-gray-400 hover:text-gray-600">
									<MoreHorizontal size={20} />
								</button>
							</td>
						</tr>
					{:else}
						<tr>
							<td colspan="6" class="px-6 py-4 text-center text-gray-500">
								No users found matching your criteria.
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<!-- Pagination -->
		{#if totalPages > 1}
			<div class="flex items-center justify-between border-t border-gray-200 px-6 py-3">
				<div class="text-sm text-gray-700">
					Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length}
					results
				</div>
				<div class="flex items-center space-x-2">
					<button
						class="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
						disabled={currentPage === 1}
						onclick={() => (currentPage = Math.max(1, currentPage - 1))}
					>
						Previous
					</button>

					{#each Array.from({ length: totalPages }, (_, i) => i + 1) as page (page)}
						{#if page === currentPage || page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)}
							<button
								class="rounded px-3 py-1 text-sm {page === currentPage
									? 'bg-blue-600 text-white'
									: 'border border-gray-300 hover:bg-gray-50'}"
								onclick={() => (currentPage = page)}
							>
								{page}
							</button>
						{:else if page === currentPage - 2 || page === currentPage + 2}
							<span class="px-2 text-gray-500">...</span>
						{/if}
					{/each}

					<button
						class="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
						disabled={currentPage === totalPages}
						onclick={() => (currentPage = Math.min(totalPages, currentPage + 1))}
					>
						Next
					</button>
				</div>
			</div>
		{/if}
	</div>
</div>

<!-- Add User Modal -->
<AddUserModal
	isOpen={isAddUserModalOpen}
	onClose={() => (isAddUserModalOpen = false)}
	onSubmit={handleAddUser}
/>

<script lang="ts">
	import { X, User, Mail, Shield, UserCheck } from 'lucide-svelte';
	import type { User as UserType } from '$lib/data/mockData';

	interface Props {
		isOpen: boolean;
		onClose: () => void;
		onSubmit: (user: Omit<UserType, 'id' | 'lastActive' | 'joinDate'>) => void;
	}

	let { isOpen, onClose, onSubmit }: Props = $props();

	// Form state
	let formData = $state({
		name: '',
		email: '',
		role: 'User' as UserType['role'],
		status: 'Active' as UserType['status']
	});

	let errors = $state<Record<string, string>>({});
	let isSubmitting = $state(false);

	// Validation
	function validateForm(): boolean {
		errors = {};

		if (!formData.name.trim()) {
			errors.name = 'Name is required';
		} else if (formData.name.trim().length < 2) {
			errors.name = 'Name must be at least 2 characters';
		}

		if (!formData.email.trim()) {
			errors.email = 'Email is required';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			errors.email = 'Please enter a valid email address';
		}

		return Object.keys(errors).length === 0;
	}

	// Handle form submission
	async function handleSubmit(event: Event) {
		event.preventDefault();

		if (!validateForm()) return;

		isSubmitting = true;

		// Simulate API call delay
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Submit the form
		onSubmit({
			name: formData.name.trim(),
			email: formData.email.trim(),
			role: formData.role,
			status: formData.status
		});

		// Reset form
		formData = {
			name: '',
			email: '',
			role: 'User',
			status: 'Active'
		};

		errors = {};
		isSubmitting = false;
		onClose();
	}

	// Handle modal close
	function handleClose() {
		if (isSubmitting) return; // Prevent closing during submission

		// Reset form
		formData = {
			name: '',
			email: '',
			role: 'User',
			status: 'Active'
		};
		errors = {};
		onClose();
	}

	// Handle backdrop click
	function handleBackdropClick(event: Event) {
		if (event.target === event.currentTarget) {
			handleClose();
		}
	}

	// Handle escape key
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && isOpen) {
			handleClose();
		}
	}

	// Role options with icons
	const roleOptions = [
		{ value: 'Admin', label: 'Admin', icon: Shield, description: 'Full system access' },
		{ value: 'Editor', label: 'Editor', icon: UserCheck, description: 'Can edit content' },
		{ value: 'User', label: 'User', icon: User, description: 'Standard user access' },
		{ value: 'Viewer', label: 'Viewer', icon: User, description: 'Read-only access' }
	];

	// Status options
	const statusOptions = [
		{ value: 'Active', label: 'Active', color: 'text-green-600' },
		{ value: 'Inactive', label: 'Inactive', color: 'text-gray-600' },
		{ value: 'Pending', label: 'Pending', color: 'text-yellow-600' }
	];
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
	<!-- Modal Backdrop -->
	<div
		class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4 transition-opacity"
		onclick={handleBackdropClick}
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-title"
	>
		<!-- Modal Content -->
		<div
			class="w-full max-w-md transform rounded-lg bg-white shadow-xl transition-transform"
			onclick={(e) => e.stopPropagation()}
		>
			<!-- Modal Header -->
			<div class="flex items-center justify-between border-b border-gray-200 px-6 py-4">
				<div class="flex items-center">
					<div class="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
						<User class="h-5 w-5 text-blue-600" />
					</div>
					<div>
						<h3 id="modal-title" class="text-lg font-semibold text-gray-900">Add New User</h3>
						<p class="text-sm text-gray-500">Create a new user account</p>
					</div>
				</div>
				<button
					onclick={handleClose}
					disabled={isSubmitting}
					class="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 disabled:cursor-not-allowed"
					aria-label="Close modal"
				>
					<X class="h-5 w-5" />
				</button>
			</div>

			<!-- Modal Body -->
			<form onsubmit={handleSubmit} class="p-6">
				<div class="space-y-4">
					<!-- Name Field -->
					<div>
						<label for="name" class="mb-2 block text-sm font-medium text-gray-700">
							Full Name
						</label>
						<div class="relative">
							<input
								id="name"
								type="text"
								bind:value={formData.name}
								disabled={isSubmitting}
								class="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 text-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500
                       {errors.name
									? 'border-red-500 focus:border-red-500 focus:ring-red-500'
									: ''}"
								placeholder="Enter full name"
							/>
							<User class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
						</div>
						{#if errors.name}
							<p class="mt-1 text-sm text-red-600">{errors.name}</p>
						{/if}
					</div>

					<!-- Email Field -->
					<div>
						<label for="email" class="mb-2 block text-sm font-medium text-gray-700">
							Email Address
						</label>
						<div class="relative">
							<input
								id="email"
								type="email"
								bind:value={formData.email}
								disabled={isSubmitting}
								class="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 text-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500
                       {errors.email
									? 'border-red-500 focus:border-red-500 focus:ring-red-500'
									: ''}"
								placeholder="Enter email address"
							/>
							<Mail class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
						</div>
						{#if errors.email}
							<p class="mt-1 text-sm text-red-600">{errors.email}</p>
						{/if}
					</div>

					<!-- Role Field -->
					<div>
						<label for="role" class="mb-2 block text-sm font-medium text-gray-700"> Role </label>
						<select
							id="role"
							bind:value={formData.role}
							disabled={isSubmitting}
							class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
						>
							{#each roleOptions as option}
								<option value={option.value}>{option.label} - {option.description}</option>
							{/each}
						</select>
					</div>

					<!-- Status Field -->
					<div>
						<label for="status" class="mb-2 block text-sm font-medium text-gray-700">
							Status
						</label>
						<select
							id="status"
							bind:value={formData.status}
							disabled={isSubmitting}
							class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
						>
							{#each statusOptions as option}
								<option value={option.value}>{option.label}</option>
							{/each}
						</select>
					</div>

					<!-- Form Preview -->
					<div class="rounded-lg bg-gray-50 p-4">
						<h4 class="mb-2 text-sm font-medium text-gray-700">Preview</h4>
						<div class="space-y-1 text-sm">
							<p><span class="text-gray-500">Name:</span> {formData.name || 'Not set'}</p>
							<p><span class="text-gray-500">Email:</span> {formData.email || 'Not set'}</p>
							<p><span class="text-gray-500">Role:</span> {formData.role}</p>
							<p><span class="text-gray-500">Status:</span> {formData.status}</p>
						</div>
					</div>
				</div>

				<!-- Modal Footer -->
				<div class="mt-6 flex space-x-3">
					<button
						type="button"
						onclick={handleClose}
						disabled={isSubmitting}
						class="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
					>
						Cancel
					</button>
					<button
						type="submit"
						disabled={isSubmitting}
						class="flex flex-1 items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
					>
						{#if isSubmitting}
							<div
								class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
							></div>
							Creating...
						{:else}
							<User class="mr-2 h-4 w-4" />
							Create User
						{/if}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

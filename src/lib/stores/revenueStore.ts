import { writable, derived } from 'svelte/store';
import type { Transaction } from '$lib/data/revenueData';

// Create a writable store for transactions
export const transactions = writable<Transaction[]>([]);

// Create a writable store for filters
export const filters = writable({
	dateRange: 'month',
	category: 'all',
	status: 'all',
	paymentMethod: 'all',
	searchTerm: ''
});

// Derived store for filtered transactions
export const filteredTransactions = derived(
	[transactions, filters],
	([$transactions, $filters]) => {
		let filtered = [...$transactions];

		// Filter by status
		if ($filters.status !== 'all') {
			filtered = filtered.filter((t) => t.status === $filters.status);
		}

		// Filter by category
		if ($filters.category !== 'all') {
			filtered = filtered.filter((t) => t.category === $filters.category);
		}

		// Filter by payment method
		if ($filters.paymentMethod !== 'all') {
			filtered = filtered.filter((t) => t.paymentMethod === $filters.paymentMethod);
		}

		// Filter by search term
		if ($filters.searchTerm) {
			const term = $filters.searchTerm.toLowerCase();
			filtered = filtered.filter(
				(t) =>
					t.customer.toLowerCase().includes(term) ||
					t.product.toLowerCase().includes(term) ||
					t.id.toLowerCase().includes(term)
			);
		}

		// Filter by date range
		const now = new Date();
		const startDate = new Date();

		switch ($filters.dateRange) {
			case 'today':
				startDate.setHours(0, 0, 0, 0);
				break;
			case 'week':
				startDate.setDate(now.getDate() - 7);
				break;
			case 'month':
				startDate.setMonth(now.getMonth() - 1);
				break;
			case 'quarter':
				startDate.setMonth(now.getMonth() - 3);
				break;
			case 'year':
				startDate.setFullYear(now.getFullYear() - 1);
				break;
		}

		if ($filters.dateRange !== 'all') {
			filtered = filtered.filter((t) => t.date >= startDate);
		}

		return filtered;
	}
);

export interface MetricData {
	title: string;
	value: string | number;
	change: number;
	changeType: 'increase' | 'decrease';
	icon: string;
	prefix?: string;
	suffix?: string;
}

export interface DashboardMetrics {
	revenue: MetricData;
	users: MetricData;
	pageViews: MetricData;
	conversionRate: MetricData;
}

function getRandomChange(min: number = -20, max: number = 50): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomValue(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateDashboardMetrics(): DashboardMetrics {
	const revenueValue = getRandomValue(45000, 125000);
	const revenueChange = getRandomChange(-10, 30);

	const usersValue = getRandomValue(1200, 3500);
	const usersChange = getRandomChange(-5, 25);

	const pageViewsValue = getRandomValue(8000, 25000);
	const pageViewsChange = getRandomChange(-15, 40);

	const conversionValue = parseFloat((Math.random() * 5 + 2).toFixed(2));
	const conversionChange = getRandomChange(-20, 20);

	return {
		revenue: {
			title: 'Total Revenue',
			value: revenueValue.toLocaleString(),
			change: Math.abs(revenueChange),
			changeType: revenueChange >= 0 ? 'increase' : 'decrease',
			icon: '💰',
			prefix: '$'
		},
		users: {
			title: 'Active Users',
			value: usersValue.toLocaleString(),
			change: Math.abs(usersChange),
			changeType: usersChange >= 0 ? 'increase' : 'decrease',
			icon: '👥'
		},
		pageViews: {
			title: 'Page Views',
			value: pageViewsValue.toLocaleString(),
			change: Math.abs(pageViewsChange),
			changeType: pageViewsChange >= 0 ? 'increase' : 'decrease',
			icon: '📊'
		},
		conversionRate: {
			title: 'Conversion Rate',
			value: conversionValue,
			change: Math.abs(conversionChange),
			changeType: conversionChange >= 0 ? 'increase' : 'decrease',
			icon: '📈',
			suffix: '%'
		}
	};
}

// Generate time series data for charts
export interface TimeSeriesData {
	label: string;
	value: number;
}

export function generateTimeSeriesData(points: number = 7): TimeSeriesData[] {
	const data: TimeSeriesData[] = [];
	const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

	for (let i = 0; i < points; i++) {
		data.push({
			label: days[i] || `Day ${i + 1}`,
			value: getRandomValue(1000, 5000)
		});
	}

	return data;
}

// Generate multi-dataset time series for comparison
export function generateComparisonData() {
	const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

	return {
		labels,
		datasets: [
			{
				label: 'This Week',
				data: labels.map(() => getRandomValue(2000, 5000)),
				borderColor: 'rgb(59, 130, 246)',
				backgroundColor: 'rgba(59, 130, 246, 0.1)',
				tension: 0.3
			},
			{
				label: 'Last Week',
				data: labels.map(() => getRandomValue(1500, 4500)),
				borderColor: 'rgb(156, 163, 175)',
				backgroundColor: 'rgba(156, 163, 175, 0.1)',
				tension: 0.3
			}
		]
	};
}

// Generate monthly data
export function generateMonthlyData() {
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

	return {
		labels: months,
		datasets: [
			{
				label: 'Revenue',
				data: months.map(() => getRandomValue(40000, 80000)),
				backgroundColor: 'rgba(59, 130, 246, 0.8)'
			},
			{
				label: 'Expenses',
				data: months.map(() => getRandomValue(30000, 60000)),
				backgroundColor: 'rgba(239, 68, 68, 0.8)'
			}
		]
	};
}

// Generate user activity data
export interface UserActivity {
	hour: string;
	active: number;
	new: number;
}

export function generateUserActivityData(): UserActivity[] {
	const data: UserActivity[] = [];

	for (let i = 0; i < 24; i++) {
		data.push({
			hour: `${i}:00`,
			active: getRandomValue(50, 300),
			new: getRandomValue(5, 50)
		});
	}

	return data;
}

// Generate revenue breakdown
export interface RevenueBreakdown {
	category: string;
	amount: number;
	percentage: number;
}

export function generateRevenueBreakdown(): RevenueBreakdown[] {
	const categories = [
		{ name: 'Product Sales', weight: 0.4 },
		{ name: 'Subscriptions', weight: 0.25 },
		{ name: 'Services', weight: 0.2 },
		{ name: 'Licensing', weight: 0.15 }
	];

	const total = getRandomValue(80000, 150000);

	return categories.map((cat) => ({
		category: cat.name,
		amount: Math.floor(total * cat.weight),
		percentage: Math.floor(cat.weight * 100)
	}));
}

// User management types and data
export interface User {
	id: string;
	name: string;
	email: string;
	role: 'Admin' | 'User' | 'Editor' | 'Viewer';
	status: 'Active' | 'Inactive' | 'Pending';
	lastActive: string;
	joinDate: string;
	avatar?: string;
}

export interface UserMetrics {
	totalUsers: MetricData;
	activeUsers: MetricData;
	newUsers: MetricData;
	userGrowth: MetricData;
}

const userRoles = ['Admin', 'User', 'Editor', 'Viewer'] as const;
const userStatuses = ['Active', 'Inactive', 'Pending'] as const;
const firstNames = [
	'John',
	'Jane',
	'Michael',
	'Sarah',
	'David',
	'Emma',
	'James',
	'Lisa',
	'Robert',
	'Mary'
];
const lastNames = [
	'Smith',
	'Johnson',
	'Williams',
	'Brown',
	'Jones',
	'Garcia',
	'Miller',
	'Davis',
	'Rodriguez',
	'Martinez'
];

function getRandomDate(daysAgo: number): string {
	const date = new Date();
	date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
	return date.toISOString().split('T')[0];
}

function generateRandomUser(id: string): User {
	const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
	const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
	const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`;

	return {
		id,
		name: `${firstName} ${lastName}`,
		email,
		role: userRoles[Math.floor(Math.random() * userRoles.length)],
		status: userStatuses[Math.floor(Math.random() * userStatuses.length)],
		lastActive: getRandomDate(30),
		joinDate: getRandomDate(365)
	};
}

export function generateUsers(count: number = 50): User[] {
	return Array.from({ length: count }, (_, i) => generateRandomUser(`user-${i + 1}`));
}

export function generateUserMetrics(): UserMetrics {
	const totalUsersValue = getRandomValue(1200, 2500);
	const totalUsersChange = getRandomChange(-5, 15);

	const activeUsersValue = Math.floor(totalUsersValue * 0.7); // 70% active
	const activeUsersChange = getRandomChange(-10, 20);

	const newUsersValue = getRandomValue(25, 80);
	const newUsersChange = getRandomChange(-20, 40);

	const growthValue = parseFloat((Math.random() * 10 + 2).toFixed(1));
	const growthChange = getRandomChange(-15, 25);

	return {
		totalUsers: {
			title: 'Total Users',
			value: totalUsersValue.toLocaleString(),
			change: Math.abs(totalUsersChange),
			changeType: totalUsersChange >= 0 ? 'increase' : 'decrease',
			icon: '👥'
		},
		activeUsers: {
			title: 'Active Users',
			value: activeUsersValue.toLocaleString(),
			change: Math.abs(activeUsersChange),
			changeType: activeUsersChange >= 0 ? 'increase' : 'decrease',
			icon: '🟢'
		},
		newUsers: {
			title: 'New Users (30 days)',
			value: newUsersValue,
			change: Math.abs(newUsersChange),
			changeType: newUsersChange >= 0 ? 'increase' : 'decrease',
			icon: '✨'
		},
		userGrowth: {
			title: 'Growth Rate',
			value: growthValue,
			change: Math.abs(growthChange),
			changeType: growthChange >= 0 ? 'increase' : 'decrease',
			icon: '📈',
			suffix: '%'
		}
	};
}

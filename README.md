# SvelteKit Analytics Dashboard 📊

A modern, responsive analytics dashboard built with SvelteKit, TypeScript, and Tailwind CSS. This project demonstrates  SvelteKit patterns, real-time data visualization, and  UI/UX design.

![SvelteKit](https://img.shields.io/badge/SvelteKit-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)

## 🚀 Live Demo

[View Live Demo](https://sveltkit-dashboard.vercel.app/dashboard) <!-- Update with your actual URL -->

## ✨ Features

### 🔐 Authentication System
- Mock login with multiple user roles (Admin, User, Demo)
- Session management with localStorage
- Protected routes with auto-redirect
- Professional login UI with validation

### 📈 Dashboard Overview
- Real-time metric cards with auto-refresh
- Key performance indicators (KPIs)
- Growth percentages and trend indicators
- Responsive grid layout

### 📊 Advanced Analytics
- **Interactive Charts**: Line, Bar, and Doughnut charts using Chart.js
- **Real-time Updates**: Data refreshes every 15 seconds
- **Period Filters**: Week, Month, Year views
- **Comparison Views**: This week vs Last week performance

### 💰 Revenue Management
- **Revenue Goal Tracking**: Visual progress bars with status indicators
- **7-Day Forecasting**: Toggle-able revenue predictions with dashed lines
- **Transaction Management**: 
  - Searchable and filterable transaction table
  - Status filtering (Completed, Pending, Refunded)
  - Date range filters
- **Payment Analytics**: Payment method distribution
- **Top Products**: Ranked product performance

### 🎨 UI/UX Features
- **Dark Sidebar**: Modern gradient design with Lucide icons
- **Top Navigation Bar**: Search, notifications, user menu
- **Responsive Design**: Mobile-first approach
- **Loading States**: Skeleton loaders and spinners
- **Hover Effects**: Smooth transitions throughout

## 🛠️ Tech Stack

### Core
- **[SvelteKit](https://kit.svelte.dev/)** - Full-stack framework
- **[Svelte 5](https://svelte.dev/)** - Using latest runes (`$state`, `$derived`, `$effect`)
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety throughout
- **[Vite](https://vitejs.dev/)** - Build tool and dev server

### UI & Styling
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS
- **[Lucide Icons](https://lucide.dev/)** - Beautiful icon library
- **[Chart.js](https://www.chartjs.org/)** - Data visualization

### Deployment
- **[Vercel](https://vercel.com/)** - Optimized for SvelteKit

## 📁 Project Structure

```
src/
├── routes/              # File-based routing
│   ├── +page.svelte    # Login page
│   ├── +layout.svelte  # Root layout
│   └── dashboard/      # Dashboard routes
│       ├── +layout.svelte     # Dashboard layout with sidebar
│       ├── +page.svelte       # Overview page
│       ├── analytics/         # Analytics with charts
│       ├── revenue/           # Revenue tracking
│       └── users/             # User management
├── lib/
│   ├── components/     # Reusable components
│   │   ├── dashboard/
│   │   │   ├── MetricCard.svelte
│   │   │   ├── Sidebar.svelte
│   │   │   └── Topbar.svelte
│   │   └── charts/     # Chart components
│   │       ├── LineChart.svelte
│   │       ├── BarChart.svelte
│   │       └── DoughnutChart.svelte
│   ├── data/          # Mock data generators
│   │   ├── mockData.ts
│   │   └── revenueData.ts
│   └── stores/        # Svelte stores
│       └── revenueStore.ts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/JostinJarryNohair/sveltkit-dashboard
cd my-svelkit-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173)

### Login Credentials

Use any of these demo accounts:

| Email | Password | Role |
|-------|----------|------|
| admin@dashboard.com | admin123 | Admin |
| user@dashboard.com | user123 | User |
| demo@dashboard.com | demo123 | Demo |

## 📜 Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run check      # Run type checking
npm run lint       # Run linting
npm run format     # Format code with Prettier
```

## 🎯 Key Features Demonstrated

### SvelteKit Concepts
- ✅ File-based routing with nested layouts
- ✅ Server-side rendering (SSR) capabilities
- ✅ Client-side navigation with `goto()`
- ✅ Layout inheritance and composition
- ✅ TypeScript integration

### Svelte 5 Runes
- ✅ `$state` for reactive variables
- ✅ `$derived` for computed values
- ✅ `$effect` for side effects
- ✅ `$props` for component properties
- ✅ Modern component syntax

### Advanced Patterns
- ✅ Dynamic component rendering with `svelte:component`
- ✅ Two-way binding with `bind:` directive
- ✅ Lifecycle hooks (`onMount`, `onDestroy`)
- ✅ Store patterns for state management
- ✅ Real-time data simulation

## 🌐 Deployment

The project is configured for Vercel deployment with `@sveltejs/adapter-vercel`.

```

## 🤝 Acknowledgments

- Built with [SvelteKit](https://kit.svelte.dev/)
- Icons by [Lucide](https://lucide.dev/)
- Charts by [Chart.js](https://www.chartjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

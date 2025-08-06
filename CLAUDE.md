# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Development Server
```bash
npm run dev        # Start dev server on localhost:5173
npm run dev -- --open  # Start dev server and open browser
```

### Build & Preview
```bash
npm run build      # Build production version
npm run preview    # Preview production build
```

### Code Quality
```bash
npm run check      # Run type checking with svelte-check
npm run check:watch # Run type checking in watch mode
npm run lint       # Check code formatting with prettier and eslint
npm run format     # Auto-format code with prettier
```

## Architecture

### Tech Stack
- **Framework**: SvelteKit with TypeScript (Svelte 5 with runes)
- **Styling**: Tailwind CSS v4
- **Deployment**: Vercel adapter
- **Development**: Vite

### Project Structure
```
src/
├── routes/          # File-based routing
│   ├── +page.svelte        # Landing page
│   └── dashboard/          # Dashboard routes with layout wrapper
│       ├── +layout.svelte  # Dashboard layout with sidebar
│       ├── +page.svelte    # Dashboard overview
│       ├── analytics/      # Analytics page
│       ├── revenue/        # Revenue tracking page
│       └── users/          # User metrics page
├── lib/
│   └── components/         # Reusable components
│       └── Sidebar.svelte  # Navigation sidebar with active states
└── app.css                 # Global styles with Tailwind directives
```

### Key Patterns

1. **Routing**: File-based routing with nested layouts. Dashboard pages inherit from `dashboard/+layout.svelte` which provides the sidebar navigation.

2. **Component Structure**: Using Svelte 5's runes syntax (`$props()`, `$state()`, etc.) for reactive state management.

3. **Styling**: Tailwind CSS for utility-first styling with custom configuration in `tailwind.config.js`.

4. **TypeScript**: Strict mode enabled with full type checking. Components use `<script lang="ts">` for TypeScript support.

5. **State Management**: Using `$app/stores` for accessing page state and navigation data.

## Current Implementation Status

The project is an analytics dashboard showcase with:
- Complete routing structure for dashboard sections
- Sidebar navigation with active state tracking
- Basic page scaffolding for all dashboard routes
- Responsive layout system

Next implementation phases focus on:
1. Creating reusable metric card components
2. Adding data visualization with charts
3. Implementing mock data services
4. Adding interactive features and animations
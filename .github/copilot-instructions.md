# Modern Dashboard - AI Coding Agent Instructions

## 🏗️ Architecture Overview

This is a **Next.js 15 dashboard template** with App Router, featuring a collapsible sidebar layout and data visualization components. The architecture follows a component-first approach with centralized data management.

### Core Components
- **`DashboardLayout`**: Main layout wrapper with `SidebarProvider` context - wrap ALL page components with this
- **Custom Sidebar**: Located in `src/components/ui/sidebar.tsx` with responsive behavior and collapse animations
- **Charts**: Memoized Recharts components in `src/components/charts.tsx` using data from `src/lib/constants.ts`

## 🔧 Development Patterns

### Component Structure
```tsx
// Standard page pattern - ALWAYS use this structure
import { DashboardLayout } from "@/components/dashboard-layout"

export default function MyPage() {
  return (
    <DashboardLayout>
      {/* Page content here */}
    </DashboardLayout>
  )
}
```

### Data Management
- **Static data**: Store in `src/lib/constants.ts` using `as const` assertions
- **Component state**: Use React hooks with TypeScript strict mode
- **Theme**: Managed via `next-themes` with CSS custom properties in `globals.css`

### Styling Conventions
- **Utility function**: Use `cn()` from `src/lib/utils.ts` for conditional classes
- **Responsive**: Mobile-first with `sm:`, `lg:` breakpoints
- **Theme tokens**: Use CSS custom properties like `hsl(var(--primary))` for colors
- **Grid layouts**: Standard pattern is `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`

## 🚀 Development Commands

```bash
# Development with Turbopack (default)
npm run dev

# Type checking (run before commits)
npm run type-check

# Linting with auto-fix
npm run lint:fix

# Pre-commit validation
npm run precommit
```

## 📁 File Organization

- **Pages**: `src/app/[route]/page.tsx` - each page is a separate directory
- **Reusable UI**: `src/components/ui/` - Shadcn components
- **Layout Components**: `src/components/` - dashboard-specific components
- **Data**: `src/lib/constants.ts` - centralized static data
- **Utilities**: `src/lib/utils.ts` - shared helper functions

## 🎨 UI Component Guidelines

### Adding New Shadcn Components
```bash
npx shadcn@latest add [component-name]
```

### Chart Components
- Import from `@/components/charts` for memoized versions
- Data should be defined in `constants.ts` with proper TypeScript types
- Use CSS custom properties for colors: `hsl(var(--chart-1))`, `hsl(var(--chart-2))`, etc.

### Icons
- Use `lucide-react` consistently
- Size classes: `h-4 w-4` (small), `h-6 w-6` (standard), `h-8 w-8` (large)

## 🧭 Navigation & Routing

Navigation is defined in `dashboard-layout.tsx`:
```tsx
const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  // Add new routes here
]
```

## 🎯 Key Integration Points

- **Theme Provider**: Wraps entire app in `layout.tsx` with system preference detection
- **Sidebar Context**: Manages collapse state and mobile responsiveness
- **Font Loading**: Geist fonts with `display: swap` for performance
- **Metadata**: Comprehensive SEO setup in root `layout.tsx`

## ⚡ Performance Patterns

- **Memoized Charts**: Use `MemoizedLineChart`, `MemoizedBarChart`, `MemoizedPieChart`
- **Font Optimization**: Preload fonts with `display: swap`
- **Responsive Images**: Use Next.js Image component when adding images
- **Static Data**: Keep dashboard data in constants to avoid re-renders

## 🔍 Debugging Tips

- Use browser dev tools to inspect CSS custom properties for theme debugging
- Check `data-sidebar="open/closed"` and `data-mobile="true/false"` attributes for layout issues
- Sidebar animations are CSS-based with 300ms transitions

## 📋 Project Constitution

For strategic development principles including code quality standards, testing requirements, UX consistency rules, and performance benchmarks, see **[`.specify/memory/constitution.md`](../.specify/memory/constitution.md)**.

The constitution defines non-negotiable principles that govern all development decisions. This instruction file provides tactical implementation patterns to follow those principles.
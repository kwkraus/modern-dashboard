# Modern Dashboard Template

A beautiful, responsive dashboard template built with Next.js 15, Shadcn UI, and Tailwind CSS. Features a collapsible sidebar, dark mode support, and interactive charts.

## ✨ Features

- 🎨 **Modern UI**: Built with Shadcn UI components and Tailwind CSS
- 🌙 **Dark Mode**: Complete dark/light mode support with theme toggle
- 📱 **Responsive**: Mobile-first design that works on all devices
- 🎯 **Interactive Charts**: Beautiful data visualizations with Recharts
- 🔧 **TypeScript**: Full type safety throughout the application
- ⚡ **Next.js 15**: Latest features including App Router and React 19
- 🎭 **Collapsible Sidebar**: Space-efficient navigation with tooltips
- 📊 **Dashboard Cards**: Pre-built stat cards with trend indicators

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn UI
- **Charts**: Recharts
- **Icons**: Lucide React
- **Type System**: TypeScript
- **Theme**: next-themes

## 🏃‍♂️ Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the dashboard.

## 🎨 Customization

### Adding New Components

This template uses Shadcn UI. To add new components:

```bash
npx shadcn@latest add [component-name]
```

### Theming

The theme system is configured in:
- `src/app/globals.css` - CSS variables for colors
- `tailwind.config.ts` - Tailwind configuration
- `src/components/theme-provider.tsx` - Theme context

### Charts

Charts are built with Recharts. You can find examples in `src/components/charts.tsx`:
- Line Chart
- Bar Chart  
- Pie Chart

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and theme variables
│   ├── layout.tsx           # Root layout with theme provider
│   └── page.tsx             # Main dashboard page
├── components/
│   ├── ui/                  # Shadcn UI components
│   ├── charts.tsx           # Chart components
│   ├── dashboard-layout.tsx # Main layout with sidebar
│   ├── header.tsx           # Dashboard header
│   ├── theme-provider.tsx   # Theme context provider
│   └── theme-toggle.tsx     # Dark mode toggle
└── lib/
    └── utils.ts             # Utility functions
```

## 🚀 Deployment

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

1. Push your code to a Git repository
2. Import your repository to Vercel
3. Vercel will automatically build and deploy your app

### Other Deployment Options

This Next.js app can be deployed on any platform that supports Node.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Railway
- Render

## 📚 Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Shadcn UI](https://ui.shadcn.com/) - re-usable component library
- [Tailwind CSS](https://tailwindcss.com/docs) - utility-first CSS framework
- [Recharts](https://recharts.org/) - composable charting library
- [Lucide React](https://lucide.dev/) - beautiful icon library

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

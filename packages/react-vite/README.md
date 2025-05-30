# 🚀 React + Vite + shadcn/ui Boilerplate

A modern, production-ready boilerplate for building React applications with Vite, TanStack Router, TypeScript, Tailwind CSS, and shadcn/ui components.

## ✨ Features

- **React 19** with modern hooks and patterns
- **Vite** for lightning-fast development and building
- **TanStack Router** for type-safe routing
- **TypeScript** for type safety and better developer experience
- **Tailwind CSS v4** for utility-first styling
- **shadcn/ui** for beautiful, accessible UI components
- **Jotai** for atomic state management
- **TanStack Query** for server state management
- **ESLint** for code quality and consistency
- **Domain-driven folder structure** for better code organization

## 🛠️ Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript
- **Routing**: TanStack Router
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **State Management**: Jotai (Atomic)
- **Server State**: TanStack Query
- **Code Quality**: ESLint

## 📁 Project Structure

```
src/
├── components/             # Shared/common components
│   ├── ui/                # shadcn/ui components
│   │   └── button.tsx
│   └── providers.tsx      # App providers
├── domains/               # Domain-based organization
│   ├── user/
│   │   ├── components/
│   │   │   └── UserProfileCard.tsx
│   │   ├── hooks/
│   │   │   └── useUser.ts
│   │   └── index.ts
│   ├── product/
│   │   ├── components/
│   │   └── hooks/
│   └── order/
│       ├── components/
│       └── hooks/
├── hooks/                 # Shared hooks
├── lib/                   # Utilities and configurations
├── routes/                # TanStack Router routes
│   ├── __root.tsx
│   ├── index.tsx
│   └── about.tsx
└── main.tsx              # App entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Create a new project using the CLI tool:

```bash
# Using npx (recommended)
npx create-react-shadcn-app my-app react-vite

# Or using degit
npx degit im-ian/create-react-shadcn-app/packages/react-vite my-app
```

2. Install dependencies:

```bash
cd my-app
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code quality checks

## 🎨 Adding Components

This boilerplate uses shadcn/ui for components. To add new components:

```bash
npx shadcn@latest add [component-name]
```

For example:
```bash
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add dialog
```

## 🏗️ Domain-Driven Structure

The project follows a domain-driven approach where related functionality is grouped together:

- **`domains/user/`** - User-related components, hooks, and logic
- **`domains/product/`** - Product-related functionality
- **`domains/order/`** - Order management features

Each domain contains:
- `components/` - Domain-specific React components
- `hooks/` - Custom hooks for the domain
- `index.ts` - Barrel exports for clean imports

## 🔧 Customization

### Tailwind CSS

The project uses Tailwind CSS v4. Customize your design system in:
- `src/index.css` - Global styles and CSS variables
- `tailwind.config.js` - Tailwind configuration (if needed)

### shadcn/ui Theme

Customize the component theme by modifying the CSS variables in `src/index.css`.

### State Management

- **Client State**: Use Jotai atoms for component state
- **Server State**: Use TanStack Query for API data

### Routing

Add new routes by creating files in the `src/routes/` directory. TanStack Router will automatically generate the route tree.

## 📦 Building for Production

```bash
npm run build
npm run preview
```

The application will be optimized and ready for deployment in the `dist/` folder.

## 🚀 Deployment

This Vite application can be deployed to:

- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**
- Any static hosting service

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

**Happy coding!** 🎉

# 🚀 Next.js App Router + shadcn/ui Boilerplate

A modern, production-ready boilerplate for building React applications with Next.js App Router, TypeScript, Tailwind CSS, and shadcn/ui components.

## ✨ Features

- **Next.js 15** with App Router for modern React development
- **React 19** with modern hooks and patterns
- **TypeScript** for type safety and better developer experience
- **Tailwind CSS v4** for utility-first styling
- **shadcn/ui** for beautiful, accessible UI components
- **Jotai** for atomic state management
- **TanStack Query** for server state management
- **ESLint** for code quality and consistency
- **Domain-driven folder structure** for better code organization

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router) + React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **State Management**: Jotai (Atomic)
- **Server State**: TanStack Query
- **Code Quality**: ESLint

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
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
└── lib/
    └── utils.ts           # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Create a new project using the CLI tool:

```bash
# Using npx (recommended)
npx create-react-shadcn-app my-app nextjs-app-router

# Or using degit
npx degit im-ian/create-react-shadcn-app/packages/nextjs-app-router my-app
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

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
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
- `src/app/globals.css` - Global styles and CSS variables
- `tailwind.config.js` - Tailwind configuration (if needed)

### shadcn/ui Theme

Customize the component theme by modifying the CSS variables in `src/app/globals.css`.

### State Management

- **Client State**: Use Jotai atoms for component state
- **Server State**: Use TanStack Query for API data

## 📦 Building for Production

```bash
npm run build
npm run start
```

The application will be optimized and ready for deployment.

## 🚀 Deployment

This Next.js application can be deployed to:

- **Vercel** (recommended)
- **Netlify**
- **AWS**
- **Docker**
- Any platform supporting Node.js

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

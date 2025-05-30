# 🚀 React + shadcn/ui Boilerplates

A collection of modern, production-ready boilerplates for building React applications with different frameworks and routing solutions.

## 📦 Available Templates

### 1. 🔥 React + Vite
**Location**: `packages/react-vite/`

A modern React boilerplate with Vite for fast development and TanStack Router for type-safe routing.

**Tech Stack**:
- React 18 + TypeScript
- Vite (Build tool)
- TanStack Router (Type-safe routing)
- Tailwind CSS v4
- shadcn/ui components
- Jotai (State management)
- TanStack Query (Server state)

### 2. ⚡ Next.js App Router
**Location**: `packages/nextjs-app-router/`

A Next.js boilerplate using the modern App Router with server components and streaming.

**Tech Stack**:
- Next.js 15 + App Router
- TypeScript
- Tailwind CSS v4
- shadcn/ui components
- Jotai (State management)
- TanStack Query (Server state)

### 3. 📄 Next.js Pages Router *(Coming Soon)*
**Location**: `packages/nextjs-pages-router/`

A Next.js boilerplate using the traditional Pages Router for projects that need it.

## 🚀 Quick Start

### Using the Creation Script

```bash
# Clone this repository
git clone <repository-url>
cd react-shadcn-boilerplates

# Create a new project using any template
node scripts/create-project.js my-app react-vite
node scripts/create-project.js my-app nextjs-app-router
# node scripts/create-project.js my-app nextjs-pages-router  # Coming soon
```

### Manual Setup

```bash
# Copy any template manually
cp -r packages/react-vite my-new-project
cd my-new-project
npm install
npm run dev
```

## 🛠️ Common Features

All boilerplates include:

- ✅ **TypeScript** for type safety
- ✅ **Tailwind CSS v4** for modern styling
- ✅ **shadcn/ui** for beautiful components
- ✅ **Jotai** for atomic state management
- ✅ **TanStack Query** for server state
- ✅ **ESLint** for code quality
- ✅ **Domain-driven folder structure**
- ✅ **Modern development tools**

## 📁 Project Structure

Each template follows a consistent, domain-driven structure:

```
src/
├── components/             # Shared/common components
│   └── ui/                # shadcn/ui components
├── domains/               # Domain-based organization
│   ├── user/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── index.ts
│   ├── product/
│   └── order/
├── hooks/                 # Shared hooks
├── lib/                   # Utilities and configurations
└── ...                    # Framework-specific files
```

## 🎯 When to Use Each Template

### React + Vite
- **Best for**: SPAs, client-side applications, rapid prototyping
- **Pros**: Fast development, simple deployment, full client-side control
- **Use cases**: Dashboards, admin panels, interactive web apps

### Next.js App Router
- **Best for**: Full-stack applications, SEO-critical sites, modern React patterns
- **Pros**: Server components, streaming, built-in optimizations, SEO-friendly
- **Use cases**: Marketing sites, e-commerce, blogs, complex web applications

### Next.js Pages Router
- **Best for**: Existing Next.js projects, gradual migration, specific requirements
- **Pros**: Mature ecosystem, well-documented, stable API
- **Use cases**: Legacy projects, specific routing needs, incremental adoption

## 🔧 Customization

### Adding Components

All templates use shadcn/ui. Add new components with:

```bash
npx shadcn@latest add [component-name]
```

### State Management

- **Client State**: Use Jotai atoms
- **Server State**: Use TanStack Query
- **Form State**: Use react-hook-form (add as needed)

### Styling

- Customize Tailwind CSS in `globals.css`
- Modify shadcn/ui theme variables
- Add custom components in `components/ui/`

## 📝 Scripts

Each template includes these common scripts:

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build (Vite only)
npm run start    # Start production server (Next.js only)
```

## 🚀 Deployment

### React + Vite
- **Recommended**: Vercel, Netlify, GitHub Pages
- **Build**: `npm run build` → `dist/` folder

### Next.js (App Router & Pages Router)
- **Recommended**: Vercel (zero-config)
- **Alternatives**: Netlify, AWS, Docker
- **Build**: `npm run build` → `.next/` folder

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

**Choose your adventure and start building! 🎉**

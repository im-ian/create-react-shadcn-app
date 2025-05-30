import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About This Boilerplate
          </h1>
          <p className="text-lg text-gray-600">
            Learn about the technologies and structure used in this project
          </p>
        </header>

        <nav className="flex justify-center gap-4 mb-12">
          <Button variant="outline" asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button asChild>
            <Link href="/about">About</Link>
          </Button>
        </nav>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                🚀 Tech Stack
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Frontend Framework</h3>
                  <p className="text-gray-600">Next.js 15 with App Router</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Language</h3>
                  <p className="text-gray-600">TypeScript</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Styling</h3>
                  <p className="text-gray-600">Tailwind CSS v4</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">UI Components</h3>
                  <p className="text-gray-600">shadcn/ui</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">State Management</h3>
                  <p className="text-gray-600">Jotai (Atomic)</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Server State</h3>
                  <p className="text-gray-600">TanStack Query</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                📁 Project Structure
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm text-gray-700">
{`src/
├── app/                    # Next.js App Router pages
│   ├── about/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/             # Shared/common components
│   └── ui/                # shadcn/ui components
│       └── button.tsx
├── domains/               # Domain-based organization
│   ├── user/
│   │   ├── components/
│   │   └── hooks/
│   ├── product/
│   │   ├── components/
│   │   └── hooks/
│   └── order/
│       ├── components/
│       └── hooks/
└── lib/
    └── utils.ts           # Utility functions`}
                </pre>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                ✨ Features
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Next.js 15 with App Router for modern React development
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  TypeScript for type safety
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Tailwind CSS v4 for utility-first styling
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  shadcn/ui for beautiful, accessible components
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Jotai for atomic state management
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  TanStack Query for server state management
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Domain-driven folder structure
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  ESLint for code quality
                </li>
              </ul>
            </section>
          </div>
        </div>

        <footer className="text-center mt-12 text-gray-500">
          <p>Ready to build amazing applications! 🎉</p>
        </footer>
      </div>
    </div>
  );
} 
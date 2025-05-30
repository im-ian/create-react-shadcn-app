import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome Home! 🚀
          </h1>
          <p className="text-lg text-gray-600">
            React + Vite + TanStack Router + Tailwind CSS + shadcn/ui
          </p>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            shadcn/ui Components
          </h2>
          
          <div className="flex flex-wrap gap-3">
            <Button>Default Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            ✨ This page demonstrates shadcn/ui Button components with various variants and sizes.
          </p>
        </div>
      </div>
    </div>
  )
} 
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Vibe Starter
        </h1>
        
        <div className="text-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
            onClick={() => setCount((count) => count + 1)}
          >
            Count is {count}
          </button>
          
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Edit <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">src/App.tsx</code> and save to test HMR
          </p>
        </div>

        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          <h2 className="font-semibold mb-2">Ready to build with:</h2>
          <ul className="space-y-1">
            <li>✅ React 18 + TypeScript</li>
            <li>✅ Vite for fast development</li>
            <li>✅ Tailwind CSS for styling</li>
            <li>✅ Zustand for state management</li>
            <li>✅ Vitest for testing</li>
            <li>✅ ESLint for code quality</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App

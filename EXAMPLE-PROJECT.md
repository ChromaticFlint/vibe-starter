# Example: Todo App Project

This is an example of how to use the vibe-starter template to create a Todo application. Follow this pattern for your own projects.

## Step 1: Project Planning

### Questionnaire Answers
- **Project Name**: Todo Master
- **Project Type**: Web App
- **Theme**: Productivity
- **Target Users**: Individuals who want to organize their tasks
- **Primary Features**: Add/edit/delete todos, mark complete, filter by status
- **Tech Stack**: React + TypeScript + Tailwind (already configured)

## Step 2: Requirements Document

Create `todo-app-requirements.md` based on the template:

```markdown
# Todo Master - Project Requirements

## Project Overview
**Project Name**: Todo Master
**Type**: Productivity Web App
**Theme**: Task Management
**Target Platform**: Modern web browsers (desktop + mobile)

## Audience & Engagement Analysis
### Target Audience
- **Primary Users**: Busy professionals and students
- **User Expertise Level**: Beginner to Intermediate
- **Technical Proficiency**: Low to Medium

### User Goals & Pain Points
- **Primary Goals**: Organize daily tasks, track progress, reduce mental load
- **Pain Points**: Forgetting tasks, lack of organization, overwhelming todo lists
```

## Step 3: Implementation

### 1. Define Types
```typescript
// src/types/todo.ts
export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
}

export type TodoFilter = 'all' | 'active' | 'completed'
```

### 2. Create Store
```typescript
// src/stores/todoStore.ts
import { create } from 'zustand'
import { Todo, TodoFilter } from '@/types/todo'
import { generateId } from '@/utils'

interface TodoState {
  todos: Todo[]
  filter: TodoFilter
  addTodo: (text: string) => void
  toggleTodo: (id: string) => void
  deleteTodo: (id: string) => void
  setFilter: (filter: TodoFilter) => void
  clearCompleted: () => void
}

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  filter: 'all',
  
  addTodo: (text: string) => {
    const newTodo: Todo = {
      id: generateId(),
      text,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    set(state => ({ todos: [...state.todos, newTodo] }))
  },
  
  toggleTodo: (id: string) => {
    set(state => ({
      todos: state.todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
          : todo
      )
    }))
  },
  
  deleteTodo: (id: string) => {
    set(state => ({ todos: state.todos.filter(todo => todo.id !== id) }))
  },
  
  setFilter: (filter: TodoFilter) => set({ filter }),
  
  clearCompleted: () => {
    set(state => ({ todos: state.todos.filter(todo => !todo.completed) }))
  },
}))
```

### 3. Create Components
```typescript
// src/components/TodoItem.tsx
import React from 'react'
import { Todo } from '@/types/todo'
import { Button } from './Button'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <div className="flex items-center gap-3 p-3 border rounded-lg">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-4 h-4"
      />
      <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
        {todo.text}
      </span>
      <Button
        variant="danger"
        size="sm"
        onClick={() => onDelete(todo.id)}
      >
        Delete
      </Button>
    </div>
  )
}
```

### 4. Update Main App
```typescript
// src/App.tsx
import { useState } from 'react'
import { useTodoStore } from '@/stores/todoStore'
import { TodoItem } from '@/components/TodoItem'
import { Button } from '@/components/Button'

function App() {
  const [newTodo, setNewTodo] = useState('')
  const { todos, filter, addTodo, toggleTodo, deleteTodo, setFilter, clearCompleted } = useTodoStore()

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim()) {
      addTodo(newTodo.trim())
      setNewTodo('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Todo Master</h1>
        
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new todo..."
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button type="submit">Add</Button>
          </div>
        </form>

        <div className="flex gap-2 mb-4">
          <Button
            variant={filter === 'all' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'active' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilter('active')}
          >
            Active
          </Button>
          <Button
            variant={filter === 'completed' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilter('completed')}
          >
            Completed
          </Button>
        </div>

        <div className="space-y-2 mb-4">
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
        </div>

        {todos.some(todo => todo.completed) && (
          <Button
            variant="danger"
            size="sm"
            onClick={clearCompleted}
            className="w-full"
          >
            Clear Completed
          </Button>
        )}
      </div>
    </div>
  )
}

export default App
```

### 5. Add Tests
```typescript
// src/components/__tests__/TodoItem.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { TodoItem } from '../TodoItem'
import { Todo } from '@/types/todo'

const mockTodo: Todo = {
  id: '1',
  text: 'Test todo',
  completed: false,
  createdAt: new Date(),
  updatedAt: new Date(),
}

test('renders todo item', () => {
  const onToggle = vi.fn()
  const onDelete = vi.fn()
  
  render(<TodoItem todo={mockTodo} onToggle={onToggle} onDelete={onDelete} />)
  
  expect(screen.getByText('Test todo')).toBeInTheDocument()
  expect(screen.getByRole('checkbox')).not.toBeChecked()
})

test('calls onToggle when checkbox is clicked', () => {
  const onToggle = vi.fn()
  const onDelete = vi.fn()
  
  render(<TodoItem todo={mockTodo} onToggle={onToggle} onDelete={onDelete} />)
  
  fireEvent.click(screen.getByRole('checkbox'))
  expect(onToggle).toHaveBeenCalledWith('1')
})
```

## Step 4: Development

```bash
# Start development
npm run dev

# Run tests
npm run test

# Build for production
npm run build
```

## Step 5: Deployment

Follow the deployment guide in `development-workflow.md` to deploy to Vercel, Netlify, or GitHub Pages.

---

This example demonstrates how the vibe-starter template provides a solid foundation for rapid development while maintaining code quality and best practices.

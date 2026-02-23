'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Todo, FilterType } from '../types/todo'

const STORAGE_KEY = 'todos'

function loadFromStorage(): Todo[] {
  if (typeof window === 'undefined') return []
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? (JSON.parse(data) as Todo[]) : []
  } catch {
    return []
  }
}

function saveToStorage(todos: Todo[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  } catch {
    // ignore storage errors
  }
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<FilterType>('all')

  useEffect(() => {
    setTodos(loadFromStorage())
  }, [])

  useEffect(() => {
    saveToStorage(todos)
  }, [todos])

  const addTodo = useCallback((text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setTodos((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text: trimmed,
        completed: false,
        createdAt: Date.now(),
      },
    ])
  }, [])

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }, [])

  const editTodo = useCallback((id: string, text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: trimmed } : t))
    )
  }, [])

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((t) => !t.completed))
  }, [])

  const filteredTodos = todos.filter((t) => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  const activeCount = todos.filter((t) => !t.completed).length
  const completedCount = todos.filter((t) => t.completed).length

  return {
    todos: filteredTodos,
    filter,
    setFilter,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
    clearCompleted,
    activeCount,
    completedCount,
  }
}

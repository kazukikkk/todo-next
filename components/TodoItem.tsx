'use client'

import { useState, useRef, useEffect, type KeyboardEvent } from 'react'
import type { Todo } from '../types/todo'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [editing])

  function commitEdit() {
    const trimmed = editText.trim()
    if (trimmed) {
      onEdit(todo.id, trimmed)
    } else {
      setEditText(todo.text)
    }
    setEditing(false)
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') commitEdit()
    if (e.key === 'Escape') {
      setEditText(todo.text)
      setEditing(false)
    }
  }

  return (
    <li className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-4 h-4 accent-blue-500 cursor-pointer flex-shrink-0"
      />

      {editing ? (
        <input
          ref={inputRef}
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={handleKeyDown}
          className="flex-1 px-2 py-0.5 border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800"
        />
      ) : (
        <span
          onDoubleClick={() => !todo.completed && setEditing(true)}
          className={`flex-1 text-base cursor-default select-none ${
            todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
          }`}
          title={todo.completed ? undefined : 'ダブルクリックで編集'}
        >
          {todo.text}
        </span>
      )}

      {!editing && !todo.completed && (
        <button
          onClick={() => setEditing(true)}
          className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-blue-500 transition-all text-sm"
          title="編集"
        >
          ✏️
        </button>
      )}

      <button
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all text-sm"
        title="削除"
      >
        ✕
      </button>
    </li>
  )
}

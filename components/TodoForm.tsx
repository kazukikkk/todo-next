'use client'

import { useState, type FormEvent } from 'react'

interface TodoFormProps {
  onAdd: (text: string) => void
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [value, setValue] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!value.trim()) return
    onAdd(value)
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="新しいタスクを入力..."
        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-400"
      />
      <button
        type="submit"
        className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:bg-blue-700 transition-colors font-medium"
      >
        追加
      </button>
    </form>
  )
}

'use client'

import type { FilterType } from '../types/todo'

interface FilterButtonsProps {
  current: FilterType
  onChange: (filter: FilterType) => void
}

const FILTERS: { value: FilterType; label: string }[] = [
  { value: 'all', label: '全て' },
  { value: 'active', label: '未完了' },
  { value: 'completed', label: '完了済み' },
]

export default function FilterButtons({ current, onChange }: FilterButtonsProps) {
  return (
    <div className="flex gap-1 mb-4">
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            current === value
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

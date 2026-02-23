'use client'

import { useTodos } from '../../hooks/useTodos'
import TodoForm from '../../components/TodoForm'
import FilterButtons from '../../components/FilterButtons'
import TodoList from '../../components/TodoList'

export default function Home() {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
    clearCompleted,
    activeCount,
    completedCount,
  } = useTodos()

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-start justify-center pt-16 px-4">
      <div className="w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8 tracking-tight">
          Todo App
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <TodoForm onAdd={addTodo} />

          <div className="flex items-center justify-between mb-2">
            <FilterButtons current={filter} onChange={setFilter} />
          </div>

          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />

          {(activeCount > 0 || completedCount > 0) && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
              <span>{activeCount} 件のタスクが残っています</span>
              {completedCount > 0 && (
                <button
                  onClick={clearCompleted}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  完了済みを削除 ({completedCount})
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

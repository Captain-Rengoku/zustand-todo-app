"use client";
import AppTodoForm from "@/components/add-todo-form";
import TodoItem from "@/components/todo-item";
import TodoStats from "@/components/todo-stats";
import { useTodoStore } from "@/lib/todo-store";

export default function Home() {
  const todos = useTodoStore((state) => state.todos);
  return (
    <div className="min-h-screen bg-slate-700 py-8 text-black">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-200 select-none">Todo App</h1>
        <AppTodoForm />
        <TodoStats />
        <div className="space-y-2">
          {todos.length === 0 ? (
            <p className="text-center text-gray-500">No todos</p>
          ) : (
            todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
          )}
        </div>
      </div>
    </div>
  );
}

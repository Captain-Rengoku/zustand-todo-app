import { useTodoStore } from "@/lib/todo-store";
import { Todo } from "@/types/todo";
import { BadgeCheck, CircleX, Edit, Trash2 } from "lucide-react";
import React, { useState } from "react";

const TodoItem = ({ todo }: { todo: Todo }) => {
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const handleSaveEdit = () => {
    if (editText.trim()) {
      updateTodo(todo.id, editText);
      setIsEditing(false);
    }
  };
  const handleCancelEdit = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
        todo.completed ? "bg-slate-500" : "bg-slate-400"
      }`}
    >
      {/* checkbox */}
      <input
        type="checkbox"
        className="w-4 h-4 cursor-pointer"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      {/* text todo */}
      <div className="flex-1">
        {isEditing ? (
          <input
            value={editText}
            className="w-full px-2 py-1 rounded"
            autoFocus
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSaveEdit()}
          />
        ) : (
          <span
            className={`${
              todo.completed ? "line-through text-slate-700" : "text-slate-90"
            }`}
          >
            {todo.text}
          </span>
        )}
      </div>
      {/* action button */}
      <div className="flex gap-x-1">
        {isEditing ? (
          <>
            <button
              className="p-2 rounded-lg cursor-pointer text-green-300 hover:bg-green-300/30"
              onClick={handleSaveEdit}
            >
              <BadgeCheck size={20} />
            </button>
            <button
              className="p-2 rounded-lg cursor-pointer text-red-600 hover:bg-red-300/30"
              onClick={handleCancelEdit}
            >
              <CircleX size={20} />
            </button>
          </>
        ) : (
          <>
            <button
              className="p-2 rounded-lg cursor-pointer text-blue-600 hover:bg-blue-300/30"
              onClick={() => setIsEditing(true)}
            >
              <Edit size={20} />
            </button>
            <button
              className="p-2 rounded-lg cursor-pointer text-red-600 hover:bg-red-300/30"
              onClick={() => deleteTodo(todo.id)}
            >
              <Trash2 size={20} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;

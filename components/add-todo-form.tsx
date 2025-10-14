"use client";
import React, { useState } from "react";
import { PlusIcon } from "lucide-react";
import { useTodoStore } from "@/lib/todo-store";

const AddTodoForm = () => {
  const [input, setInput] = useState("");
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = () => {
    if(input.trim()) {
      addTodo(input);
      setInput("");
    }
  };

  return (
    <div className="mb-6 flex gap-2">
      <input
        type="text"
        className="flex-1 px-4 py-2 border border-blue-200 rounded-lg"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      />
      <button 
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
      >
        <PlusIcon />
      </button>
    </div>
  );
};

export default AddTodoForm;

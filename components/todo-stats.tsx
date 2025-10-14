"use client";

import { useTodoStore } from "@/lib/todo-store";
import { Hourglass, ListChecks, ListIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const TodoStats = () => {
  const getTodosStats = useTodoStore((state) => state.getTodosStats);
  const stats = getTodosStats();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <div className="mb-4 text-gray-500">Loading...</div>
  }

  return (
    <div className="mb-4 text-center">
      <div className="flex w-full justify-end items-center gap-8 px-4 py-2 
      bg-slate-400/60 rounded-lg select-none">
        <div className="flex justify-center items-center gap-1">
          <ListIcon size={16}/>
          <span>Total: {stats.total}</span>
        </div>
        <div className="flex justify-center items-center gap-1">
          <Hourglass size={16}/>
          <span>Active: {stats.active}</span>
        </div>
        <div className="flex justify-center items-center gap-1">
          <ListChecks size={16}/>
          <span>Completed: {stats.completed}</span>
        </div>
      </div>
    </div>
  );
};

export default TodoStats;

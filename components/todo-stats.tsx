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
    return (
      <div className="flex justify-center items-center mt-20 mb-4">
        <div className="relative flex items-center justify-center w-20 h-20">
          {/* Rotating ring */}
          <div className="absolute w-full h-full rounded-lg border-2 border-slate-600 animate-spin"/>
          <div className="absolute w-full h-full rounded-lg border-2 border-slate-600 rotate-60 animate-spin"/>
          <div className="absolute w-full h-full rounded-lg border-2 border-slate-600 rotate-120 animate-spin"/>
          <div className="absolute w-full h-full rounded-lg border-2 border-slate-600 rotate-180 animate-spin"/>
          {/* Static text */}
          <span className="text-slate-400">Loading</span>
          <span className="text-slate-200 animate-pulse">...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4 text-center">
      <div
        className="flex w-full justify-end items-center gap-8 px-4 py-2 
      bg-slate-400/60 rounded-lg select-none"
      >
        <div className="flex justify-center items-center gap-1">
          <ListIcon size={16} />
          <span>Total: {stats.total}</span>
        </div>
        <div className="flex justify-center items-center gap-1">
          <Hourglass size={16} />
          <span>Active: {stats.active}</span>
        </div>
        <div className="flex justify-center items-center gap-1">
          <ListChecks size={16} />
          <span>Completed: {stats.completed}</span>
        </div>
      </div>
    </div>
  );
};

export default TodoStats;

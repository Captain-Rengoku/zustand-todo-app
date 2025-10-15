// import { create } from "zustand";
// import { Todo } from "@/types/todo";
// import { persist } from "zustand/middleware";

// interface TodoStore {
//   todos: Todo[],
//   addTodo: (text: string) => void,
//   deleteTodo: (id: string) => void,
//   toggleTodo: (id: string) => void,
//   updateTodo: (id: string, text: string) => void,
//   getTodosStats: () => { total: number, active: number, completed: number }
// }

// export const useTodoStore = create<TodoStore>()(
//   persist(
//     (set, get) => ({
//       // the data
//       todos: [],
//       // the functions
//       addTodo: (text: string) => set((state) => ({
//         todos: [
//           ...state.todos,
//           {
//             id: Date.now().toString(),
//             text: text.trim(),
//             completed: false,
//             createdAt: new Date()
//           }
//         ]
//       })),

//       deleteTodo: (id: string) => set((state) => ({
//         todos: state.todos.filter(todo => todo.id !== id)
//       })),

//       toggleTodo: (id: string) => set((state) => ({
//         todos: state.todos.map(todo =>
//           todo.id === id ? { ...todo, completed: !todo.completed } : todo
//         )
//       })),

//       updateTodo: (id: string, text: string) => set((state) => ({
//         todos: state.todos.map(todo =>
//           todo.id === id ? { ...todo, text: text.trim() } : todo
//         )
//       })),

//       getTodosStats: () => {
//         const { todos } = get();
//         return {
//           total: todos.length,
//           active: todos.filter(todo => !todo.completed).length,
//           completed: todos.filter(todo => todo.completed).length
//         }
//       }
//     }),
//     {
//       name: 'todo-storage'
//     }
//   )
// )



import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Todo } from "@/types/todo";

const API_URL = "https://json-server-hosting-798r.onrender.com/zustandTodos";

interface TodoStore {
  todos: Todo[];
  addTodo: (text: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  updateTodo: (id: string, text: string) => Promise<void>;
  getTodosStats: () => { total: number; active: number; completed: number };
  fetchTodos: () => Promise<void>;
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      todos: [],

      // 🟢 Fetch all todos from JSON Server
      fetchTodos: async () => {
        const res = await fetch(API_URL);
        const data = await res.json();
        set({ todos: data });
      },

      // 🟢 Add a new todo
      addTodo: async (text: string) => {
        const newTodo: Todo = {
          id: Date.now().toString(),
          text: text.trim(),
          completed: false,
          createdAt: new Date().toISOString(),
        };
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTodo),
        });
        set((state) => ({ todos: [...state.todos, newTodo] }));
      },

      // 🟡 Delete a todo
      deleteTodo: async (id: string) => {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
      },

      // 🟣 Toggle completion
      toggleTodo: async (id: string) => {
        const todo = get().todos.find((t) => t.id === id);
        if (!todo) return;

        const updatedTodo = { ...todo, completed: !todo.completed };
        await fetch(`${API_URL}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTodo),
        });

        set((state) => ({
          todos: state.todos.map((t) => (t.id === id ? updatedTodo : t)),
        }));
      },

      // 🔵 Update text
      updateTodo: async (id: string, text: string) => {
        const todo = get().todos.find((t) => t.id === id);
        if (!todo) return;

        const updatedTodo = { ...todo, text: text.trim() };
        await fetch(`${API_URL}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTodo),
        });

        set((state) => ({
          todos: state.todos.map((t) => (t.id === id ? updatedTodo : t)),
        }));
      },

      // 📊 Stats
      getTodosStats: () => {
        const { todos } = get();
        return {
          total: todos.length,
          active: todos.filter((t) => !t.completed).length,
          completed: todos.filter((t) => t.completed).length,
        };
      },
    }),
    { name: "todo-storage" } // optional local cache
  )
);

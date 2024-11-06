"use client";
import { useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([
    { id: 1, text: "리액트 공부하기", completed: false },
    { id: 2, text: "운동하기", completed: false },
  ]);

  const handleToggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900">
      <div className="container mx-auto p-4 max-w-md bg-white rounded-lg shadow">
        <h1 className="text-4xl font-bold mb-4">Todo 앱</h1>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">할 일 목록</h2>
          <ul className="space-y-2">
            {activeTodos.map((todo) => (
              <li key={todo.id} className="flex items-center gap-2">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleComplete(todo.id)}
                    className="appearance-none w-6 h-6 border-2 border-gray-300 rounded-md 
                    checked:bg-green-500 checked:border-transparent focus:outline-none cursor-pointer"
                  />
                  <svg
                    className={`absolute inset-0 w-6 h-6 pointer-events-none ${
                      todo.completed ? "text-white" : "text-gray-400"
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    {todo.completed ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    ) : null}
                  </svg>
                </div>
                <span>{todo.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">완료된 목록</h2>
          <ul className="space-y-2">
            {completedTodos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center text-gray-500 gap-2"
              >
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleComplete(todo.id)}
                    className="appearance-none w-6 h-6 border-2 border-gray-300 rounded-md 
                    checked:bg-green-500 checked:border-transparent focus:outline-none cursor-pointer"
                  />
                  <svg
                    className={`absolute inset-0 w-6 h-6 pointer-events-none ${
                      todo.completed ? "text-white" : "text-gray-400"
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    {todo.completed ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14"
                      />
                    )}
                  </svg>
                </div>
                <span className="line-through">{todo.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

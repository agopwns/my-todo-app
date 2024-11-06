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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo 앱</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">할 일 목록</h2>
        <ul className="space-y-2">
          {activeTodos.map((todo) => (
            <li key={todo.id} className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleComplete(todo.id)}
                className="mr-2"
              />
              <span>{todo.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">완료된 목록</h2>
        <ul className="space-y-2">
          {completedTodos.map((todo) => (
            <li key={todo.id} className="flex items-center text-gray-500">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleComplete(todo.id)}
                className="mr-2"
              />
              <span className="line-through">{todo.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

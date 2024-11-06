"use client";
import { useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([
    { id: 1, text: "리액트 공부하기", completed: false },
    { id: 2, text: "운동하기", completed: false },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTodoText, setNewTodoText] = useState("");

  const handleToggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      const newTodo = {
        id: todos.length + 1,
        text: newTodoText,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setNewTodoText("");
      setIsModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-2 items-center justify-center bg-gray-50 text-gray-900">
      <div className="container mx-auto p-4 max-w-md flex flex-col gap-2 items-end">
        <nav className=" container mx-auto p-4 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">Todo App</div>
            <div className="space-x-4 flex flex-row">
              <button
                onClick={() => (window.location.href = "/")}
                className="px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                홈
              </button>
              <button
                onClick={() => (window.location.href = "/dashboard")}
                className="px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                대시보드
              </button>
            </div>
          </div>
        </nav>
        <div className="container mx-auto p-4 max-w-md bg-white rounded-lg shadow-md">
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

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white shadow-lg hover:bg-blue-600 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-xl font-semibold mb-4">새로운 할 일 추가</h2>
            <form onSubmit={handleAddTodo}>
              <input
                type="text"
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                placeholder="할 일을 입력하세요"
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  추가
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

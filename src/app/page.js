"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import TodoSection from "@/components/TodoSection";
import FloatingButton from "@/components/FloatingButton";
import TodoModal from "@/components/TodoModal";

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
        <Navbar />
        <TodoSection
          todos={todos}
          handleToggleComplete={handleToggleComplete}
        />
        <FloatingButton onClick={() => setIsModalOpen(true)} />
      </div>

      <TodoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        newTodoText={newTodoText}
        setNewTodoText={setNewTodoText}
        handleAddTodo={handleAddTodo}
      />
    </div>
  );
}

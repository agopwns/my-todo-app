"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import TodoSection from "@/components/TodoSection";
import FloatingButton from "@/components/FloatingButton";
import TodoModal from "@/components/TodoModal";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTodoText, setNewTodoText] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: user, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
        return;
      }
      setUser(user);
    };
    getUser();
  }, []);

  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase.from("todos").select("*");
      if (error) {
        console.error("Error fetching todos:", error);
      } else {
        setTodos(data);
      }
    };

    fetchTodos();
  }, []);

  const handleToggleComplete = async (id) => {
    try {
      const todoToUpdate = todos.find((todo) => todo.id === id);

      const { data, error } = await supabase
        .from("todos")
        .update({ completed: !todoToUpdate.completed })
        .eq("id", id)
        .select();

      if (error) {
        console.error("Todo 업데이트 중 오류 발생:", error);
        return;
      }

      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    } catch (error) {
      console.error("Todo 업데이트 중 예외 발생:", error);
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      const newTodo = {
        text: newTodoText,
        completed: false,
        user_id: user.user.id,
      };

      const { data, error } = await supabase
        .from("todos")
        .insert([newTodo])
        .select();

      if (error) {
        console.error("Error inserting data:", error);
        return;
      }

      setTodos([...todos, ...data]);
      setNewTodoText("");
      setIsModalOpen(false);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const { error } = await supabase
        .from("todos")
        .delete()
        .eq("id", id)
        .eq("user_id", user.user.id);

      if (error) {
        console.error("Todo 삭제 중 오류 발생:", error);
        return;
      }

      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Todo 삭제 중 예외 발생:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-2 items-center justify-center bg-gray-50 text-gray-900">
      <div className="container mx-auto p-4 max-w-md flex flex-col gap-2 items-end">
        <Navbar />
        <TodoSection
          todos={todos}
          handleToggleComplete={handleToggleComplete}
          handleDeleteTodo={handleDeleteTodo}
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

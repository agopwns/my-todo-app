"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import TodoSection from "@/components/TodoSection";
import FloatingButton from "@/components/FloatingButton";
import TodoModal from "@/components/TodoModal";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  // todos 상태와 이를 업데이트하는 setTodos 함수를 생성
  // 초기값으로 2개의 할일 항목을 설정
  const [todos, setTodos] = useState([
    { id: 1, text: "리액트 공부하기", completed: false }, // 첫 번째 할일 항목
    { id: 2, text: "운동하기", completed: false }, // 두 번째 할일 항목
  ]);

  // 모달 창의 열림/닫힘 상태를 관리하는 상태 변수
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 새로운 할일 텍스트를 저장하는 상태 변수
  const [newTodoText, setNewTodoText] = useState("");

  // 할일 완료 상태를 토글하는 함수
  const handleToggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        // 선택된 할일의 id와 일치하면 completed 상태를 반전
        // 일치하지 않으면 기존 상태 유지
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      const newTodo = {
        id: todos.length + 1,
        text: newTodoText,
        completed: false,
      };

      // Supabase를 사용하여 todos 테이블에 데이터 삽입
      const { data, error } = await supabase.from("todos").insert([newTodo]);

      if (error) {
        console.error("Error inserting data:", error);
        return;
      }

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

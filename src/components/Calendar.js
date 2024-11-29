import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Calendar({ userId }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [todos, setTodos] = useState([]);
  const [todoDates, setTodoDates] = useState(new Set());

  useEffect(() => {
    fetchMonthTodos();
  }, [currentDate, userId]);

  const fetchMonthTodos = async () => {
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", userId)
      .gte("created_at", startOfMonth.toISOString())
      .lte("created_at", endOfMonth.toISOString());

    if (error) {
      console.error("할 일을 가져오는 중 오류 발생:", error);
      return;
    }

    const dates = new Set(
      data.map((todo) => new Date(todo.created_at).toDateString())
    );
    setTodoDates(dates);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // 이전 달의 날짜들을 채움
    for (let i = 0; i < firstDay.getDay(); i++) {
      const prevDate = new Date(year, month, -i);
      days.unshift({ date: prevDate, isCurrentMonth: false });
    }

    // 현재 달의 날짜들을 채움
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const currentDate = new Date(year, month, i);
      days.push({ date: currentDate, isCurrentMonth: true });
    }

    return days;
  };

  const handleDateClick = async (date) => {
    setSelectedDate(date);
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", userId)
      .gte("created_at", startOfDay.toISOString())
      .lte("created_at", endOfDay.toISOString());

    if (error) {
      console.error("할 일을 가져오는 중 오류 발생:", error);
      return;
    }

    setTodos(data);
  };

  const changeMonth = (offset) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1)
    );
    setSelectedDate(null);
    setTodos([]);
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => changeMonth(-1)}
            className="px-3 py-1 bg-gray-100 rounded"
          >
            이전
          </button>
          <button
            onClick={() => changeMonth(1)}
            className="px-3 py-1 bg-gray-100 rounded"
          >
            다음
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day) => (
          <div key={day} className="text-center py-2 font-semibold">
            {day}
          </div>
        ))}

        {days.map(({ date, isCurrentMonth }, index) => (
          <div
            key={index}
            onClick={() => handleDateClick(date)}
            className={`
              p-2 text-center cursor-pointer relative
              ${isCurrentMonth ? "hover:bg-gray-100" : "text-gray-400"}
              ${
                selectedDate?.toDateString() === date.toDateString()
                  ? "bg-blue-100"
                  : ""
              }
            `}
          >
            {date.getDate()}
            {todoDates.has(date.toDateString()) && (
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedDate && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">
            {selectedDate.toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            의 할 일
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-2">진행중</h4>
              <ul className="space-y-1">
                {todos
                  .filter((todo) => !todo.completed)
                  .map((todo) => (
                    <li key={todo.id} className="text-sm">
                      {todo.text}
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-2">완료됨</h4>
              <ul className="space-y-1">
                {todos
                  .filter((todo) => todo.completed)
                  .map((todo) => (
                    <li
                      key={todo.id}
                      className="text-sm line-through text-gray-500"
                    >
                      {todo.text}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
  });
  const [monthlyStats, setMonthlyStats] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error || !user) {
        router.push("/signin");
        return;
      }
      setUser(user);
      fetchStats(user.id);
      fetchMonthlyStats(user.id);
    };

    getUser();
  }, [router]);

  const fetchStats = async (userId) => {
    try {
      const { data: todos, error } = await supabase
        .from("todos")
        .select("*")
        .eq("user_id", userId);

      if (error) throw error;

      const completed = todos.filter((todo) => todo.completed).length;
      setStats({
        total: todos.length,
        completed: completed,
        pending: todos.length - completed,
      });
    } catch (error) {
      console.error("통계를 가져오는 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMonthlyStats = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("monthly_todo_stats")
        .select("*")
        .eq("user_id", userId)
        .order("month", { ascending: false })
        .limit(6);

      if (error) throw error;
      setMonthlyStats(data);
    } catch (error) {
      console.error("월별 통계를 가져오는 중 오류 발생:", error);
    }
  };

  if (loading) {
    return <div className="text-center">로딩 중...</div>;
  }

  return (
    <div className="space-y-6 text-black">
      <h1 className="text-3xl font-bold">대시보드</h1>

      <div className="bg-white p-6 rounded-lg shadow flex flex-row items-center gap-4">
        <h2 className="text-xl font-semibold">사용자 정보</h2>
        <p className="text-gray-600">이메일: {user?.email}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">전체 할 일</h2>
          <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">완료된 할 일</h2>
          <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">진행중인 할 일</h2>
          <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">월별 통계</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">월</th>
                <th className="text-right py-2">전체</th>
                <th className="text-right py-2">완료</th>
                <th className="text-right py-2">진행중</th>
              </tr>
            </thead>
            <tbody>
              {monthlyStats.map((stat) => (
                <tr key={stat.month} className="border-b">
                  <td className="py-2">
                    {new Date(stat.month).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "long",
                    })}
                  </td>
                  <td className="text-right py-2">{stat.total_todos}</td>
                  <td className="text-right py-2 text-green-600">
                    {stat.completed_todos}
                  </td>
                  <td className="text-right py-2 text-yellow-600">
                    {stat.pending_todos}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

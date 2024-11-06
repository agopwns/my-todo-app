import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient"; // supabase 클라이언트 import

export default function Navbar() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // 현재 세션 가져오기
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // 세션 변경 구독
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // 클린업 함수
    return () => subscription.unsubscribe();
  }, []);

  // 로그아웃 처리 함수
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      window.location.href = "/";
    } catch (error) {
      console.error("로그아웃 에러:", error.message);
    }
  };

  return (
    <nav className="container mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold">
          <button
            onClick={() => (window.location.href = "/")}
            className="px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            Todo App
          </button>
        </div>
        <div className="flex flex-row text-sm">
          {!session ? (
            <>
              <button
                onClick={() => (window.location.href = "/signup")}
                className="px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                회원가입
              </button>
              <button
                onClick={() => (window.location.href = "/signin")}
                className="px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                로그인
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => (window.location.href = "/dashboard")}
                className="px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                대시보드
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                로그아웃
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

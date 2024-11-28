import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient"; // supabase 클라이언트 import
import Link from "next/link"; // Link 컴포넌트 import 추가

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
    <nav className="container mx-auto p-4 bg-white rounded-lg shadow-md text-black">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold">
          <Link
            href="/"
            className="px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            Todo App
          </Link>
        </div>
        <div className="flex flex-row text-sm">
          {!session ? (
            <>
              <Link
                href="/signup"
                className="px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                회원가입
              </Link>
              <Link
                href="/signin"
                className="px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                로그인
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/dashboard"
                className="px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                대시보드
              </Link>
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

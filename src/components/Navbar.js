export default function Navbar() {
  return (
    <nav className="container mx-auto p-4 bg-white rounded-lg shadow-md">
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
  );
}

export default function FloatingButton({ onClick }) {
  return (
    <button
      onClick={onClick}
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
  );
}

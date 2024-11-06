export default function TodoSection({ todos, handleToggleComplete }) {
  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="container mx-auto p-4 max-w-md bg-white rounded-lg shadow-md">
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">할 일 목록</h2>
        <TodoList
          todos={activeTodos}
          handleToggleComplete={handleToggleComplete}
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">완료된 목록</h2>
        <TodoList
          todos={completedTodos}
          handleToggleComplete={handleToggleComplete}
          isCompleted={true}
        />
      </div>
    </div>
  );
}

function TodoList({ todos, handleToggleComplete, isCompleted = false }) {
  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleToggleComplete={handleToggleComplete}
          isCompleted={isCompleted}
        />
      ))}
    </ul>
  );
}

function TodoItem({ todo, handleToggleComplete, isCompleted }) {
  return (
    <li
      className={`flex items-center gap-2 ${
        isCompleted ? "text-gray-500" : ""
      }`}
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
          ) : null}
        </svg>
      </div>
      <span className={isCompleted ? "line-through" : ""}>{todo.text}</span>
    </li>
  );
}

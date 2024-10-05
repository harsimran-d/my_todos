import CreateTodo from "./createtodo";
import TodoList from "./TodoList";

export default function Todos({
  initialTodos,
}: {
  initialTodos: { id: string; title: string; completed: boolean }[];
}) {
  return (
    <div className="m-auto flex w-80 flex-col items-start justify-start">
      <CreateTodo />
      <TodoList todos={initialTodos} />
    </div>
  );
}

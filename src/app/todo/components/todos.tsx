import CreateTodo from "./createtodo";
import TodoList from "./TodoList";

export default function Todos({
  initialTodos,
}: {
  initialTodos: { id: string; title: string; completed: boolean }[];
}) {
  return (
    <div>
      <CreateTodo />
      <TodoList todos={initialTodos} />
    </div>
  );
}

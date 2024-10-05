"use client";

import { todosAtom } from "@/atoms/todos";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import TodoItem from "./TodoItem";

export default function TodoList({ todos }: { todos: Todo[] }) {
  const [clientTodos, setClientTodos] = useRecoilState(todosAtom);
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    setClientTodos(todos);
    setIsInitialRender(false);
  }, [todos, setClientTodos]);

  return (
    <div>
      {isInitialRender ? (
        todos.length > 0 ? (
          todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        ) : (
          <p>No todos available</p>
        )
      ) : clientTodos.length > 0 ? (
        clientTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      ) : (
        <p>No todos available</p>
      )}
    </div>
  );
}

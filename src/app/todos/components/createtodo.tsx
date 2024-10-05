"use client";

import { addTodo } from "@/actions/todo/actions";
import { todosAtom } from "@/atoms/todos";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useSetRecoilState } from "recoil";

export default function CreateTodo() {
  const setTodos = useSetRecoilState(todosAtom);
  const [todo, setTodo] = useState("");
  const session = useSession();
  const _addTodo = async (todo: string) => {
    if (!todo) return;
    if (!session.data?.user) {
      console.error("User not found");
      return;
    }
    const userId = (session.data.user as { id: string }).id;

    const newTodo = await addTodo(todo);
    console.log(newTodo);
    setTodos((prevTodos) =>
      [...prevTodos, newTodo].sort((a, b) => (a.completed ? 1 : -1)),
    );
    setTodo("");
  };
  return (
    <div className="flex space-x-2">
      <input
        className="rounded-lg border-2 border-black p-2"
        placeholder="Add todo"
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
      />
      <button
        className="rounded-lg bg-blue-500 px-6 text-white disabled:bg-gray-300"
        onClick={() => {
          _addTodo(todo);
          setTodo("");
        }}
        disabled={todo.length === 0}
      >
        Add
      </button>
    </div>
  );
}

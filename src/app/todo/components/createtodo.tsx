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
    <>
      <input
        placeholder="Add todo"
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
      />
      <button
        onClick={() => {
          _addTodo(todo);
          setTodo("");
        }}
      >
        Add
      </button>
    </>
  );
}

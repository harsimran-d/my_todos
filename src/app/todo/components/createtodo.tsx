"use client";

import { addTodo } from "@/actions/todo/actions";
import { todosAtom } from "@/atoms/todos";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useSetRecoilState } from "recoil";

export default function CreateTodo() {
  const setTodos = useSetRecoilState(todosAtom);
  const [todo, setTodo] = useState("");
  const session = useSession();
  const _addTodo = async (todo: string) => {
    if (!todo) return;
    // read the user id from the context and pass it to the addTodo function
    // if user not found return and show error
    // redirect to login page
    console.log(session);
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
      <button onClick={() => signOut()}>Sign Out</button>
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

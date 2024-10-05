"use client";
import { deleteTodo, isCompleted, updateTitle } from "@/actions/todo/actions";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { todosAtom } from "@/atoms/todos";

export default function TodoItem({ todo }: { todo: Todo }) {
  const [clientTodos, setClientTodos] = useRecoilState(todosAtom);
  const [checked, setChecked] = useState(todo.completed);
  console.log();
  function TodoActioButton() {
    function _delTodo(): void {
      deleteTodo(todo.id);
      setClientTodos((prevTodos) => {
        console.log("prev client todos were " + JSON.stringify(prevTodos));
        return prevTodos.filter((mytodo) => mytodo.id !== todo.id);
      });
    }
    function isComplete() {
      setChecked(!checked);
      isCompleted(todo.id, !checked);
      setClientTodos((prevTodos) => {
        return prevTodos
          .map((mytodo) => {
            if (mytodo.id === todo.id) {
              return { ...mytodo, completed: !checked };
            }
            return mytodo;
          })
          .sort((a, b) => {
            return a.completed ? 1 : -1;
          });
      });

      console.log(clientTodos);
    }
    return (
      <div className="flex items-center space-x-2">
        {checked ? (
          <input type="checkbox" checked={checked} onChange={isComplete} />
        ) : (
          <input type="checkbox" checked={checked} onChange={isComplete} />
        )}

        <TrashIcon onClick={_delTodo} className="h-5 w-5" />
      </div>
    );
  }

  function TodoTitle({ title }: { title: string }) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [titleState, setTitleState] = useState(title);
    function _pencilClicked() {
      setIsUpdating((isUpdating) => !isUpdating);
    }
    function _submit(key: string) {
      if (key == "Enter") {
        if (title != titleState) {
          updateTitle(todo.id, titleState);
        }
        setIsUpdating(false);
      }
    }
    return (
      <div className="flex">
        <button className="pr-2" onClick={_pencilClicked}>
          <PencilSquareIcon className="h-5 w-5 items-center" />
        </button>
        {isUpdating ? (
          <input
            autoFocus
            value={titleState}
            onChange={(e) => setTitleState(e.target.value)}
            onBlur={() => {
              _submit("Enter");
            }}
            onKeyDown={(key) => _submit(key.code)}
          ></input>
        ) : (
          <span
            className="flex items-start"
            onClick={() => setIsUpdating(true)}
          >
            {titleState}
          </span>
        )}
      </div>
    );
  }
  return (
    <div className="my-4 flex items-center justify-start space-x-3">
      <TodoActioButton />
      <TodoTitle title={todo.title} />
    </div>
  );
}

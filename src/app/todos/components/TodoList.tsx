"use client";
import { deleteTodo, isCompleted, updateTitle } from "@/actions/todo/actions";
import { todosAtom } from "@/atoms/todos";

import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

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

function TodoItem({ todo }: { todo: Todo }) {
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
      // make sure to add the updated todo according to completed status
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
    // useEffect(() => {
    //   if (title != titleState) {
    //     console.log("should update title on backend here ");
    //   }
    // }, [isUpdating]);
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

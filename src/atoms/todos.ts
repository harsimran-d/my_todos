import { atom } from "recoil";

export const todosAtom = atom<Todo[]>({
  key: "todosAtom",
  default: [],
});

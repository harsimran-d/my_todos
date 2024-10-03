import { getTodos } from "@/actions/todo/actions";
import Todos from "./components/todos";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function TodosPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }
  const todos = await getTodos(session.user.id);
  return (
    <div className="m-auto w-8/12">
      <Todos initialTodos={todos} />
    </div>
  );
}

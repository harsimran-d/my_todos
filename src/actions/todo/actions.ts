"use server";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

export async function getTodos(id: string) {
  try {
    return await prisma.todo.findMany({
      where: {
        userId: id,
      },
      orderBy: {
        completed: "asc",
      },
    });
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
}

export async function addTodo(title: string): Promise<Todo> {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("User not found");
  }
  const userId = (session.user as { id: string }).id;
  return await prisma.todo.create({
    data: { title: title, completed: false, userId: userId },
  });
}

export async function updateTitle(id: string, title: string) {
  await prisma.todo.update({
    where: { id: id },
    data: {
      title: title,
    },
  });
}

export async function deleteTodo(id: string) {
  console.log("trying to delete " + id);
  await prisma.todo.delete({
    where: {
      id: id,
    },
  });
}

export async function isCompleted(id: string, done: boolean) {
  console.log(`${id} is marked completed ${done}`);
  await prisma.todo.update({
    where: {
      id: id,
    },
    data: {
      completed: done,
    },
  });
}

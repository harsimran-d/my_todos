"use server";
import bcrypt from "bcrypt";
import prisma from "@/lib/db";

export async function signUp(username: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
      },
    });

    return true;
  } catch (error) {
    console.error("Error creating user:", error);
    return false;
  }
}

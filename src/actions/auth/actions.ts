"use server";
import bcrypt from "bcrypt";
import prisma from "@/lib/db";

export async function signUp(
  username: string,
  password: string,
): Promise<{ success: boolean; message: string }> {
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
      },
    });

    return { success: true, message: "Signup Successful" };
  } catch (error) {
    return { success: false, message: "Error Creating Account" };
  }
}

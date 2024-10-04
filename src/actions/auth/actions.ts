"use server";
import bcrypt from "bcrypt";
import prisma from "@/lib/db";
import { SignupSchema } from "@/zod/SignupSchema";

export async function signUp(
  username: string,
  password: string,
): Promise<{ success: boolean; message: string }> {
  const result = SignupSchema.safeParse({
    username,
    password,
  });

  if (!result.success) {
    return {
      success: result.success,
      message: result.error.format()._errors.toString(),
    };
  }
  const hashedPassword = await bcrypt.hash(result.data.password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        username: result.data.username,
        password: hashedPassword,
      },
    });

    return { success: true, message: "Signup Successful" };
  } catch (error) {
    return { success: false, message: "Error Creating Account" };
  }
}

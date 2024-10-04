import { z } from "zod";

export const SignupSchema = z.object({
  username: z
    .string()
    .min(4, "Min 4 characters needed")
    .max(15, "Only 15 characters allowed")
    .regex(/^[a-zA-Z][a-zA-Z0-9_]+/, {
      message: "Username should only contain letters, numbers, and _",
    }),
  password: z
    .string()
    .min(8, "Password should be atleast 8 characters")
    .max(32, "Password should be max 32 characters"),
});

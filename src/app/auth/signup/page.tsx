"use client";

import { signUp } from "@/actions/auth/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SignupSchema } from "@/zod/SignupSchema";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();
  const _signup = async () => {
    setErrorMessage({ username: "", password: "", confirmPassword: "" });
    if (password != confirmPassword) {
      setErrorMessage({
        username: "",
        password: "",
        confirmPassword: "Passwords do not match",
      });
      return;
    }
    const result = SignupSchema.safeParse({
      username,
      password,
    });

    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;

      setErrorMessage({
        username: fieldErrors.username?.join(",") || "",
        password: fieldErrors.password?.join(",") || "",
        confirmPassword: "",
      });
      return;
    }
    const response = await signUp(result.data.username, result.data.password);

    if (response.success) {
      router.push("/auth/signin");
    } else {
      setErrorMessage({
        username: "",
        password: "",
        confirmPassword: response.message,
      });
    }
  };
  return (
    <div className="m-auto flex w-48 flex-col justify-center space-y-2 align-middle">
      <h1 className="text-center text-2xl font-bold">Signup</h1>

      <input
        className="rounded-md border-2 border-black px-2 py-1 text-xl"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      {errorMessage.username != "" ? (
        <span className="text-red-500">{errorMessage.username}</span>
      ) : (
        ""
      )}
      <input
        className="rounded-md border-2 border-black px-2 py-1 text-xl"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {errorMessage.password != "" ? (
        <span className="text-red-500">{errorMessage.password}</span>
      ) : (
        ""
      )}
      <input
        className="rounded-md border-2 border-black px-2 py-1 text-xl"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
      />
      {errorMessage.confirmPassword != "" ? (
        <span className="text-red-500">{errorMessage.confirmPassword}</span>
      ) : (
        ""
      )}
      <button onClick={_signup} className="rounded-lg bg-black py-2 text-white">
        Signup
      </button>
    </div>
  );
}

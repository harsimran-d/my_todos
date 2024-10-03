"use client";

import { signUp } from "@/actions/auth/actions";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const _signup = async () => {
    setError("");
    if (password != confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const response = await signUp(username, password);

    if (response.success) {
      router.push("/auth/signin");
    } else {
      setError(response.message);
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
      <input
        className="rounded-md border-2 border-black px-2 py-1 text-xl"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input
        className="rounded-md border-2 border-black px-2 py-1 text-xl"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
      />
      {error != "" ? <span className="text-red-500">{error}</span> : ""}
      <button onClick={_signup} className="rounded-lg bg-black py-2 text-white">
        Signup
      </button>
    </div>
  );
}

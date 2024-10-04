"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function () {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  function handleInputChange() {
    setError("");
  }
  async function handleSubmit(e: any) {
    e.preventDefault();
    const result = await signIn("credentials", {
      username: username,
      password: password,
      redirect: false,
    });
    if (result?.ok) {
      router.push(callbackUrl);
    } else {
      setError("Sign-in failed. Please try again.");
    }
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="m-auto flex w-64 flex-col space-y-2"
      >
        <h1 className="text-center text-2xl font-bold">Sign In</h1>
        <input
          className="rounded-lg border-2 border-black p-2 text-xl"
          type="text"
          required
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            handleInputChange();
          }}
        />
        <input
          className="rounded-lg border-2 border-black p-2 text-xl"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            handleInputChange();
          }}
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="rounded-lg border-2 border-black bg-black p-2 text-xl text-white"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

"use client";

import { signUp } from "@/actions/auth/actions";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const _signup = async () => {
    const success = await signUp(username, password);

    if (success) {
      // navigate to login page
      signIn();
    }
  };
  return (
    <div>
      <h1>Signup</h1>

      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Username"
      />
      <button onClick={_signup}>Signup</button>
    </div>
  );
}

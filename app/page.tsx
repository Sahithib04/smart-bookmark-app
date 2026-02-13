"use client";

import { supabase } from "@/lib/supabase";

export default function Home() {
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/dashboard",
      },
    });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <button
        onClick={handleLogin}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg"
      >
        Sign in with Google
      </button>
    </div>
  );
}


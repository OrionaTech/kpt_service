"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const resp = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await resp.json();

      setLoading(false);

      if (!resp.ok) {
        setError(data?.error || "Login failed");
        return;
      }

      // ✅ Respect redirect param
      const redirect =
        new URLSearchParams(window.location.search).get("redirect") || "/admin";

      // Force reload so proxy sees cookies set by the server
      window.location.href = redirect;
    } catch (err: any) {
      setLoading(false);
      setError(err?.message ?? String(err));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow text-gray-700">
        <h1 className="text-xl font-semibold mb-4">Admin Login</h1>

        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-3"
        />

        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4"
        />

        {error && (
          <p className="text-sm text-red-500 mb-3">{error}</p>
        )}

        <Button onClick={handleLogin} disabled={loading} className="w-full">
          {loading ? "Signing in..." : "Login"}
        </Button>
      </div>
    </div>
  );
}

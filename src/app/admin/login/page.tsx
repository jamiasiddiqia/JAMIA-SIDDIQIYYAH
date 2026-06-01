"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Shield, Key, Mail, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Redirect to dashboard if session already active
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push("/admin/dashboard");
      }
    };
    checkSession();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      // Authentication error – provide a clearer, user‑friendly message
      if (authError) {
        // Supabase returns generic messages; map common cases
        const authMsg = authError.message?.includes('Invalid login credentials')
          ? 'Invalid email or password.'
          : authError.message;
        setError(authMsg);
        setLoading(false);
        return;
      }

      // Verify user profile role is allowed (super_admin, admin, editor)
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user?.id)
        .single();

      // Profile or role errors – inform the user they lack admin access
      if (profileError || !profile || !["super_admin", "admin", "editor"].includes(profile.role)) {
        await supabase.auth.signOut();
        setError('Your account does not have admin access.');
        setLoading(false);
        return;
      }

      setMessage('Authentication successful! Redirecting...');
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 1000);
    } catch (err: any) {
      setError(err?.message || 'An unexpected authentication error occurred.');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background-warm flex items-center justify-center p-6 relative overflow-hidden">
      <div className="islamic-pattern absolute inset-0 opacity-10"></div>
      
      <div className="w-full max-w-md bg-white border border-primary/10 rounded-2xl shadow-xl overflow-hidden relative z-10 p-8 space-y-8">
        {/* Header Icon */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-primary/5 border border-primary/10 rounded-full flex items-center justify-center text-primary mx-auto">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="font-display text-2xl font-extrabold text-primary italic">
            Jamia Siddiqiyyah
          </h1>
          <p className="text-[10px] text-secondary font-bold tracking-widest uppercase">
            Admin Panel Authentication
          </p>
        </div>

        {/* Message Notifications */}
        {error && (
          <div className="p-4 bg-error-container text-on-error-container rounded-xl text-xs font-semibold leading-relaxed border border-error/10">
            {error}
          </div>
        )}
        {message && (
          <div className="p-4 bg-primary/5 text-primary rounded-xl text-xs font-semibold leading-relaxed border border-primary/10">
            {message}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] text-on-surface-variant font-bold tracking-wider uppercase block">
              Administrative Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-4 h-4 text-on-surface-variant/40" />
              <input
                type="email"
                required
                placeholder="admin@siddiqiyyah.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-background-warm border border-primary/5 rounded-xl text-sm font-medium focus:outline-none focus:border-primary/30 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-on-surface-variant font-bold tracking-wider uppercase block">
              Secure Credentials
            </label>
            <div className="relative">
              <Key className="absolute left-4 top-3.5 w-4 h-4 text-on-surface-variant/40" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-background-warm border border-primary/5 rounded-xl text-sm font-medium focus:outline-none focus:border-primary/30 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-opacity-95 transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Authenticating...
              </>
            ) : (
              "Sign In to Portal"
            )}
          </button>
        </form>

        <div className="text-center pt-2">
          <a
            href="/"
            className="text-[10px] text-on-surface-variant/60 hover:text-primary font-bold uppercase tracking-wider transition-colors"
          >
            ← Return to public website
          </a>
        </div>
      </div>
    </main>
  );
}

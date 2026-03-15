"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GraduationCap, Mail, Lock, ArrowRight } from "lucide-react";
import { Button, Input, Card } from "@/components/ui";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary-50/20 flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-button group-hover:shadow-button-hover transition-shadow">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">UpSkill</span>
            </Link>
          </div>

          <Card className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-slate-900 mb-2">
                Welcome back
              </h1>
              <p className="text-slate-500">
                Sign in to continue your learning
              </p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl mb-4 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                label="Email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-5 h-5" />}
                required
              />

              <Input
                type="password"
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock className="w-5 h-5" />}
                required
              />

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                isLoading={loading}
              >
                Sign In
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-slate-500">
                Don't have an account?{" "}
                <Link href="/register" className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                  Sign up
                </Link>
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary-500 to-primary-600 items-center justify-center p-12">
        <div className="text-center text-white max-w-md">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Continue Your Journey
          </h2>
          <p className="text-primary-100 text-lg">
            Sign in to access your courses, track your progress, and continue building essential soft skills.
          </p>
        </div>
      </div>
    </div>
  );
}

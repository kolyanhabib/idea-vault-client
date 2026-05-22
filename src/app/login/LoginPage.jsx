"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { GrGoogle } from "react-icons/gr";
import toast from "react-hot-toast";
import { useState } from "react";
import { Lightbulb } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);

  // default route "/"
  const redirect = searchParams.get("redirect") || "/";

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      toast.error(error.message || "Login failed");
      setLoading(false);
      return;
    }

    toast.success("Welcome back 🎉");

    // redirect after login
    router.push(redirect);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-linear-to-br from-slate-100 via-white to-violet-100 dark:from-slate-950 dark:via-slate-900 dark:to-violet-950 px-4 py-10">
      <Card className="w-full max-w-md border border-slate-200/70 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.45)] rounded-3xl p-6 sm:p-8">
        {/* Top */}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 dark:bg-violet-950/40 mb-5">
            <Lightbulb className="text-2xl text-violet-700 dark:text-violet-400" />
          </div>

          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Welcome Back
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Sign in to continue to your account
          </p>
        </div>

        {/* Form */}
        <Form className="mt-6 flex flex-col gap-5" onSubmit={onSubmit}>
          <TextField name="email" type="email" isRequired>
            <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Email Address
            </Label>

            <Input className="h-12 mt-2" placeholder="john@example.com" />

            <FieldError />
          </TextField>

          <TextField name="password" type="password" isRequired>
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Password
              </Label>
            </div>

            <Input className="h-12 mt-2" placeholder="Enter your password" />
            <a
              href="/forgot-password"
              className="text-xs font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 pt-2"
            >
              Forgot Password?
            </a>

            <FieldError />
          </TextField>

          <Button
            type="submit"
            isDisabled={loading}
            className="w-full h-12 rounded-xl text-base font-semibold bg-violet-600 hover:bg-violet-700 text-white transition-all duration-300 shadow-lg shadow-violet-500/20 mt-2"
          >
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </Form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-7">
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>

          <span className="text-xs font-medium tracking-wide text-slate-400">
            OR CONTINUE WITH
          </span>

          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
        </div>

        {/* Google */}
        <Button
          onClick={() =>
            authClient.signIn.social({
              provider: "google",
              callbackURL: redirect,
            })
          }
          variant="bordered"
          className="w-full h-12 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 text-slate-700 dark:text-slate-200 font-medium"
        >
          <GrGoogle className="text-lg" />
          Continue with Google
        </Button>

        {/* Bottom */}
        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-7">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-400"
          >
            Sign Up
          </a>
        </p>
      </Card>
    </div>
  );
}

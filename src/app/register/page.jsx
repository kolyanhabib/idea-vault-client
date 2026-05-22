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
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import { GrGoogle } from "react-icons/gr";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const name = e.target.name.value;
    const image = e.target.image.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      image,
    });

    if (error) {
      toast.error(error.message || "Signup failed");
      setLoading(false);
      return;
    }

    await authClient.signOut();
    toast.success("Account created. Please sign in.");

    router.push("/login");
  };

  return (
  <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-linear-to-br from-slate-100 via-white to-violet-100 dark:from-slate-950 dark:via-slate-900 dark:to-violet-950 px-4 py-10">
  <Card className="w-full max-w-md rounded-3xl border border-slate-200/70 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
  
    <div className="text-center">
     

      <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
        Create Account
      </h2>

      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Get started in seconds
      </p>
    </div>

    {/* Google Button */}
    <Button
      onClick={() =>
        authClient.signIn.social({
          provider: "google",
          callbackURL: "/",
        })
      }
      variant="bordered"
      className="w-full h-12 mt-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium transition-all duration-300"
    >
      <GrGoogle className="text-lg" />
      Continue with Google
    </Button>

    {/* Divider */}
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>

      <span className="text-xs font-medium tracking-wide text-slate-400">
        OR SIGN UP WITH EMAIL
      </span>

      <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
    </div>

    {/* Form */}
    <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <TextField name="name" isRequired>
        <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Full Name
        </Label>

        <Input
          className="h-12 mt-2"
          placeholder="John Doe"
        />

        <FieldError />
      </TextField>

      <TextField name="image" isRequired>
        <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Profile Image URL
        </Label>

        <Input
          className="h-12 mt-2"
          placeholder="https://example.com/avatar.jpg"
        />

        <FieldError />
      </TextField>

      <TextField name="email" type="email" isRequired>
        <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Email Address
        </Label>

        <Input
          className="h-12 mt-2"
          placeholder="john@example.com"
        />

        <FieldError />
      </TextField>

      <TextField name="password" type="password" isRequired>
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Password
          </Label>

          <span className="text-xs text-slate-400">
            Min 8 characters
          </span>
        </div>

        <Input
          className="h-12 mt-2"
          placeholder="Enter your password"
        />

        <FieldError />
      </TextField>

      <Button
        type="submit"
        isDisabled={loading}
        className="w-full h-12 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-base font-semibold shadow-lg shadow-violet-500/20 transition-all duration-300 mt-2"
      >
        {loading ? "Creating..." : "Create Account"}
      </Button>
    </Form>

    {/* Footer */}
    <p className="mt-7 text-center text-sm text-slate-500 dark:text-slate-400">
      Already have an account?{" "}
      <a
        href="/login"
        className="font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-400"
      >
        Sign In
      </a>
    </p>
  </Card>
</div>
  );
}

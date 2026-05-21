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
    <div className="px-3">
      <Card className="max-w-md mx-auto mt-16 mb-16 p-8 rounded-2xl shadow-lg border">
        <h2 className="text-2xl font-semibold text-center mb-1">
          Welcome Back
        </h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          Sign in to your account
        </p>

        <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
          <TextField name="email" type="email" isRequired>
            <Label>Email</Label>
            <Input className="h-11" placeholder="john@example.com" />
            <FieldError />
          </TextField>

          <TextField name="password" type="password" isRequired>
            <Label>Password</Label>
            <Input className="h-11" placeholder="••••••••" />
            <FieldError />
          </TextField>

          <Button
            type="submit"
            isDisabled={loading}
            className="w-full h-11 text-base font-medium mt-2"
          >
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </Form>

        <div className="flex items-center my-5">
          <div className="flex-1 h-px bg-gray-200"></div>

          <span className="px-3 text-sm text-gray-400">OR</span>

          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        <Button
          onClick={() =>
            authClient.signIn.social({
              provider: "google",
              callbackURL: redirect,
            })
          }
          variant="outline"
          className="w-full h-11"
        >
          <GrGoogle />
          Continue with Google
        </Button>

        <p className="text-center text-sm mt-6 text-gray-500">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 font-medium">
            Sign Up
          </a>
        </p>
      </Card>
    </div>
  );
}

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
    <div className="px-3">
      <Card className="max-w-md mx-auto mt-16 mb-16 p-8 rounded-2xl shadow-lg border">
        <h2 className="text-2xl font-semibold text-center mb-1">
          Create Account
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Get started in seconds
        </p>

        <Button
          onClick={() =>
            authClient.signIn.social({
              provider: "google",
              callbackURL: "/",
            })
          }
          variant="outline"
          className="w-full h-11"
        >
          <GrGoogle /> Continue with Google
        </Button>

        <div className="flex items-center my-5">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        
        <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
          <TextField name="name" isRequired>
            <Label>Name</Label>
            <Input className="h-11" placeholder="Your name" />
            <FieldError />
          </TextField>

          <TextField name="image" isRequired>
            <Label>Image URL</Label>
            <Input className="h-11" placeholder="Profile image link" />
            <FieldError />
          </TextField>

          <TextField name="email" type="email" isRequired>
            <Label>Email</Label>
            <Input className="h-11" placeholder="john@example.com" />
            <FieldError />
          </TextField>

          <TextField name="password" type="password" isRequired>
            <Label>Password</Label>
            <Input className="h-11" placeholder="Enter your password" />
            <FieldError />
          </TextField>

          <Button
            type="submit"
            isDisabled={loading}
            className="w-full h-11 text-base font-medium mt-2"
          >
            {loading ? "Creating..." : "Sign Up"}
          </Button>
        </Form>

        <p className="text-center text-sm mt-6 text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-medium">
            Sign In
          </a>
        </p>
      </Card>
    </div>
  );
}

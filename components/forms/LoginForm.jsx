"use client";

// third party
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

// api
import { loginUser } from "@/supabase/authApi";

// components and icons
import { PiSpinnerBold } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginForm = () => {
  // 1. Initialize the useForm hook and get form methods and state
  const { register, handleSubmit, formState, setError, reset } = useForm({
    defaultValues: {
      email: "dev@email.com",
      password: "developer",
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // function to log user in
  async function onSubmit(data) {
    setIsSubmitting(true);
    try {
      await loginUser({
        email: data.email,
        password: data.password,
      });

      // prefetch the account page
      router.prefetch("/account");

      toast.success("Logged in successfully");
      reset();
      router.push("/account");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      reset();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Log into your account</CardTitle>
        <CardDescription>
          Enter your email and password below to log in
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* email */}
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-[14px] ">
              Email
            </Label>
            <Input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format",
                },
              })}
              type="email"
              id="email"
              placeholder="m@example.com"
              className="h-14 text-base placeholder:text-gray-400"
            />
            {/* Show validation error message */}
            {formState.errors.email && (
              <span className="mt-1 text-sm text-red-600">
                {formState.errors.email.message}
              </span>
            )}
          </div>
          {/* password */}
          <div className="grid gap-2">
            <Label htmlFor="password" className="text-[14px]">
              Password
            </Label>
            <Input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must have at least 6 characters",
                },
              })}
              type="password"
              id="password"
              placeholder="enter your password"
              className="h-14 text-base tracking-widest placeholder:tracking-normal placeholder:text-gray-400"
            />
            {/* Show validation error message */}
            {formState.errors.password && (
              <span className="mt-1 text-sm text-red-600">
                {formState.errors.password.message}
              </span>
            )}
          </div>
          {/* Log in btn */}
          <Button disabled={isSubmitting} type="submit" className="mt-8 w-full">
            {isSubmitting ? (
              <>
                <PiSpinnerBold className="animate-spin" />
                <span className="ml-2">Logging in...</span>
              </>
            ) : (
              "Log in"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;

"use client";
import { useForm } from "react-hook-form";

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

const LoginForm = ({title, description}) => {
  // 1. Initialize the useForm hook and get form methods and state
  const { register, handleSubmit, formState, setError, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data); // You can handle the form data here
  };

  return (
    <div className="flex h-full items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {/* email */}
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-base font-semibold">
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
            <Label htmlFor="password" className="text-base font-semibold">
              Password
            </Label>
            <Input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password must have at least 4 characters",
                },
              })}
              type="password"
              id="password"
              placeholder="create password"
              className="h-14 text-base placeholder:text-gray-400"
            />
            {/* Show validation error message */}
            {formState.errors.password && (
              <span className="mt-1 text-sm text-red-600">
                {formState.errors.password.message}
              </span>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit(onSubmit)} className="w-full">
            Create account
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginForm;

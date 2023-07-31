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

const SignUp = () => {
  // 1. Initialize the useForm hook and get form methods and state
  const { register, handleSubmit, formState, setError, reset } = useForm({
    defaultValues: {
      email: "dev@email.com",
      password: "developer",
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // function to create/sign up a user in
  async function onSubmit(data) {}

  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create a new user</CardTitle>
        <CardDescription>
          Fill in the form below to create a new user
        </CardDescription>
      </CardHeader>
      <CardContent >
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" >
          {/* full name */}
          <div className="grid grid-cols-3 items-center gap-2">
            <Label htmlFor="fullname" className="text-base font-semibold ">
              Full Name
            </Label>
            <Input
              {...register("fullname", {
                required: "Fullname is required",
                pattern: {
                  value: /^[a-zA-Z]+ [a-zA-Z]+$/,
                  message: "Please enter your first and last name",
                },
              })}
              type="fullname"
              id="fullname"
              placeholder="John Snow"
              className="h-14 text-base placeholder:text-gray-400 col-span-2"
            />
            {/* Show validation error message */}
            {formState.errors.fullname && (
              <span className="mt-1 text-sm text-red-600">
                {formState.errors.fullname.message}
              </span>
            )}
          </div>

          {/* email */}
          <div className="grid grid-cols-3 items-center gap-2">
            <Label htmlFor="email" className="text-base font-semibold ">
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
              className="h-14 text-base placeholder:text-gray-400 col-span-2"
            />
            {/* Show validation error message */}
            {formState.errors.email && (
              <span className="mt-1 text-sm text-red-600">
                {formState.errors.email.message}
              </span>
            )}
          </div>

          {/* password */}
          <div className="grid grid-cols-3 items-center gap-2">
            <Label htmlFor="password" className="text-base font-semibold">
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
              className="h-14 text-base tracking-widest placeholder:tracking-normal placeholder:text-gray-400 col-span-2"
            />
            {/* Show validation error message */}
            {formState.errors.password && (
              <span className="mt-1 text-sm text-red-600">
                {formState.errors.password.message}
              </span>
            )}
          </div>
          {/* create btn */}
          <Button disabled={isSubmitting} type="submit" className="mt-8 w-full">
            {isSubmitting ? (
              <>
                <PiSpinnerBold className="animate-spin" />
                <span className="ml-2">Creating User...</span>
              </>
            ) : (
              "Create User"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignUp;

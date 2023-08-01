"use client";

// third party
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

// components and icons
import { PiSpinnerBold } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Password = () => {
  // 1. Initialize the useForm hook and get form methods and state
  const { register, handleSubmit, formState, setError, reset, getValues } =
    useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // function to update a user's password
  async function onSubmit(data) {
    console.log(data);
  }

  return (
    <Card className="py-8">
      <CardContent className="space-y-6">
        {/* new password */}
        <div className="grid items-center gap-2">
          <Label htmlFor="password" className="text-base font-semibold">
            New Password
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

        {/* confirm password */}
        <div className="grid items-center gap-2">
          <Label htmlFor="confirmPassword" className="text-base font-semibold">
            Confirm Password
          </Label>
          <Input
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            })}
            type="password"
            id="confirmPassword"
            placeholder="enter your password again"
            className=" h-14 text-base tracking-widest placeholder:tracking-normal placeholder:text-gray-400"
          />
          {/* Show validation error message */}
          {formState.errors.confirmPassword && (
            <span className=" mt-1  text-sm text-red-600">
              {formState.errors.confirmPassword.message}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter>
        {/* save btn */}
        <Button
          disabled={isSubmitting}
          onClick={handleSubmit(onSubmit)}
          className="mt-8 w-full"
        >
          {isSubmitting ? (
            <>
              <PiSpinnerBold className="animate-spin" />
              <span className="ml-2">Saving changes...</span>
            </>
          ) : (
            "Save changes"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Password;

"use client";

// third party
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

// api
import { updateUser } from "@/supabase/userApi";

// components and icons
import { PiSpinnerBold } from "react-icons/pi";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const defaultImg = "img/default-avatar.jpg";

const Profile = ({ user }) => {
  // Initialize the useForm hook and get form methods and state
  const { register, handleSubmit, formState, setError, reset, getValues } =
    useForm({
      defaultValues: {
        fullname: user.full_name,
        email: user.email,
      },
    });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // function to update a user's profile
  async function onSubmit(data) {
    try {
      setIsSubmitting(true);

      // Check if the user is authenticated
      if (!user) {
        // Redirect to login page or show error message
        toast.error("You must be logged in to update your profile.");
        setIsSubmitting(false);
        return;
      }

      const { fullname, avatar } = data;

      await updateUser({
        fullName: fullname,
        avatar: avatar[0], // The avatar field will be an array, so we pass the first file in the array
      });

      toast.success("Profile updated successfully");
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      toast.error(error.message);
      console.error(error);
    }
  }

  return (
    <Card className="pb-2 pt-8">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          {/* change avatar field/section */}
          <div className="flex items-center gap-6">
            {/* avatar */}
            <Avatar className="h-16 w-16">
              <AvatarImage src={defaultImg} alt="profile image" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            {/* New avatar input */}
            <div className="grid items-center justify-start gap-1">
              <Input
                {...register("avatar")}
                type="file"
                id="avatar"
                className="text-grey-500 h-fit border-none px-0 text-sm
              file:mr-5 file:rounded-full file:border-0
              file:bg-blue-50 file:px-4
              file:py-1 file:text-sm
              file:font-medium file:text-blue-700
              hover:file:cursor-pointer hover:file:bg-amber-50
              hover:file:text-amber-700"
              />
              {/* Show validation error message */}
              {formState.errors.avatar && formState.touchedFields.avatar && (
                <span className="mt-1 text-sm text-red-600">
                  {formState.errors.avatar.message}
                </span>
              )}
              <Label htmlFor="avatar" className="text-xs text-gray-500 ">
                Upload New Avatar (JPG or PNG, max 2MB)
              </Label>
            </div>
          </div>

          {/* full name */}
          <div className="grid items-center gap-2">
            <Label htmlFor="fullname" className="text-base font-semibold ">
              Full Name
            </Label>
            <Input
              {...register("fullname", {
                required: "Fullname is required",
                // must be a first name and last name and if there is a middle name, it must be separated by a space
                pattern: {
                  value: /^[a-zA-Z]+(?: [a-zA-Z]+)+$/,
                  message: "Please enter your full name",
                },
              })}
              type="fullname"
              id="fullname"
              placeholder="John Snow"
              className="h-14 text-base placeholder:text-gray-400"
            />
            {/* Show validation error message */}
            {formState.errors.fullname && (
              <span className="mt-1 text-sm text-red-600">
                {formState.errors.fullname.message}
              </span>
            )}
          </div>

          {/* email */}
          <div className="grid items-center gap-2">
            <Label htmlFor="email" className="text-base font-semibold ">
              Email
            </Label>
            <Input
              {...register("email")}
              disabled
              type="email"
              id="email"
              placeholder="m@example.com"
              className="h-14 text-base placeholder:text-gray-400"
            />
          </div>
          {/* save btn */}
          <Button disabled={isSubmitting} type="submit" className="w-full">
            {isSubmitting ? (
              <>
                <PiSpinnerBold className="animate-spin" />
                <span className="ml-2">Saving changes...</span>
              </>
            ) : (
              "Save changes"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Profile;

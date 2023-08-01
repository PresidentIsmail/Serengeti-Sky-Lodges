"use client";

// third party
import { mutate } from "swr";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

// api
import { updateFullName, uploadAvatarAndAddToUser } from "@/supabase/userApi";

// components and icons
import { PiSpinnerBold } from "react-icons/pi";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import UpdateAvatar from "./UpdateAvatar";

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
  async function handleFullnameUpdate(data) {
    try {
      setIsSubmitting(true);

      // get the user's full name from the form
      const { fullname } = data;

      // update the user's full name
      const { user: updatedUser, error } = await updateFullName(fullname);

      if (error) {
        toast.error(error.message);
        setIsSubmitting(false);
        return;
      }

      // update the user's full name in the form
      reset({ fullname: updatedUser.user_metadata.full_name });

      // show success message
      toast.success("Profile updated successfully");

      // Trigger SWR revalidation to fetch updated user data
      mutate("/");
    } catch (error) {
      toast.error(error.message);
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="pb-2 pt-8">
      <CardContent>
        {/* seperate form for avatar upload */}
        <UpdateAvatar user={user} />

        {/* seperate form for fullname update */}
        <form
          onSubmit={handleSubmit(handleFullnameUpdate)}
          className="flex flex-col gap-8"
        >
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

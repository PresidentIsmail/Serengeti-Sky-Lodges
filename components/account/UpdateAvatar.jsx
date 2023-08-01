"use client";

// third party
import { mutate } from "swr";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

// api
import { uploadAvatarAndAddToUser } from "@/supabase/userApi";

// components and icons
import { PiSpinnerBold } from "react-icons/pi";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const defaultImg = "img/profile/default-avatar.jpg";

const UpdateAvatar = ({ user }) => {
  // Initialize the useForm hook and get form methods and state
  const { register, handleSubmit, formState, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formAvatar, setFormAvatar] = useState(user.avatar || defaultImg); // Initialize formAvatar state with the user's current avatar or the default image

  // function to upload avatar
  async function handleAvatarUpload(data) {
    const avatar = data.avatar[0];

    // // if no avatar is selected, return
    if (!avatar) return;

    setIsSubmitting(true);

    // upload avatar and add the new avatar URL to user metadata
    const { user: updatedUser, error } = await uploadAvatarAndAddToUser(avatar);

    if (error) {
      toast.error(error.message);
      setIsSubmitting(false);
      return;
    }

    setFormAvatar(updatedUser.user_metadata.avatar); // Update formAvatar state with the new avatar URL
    mutate("/"); // Trigger SWR revalidation to fetch updated user data

    // reset the form
    reset();

    // show success message
    toast.success("Avatar uploaded successfully");

    setIsSubmitting(false);
  }
  return (
    <form
      onSubmit={handleSubmit(handleAvatarUpload)}
      className="mb-8 flex flex-col gap-8"
    >
      <div className="flex items-center gap-6">
        {/* avatar */}
        <Avatar className="h-16 w-16">
          <AvatarImage src={formAvatar} alt="profile image" />
          <AvatarFallback className="text-2xl font-bold">
            {user.full_name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        {/* New avatar input */}
        <div className="grid items-center justify-start gap-4">
          <div>
            <Input
              {...register("avatar")}
              type="file"
              id="avatar"
              className="text-grey-500 h-fit border-none px-0 py-0 text-sm
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

          {/* save btn */}
          <Button
            disabled={isSubmitting}
            type="submit"
            size="sm"
            className="w-max bg-[#ea4c89] hover:bg-[#ea4c89]/80 "
          >
            {isSubmitting ? (
              <PiSpinnerBold className="animate-spin" />
            ) : (
              "Upload avatar"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default UpdateAvatar;

"use client";

// libraries
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

// supabase
import { updateSettings } from "@/supabase/settingsApi";

// components
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PiSpinnerBold } from "react-icons/pi";

// separate component for the form content
const SettingsFormContent = ({ settings }) => {
  const { register, handleSubmit, formState, setError, reset } = useForm({
    defaultValues: settings,
  });
  const [isLoading, setIsLoading] = useState(false);

  // define onUpdate function
  const onUpdate = async (data) => {
    // Only update if there is a change
    if (JSON.stringify(data) === JSON.stringify(settings)) {
      toast.success("No changes made");
      return;
    }

    // Set isLoading to true
    setIsLoading(true);

    // Format data
    const formattedData = {
      ...data,
      id: settings.id || 1,
      minbookinglength: Number(data.minbookinglength),
      maxbookinglength: Number(data.maxbookinglength),
      maxguestsperbooking: Number(data.maxguestsperbooking),
      breakfastprice: Number(data.breakfastprice),
    };

    try {
      // Update the settings data in the database
      await updateSettings(formattedData);
      toast.success("Settings updated successfully");
    } catch (error) {
      // Set error message
      setError(error.message);
      console.log(error);
      toast.error("Error updating settings");
    }

    // Set isLoading to false
    setIsLoading(false);
  };

  return (
    <Card className=" w-full shadow-md lg:px-14">
      <form className="h-fit  p-8 " onSubmit={handleSubmit(onUpdate)}>
        {/* minbookinglength field */}
        <div className="mb-4 grid grid-cols-1 items-center gap-2 lg:grid-cols-2 lg:gap-0">
          <Label htmlFor="minbookinglength" className="text-base font-semibold">
            Minimum Booking Length
          </Label>
          <Input
            className="h-14 text-base placeholder:text-gray-400"
            {...register("minbookinglength", {
              required: "Minimum Booking Length is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Minimum Booking Length must be a number",
              },
            })}
            type="text"
            id="minbookinglength"
            placeholder="Enter minimum booking length"
          />
          {/* Show validation error message */}
          {formState.errors.minbookinglength && (
            <span className="mt-1 text-sm text-red-600">
              {formState.errors.minbookinglength.message}
            </span>
          )}
        </div>

        {/* maxbookinglength Capacity field */}
        <div className="mb-4 grid grid-cols-1 items-center gap-2 lg:grid-cols-2 lg:gap-0">
          <Label htmlFor="maxbookinglength" className="text-base font-semibold">
            Maximum Booking Length
          </Label>
          <Input
            className="h-14 text-base placeholder:text-gray-400"
            {...register("maxbookinglength", {
              required: "Maximum Booking Length is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Maximum Booking Length must be a number",
              },
            })}
            type="text"
            id="maxbookinglength"
            placeholder="Enter maximum booking length"
          />
          {/* Show validation error message */}
          {formState.errors.maxbookinglength && (
            <span className="mt-1 text-sm text-red-600">
              {formState.errors.maxbookinglength.message}
            </span>
          )}
        </div>

        {/* maxguestsperbooking field */}
        <div className="mb-4 grid grid-cols-1 items-center gap-2 lg:grid-cols-2 lg:gap-0">
          <Label
            htmlFor="maxguestsperbooking"
            className="text-base font-semibold"
          >
            Maximum Guests per Booking
          </Label>
          <Input
            className="h-14 text-base placeholder:text-gray-400"
            {...register("maxguestsperbooking", {
              required: "Maximum Guests per Booking is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Maximum Guests per Booking must be a number",
              },
            })}
            type="text"
            id="maxguestsperbooking"
            placeholder="Enter maximum guests per booking"
          />
          {/* Show validation error message */}
          {formState.errors.maxguestsperbooking && (
            <span className="mt-1 text-sm text-red-600">
              {formState.errors.maxguestsperbooking.message}
            </span>
          )}
        </div>

        {/* breakfastprice field */}
        <div className="mb-4 grid grid-cols-1 items-center gap-2 lg:grid-cols-2 lg:gap-0">
          <Label htmlFor="breakfastprice" className="text-base font-semibold">
            Breakfast Price
          </Label>
          <Input
            className="h-14 text-base placeholder:text-gray-400"
            {...register("breakfastprice", {
              required: "Breakfast Price is required",
              pattern: {
                value: /^[0-9]+(\.[0-9]+)?$/,
                message: "Breakfast Price must be a number",
              },
            })}
            type="text"
            id="breakfastprice"
            placeholder="Enter breakfast price"
          />
          {/* Show validation error message */}
          {formState.errors.breakfastprice && (
            <span className="mt-1 text-sm text-red-600">
              {formState.errors.breakfastprice.message}
            </span>
          )}
        </div>

        {/* Save and Cancel buttons */}
        <div className="mt-8 flex w-full justify-center ">
          {/* set btn to disabled and show spinner and submitting... if state isLoading*/}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-1/3 bg-violet-500 text-base font-semibold  hover:bg-violet-500/80"
          >
            {isLoading ? (
              <>
                <PiSpinnerBold className="mr-2 w-full animate-spin text-base font-semibold" />
                <span>Saving...</span>
              </>
            ) : (
              "Make Changes"
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default SettingsFormContent;

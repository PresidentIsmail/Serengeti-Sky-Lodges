"use client";

// libraries
import { useState } from "react";
import { useCabinsFormContext } from "@/context/CabinsFormContext";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

// function that will insert a new cabin into the database
import { insertCabin, updateCabin } from "@/supabase/cabinsApi";

// components
import { PiSpinnerBold } from "react-icons/pi";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// This component is the form to insert a new cabin into the database
const UpdateCabinForm = ({ refreshOnCabinSubmit }) => {
  // get the state and dispatch function from the cabinsformcontext
  const toggleUpdateCabinForm = useCabinsFormContext().toggleUpdateCabinForm;
  const cabinsFromContext = useCabinsFormContext().cabins;

  // 1. Initialize the useForm hook and get form methods and state
  const { register, handleSubmit, formState, setError, reset } = useForm({
    defaultValues: {
      name: cabinsFromContext.name,
      maxCapacity: cabinsFromContext.maxcapacity,
      price: cabinsFromContext.regularprice,
      discount: cabinsFromContext.discount,
      description: cabinsFromContext.description,
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  // create a function to handle the form submission
  const onUpdate = async (data, cabinId) => {
    setIsLoading(true);
    try {
      // Format the data to match the database table structure
      const formattedData = {
        name: data.name,
        maxcapacity: parseInt(data.maxCapacity),
        regularprice: parseFloat(data.price),
        discount: parseFloat(data.discount),
        description: data.description,
      };

      // If a new image was selected, add it to the formattedData
      if (data.cabinPhoto[0] && typeof data.cabinPhoto[0] === "object") {
        formattedData.image = data.cabinPhoto[0];
      } else {
        formattedData.image = null;
      }

      // Call the function to update the cabin data in the database
      await updateCabin(cabinsFromContext.id, formattedData);

      // Display a success toast if the data was updated successfully
      toast.success("Cabin updated successfully");

      // Reset the form
      reset();

      // hide the form
      toggleUpdateCabinForm();

      // Refresh the cabins table
      refreshOnCabinSubmit();
    } catch (error) {
      // Display an error toast if there was an error updating the data
      toast.error("Error updating cabin");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // 3. Create the form with onSubmit handler
    <div className="absolute inset-0 flex h-full items-center justify-center bg-white/50">
      <Card className="">
        <form
          className="  h-fit max-w-lg  p-8 shadow-md"
          onSubmit={handleSubmit(onUpdate)}
        >
          {/* Name field */}
          <div className="mb-4">
            <Label htmlFor="name" className="text-base">
              Name
            </Label>
            <Input
              {...register("name", {
                required: "Name is required",
              })}
              type="text"
              id="name"
              placeholder="Enter cabin name"
            />
            {/* Show validation error message */}
            {formState.errors.name && (
              <span className="mt-1 text-sm text-red-600">
                {formState.errors.name.message}
              </span>
            )}
          </div>
          {/* Maximum Capacity field */}
          <div className="mb-4">
            <Label htmlFor="maxCapacity" className="text-base">
              Maximum Capacity
            </Label>
            <Input
              {...register("maxCapacity", {
                required: "Maximum Capacity is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Maximum Capacity must be a number",
                },
              })}
              type="text"
              id="maxCapacity"
              placeholder="Enter maximum capacity"
            />
            {/* Show validation error message */}
            {formState.errors.maxCapacity && (
              <span className="mt-1 text-sm text-red-600">
                {formState.errors.maxCapacity.message}
              </span>
            )}
          </div>
          {/* Price field */}
          <div className="mb-4">
            <Label htmlFor="price" className="text-base">
              Price
            </Label>
            <Input
              {...register("price", {
                required: "Price is required",
                pattern: {
                  value: /^[0-9]+(\.[0-9]{1,2})?$/,
                  message: "Invalid price format",
                },
              })}
              type="text"
              id="price"
              placeholder="Enter price"
            />
            {/* Show validation error message */}
            {formState.errors.price && (
              <span className="mt-1 text-sm text-red-600">
                {formState.errors.price.message}
              </span>
            )}
          </div>
          {/* Discount field */}
          <div className="mb-4">
            <Label htmlFor="discount" className="text-base">
              Discount
            </Label>
            <Input
              {...register("discount", {
                required: "Discount is required",
                pattern: {
                  value: /^[0-9]+(\.[0-9]{1,2})?$/,
                  message: "Invalid discount format",
                },
              })}
              type="text"
              id="discount"
              placeholder="Enter discount"
            />
            {/* Show validation error message */}
            {formState.errors.discount && (
              <span className="mt-1 text-sm text-red-600">
                {formState.errors.discount.message}
              </span>
            )}
          </div>
          {/* Description of Cabin field */}
          <div className="mb-4">
            <Label htmlFor="description" className="text-base">
              Description of Cabin
            </Label>
            <Textarea
              {...register("description", {
                required: "Description is required",
              })}
              id="description"
              placeholder="Enter description"
              rows="4"
              className="bg-white"
            ></Textarea>
            {/* Show validation error message */}
            {formState.errors.description && (
              <span className="mt-1 text-sm text-red-600">
                {formState.errors.description.message}
              </span>
            )}
          </div>
          {/* Cabin photo field */}
          <div className="mb-4">
            <Label htmlFor="cabinPhoto" className="text-base">
              Cabin Photo (optional)
            </Label>
            <Input {...register("cabinPhoto")} type="file" id="cabinPhoto" />
            {/* Show validation error message */}
            {formState.errors.cabinPhoto && (
              <span className="mt-1 text-sm text-red-600">
                {errors.cabinPhoto.message}
              </span>
            )}
          </div>
          {/* Save and Cancel buttons */}
          <div className="flex justify-end space-x-4">
            <Button
              onClick={toggleUpdateCabinForm}
              type="reset"
              variant="outline"
              className="h-10 border border-gray-400 px-6 py-2 text-gray-600"
            >
              Cancel
            </Button>
            {/* set btn to disabled and show spinner and submitting... if state isLoading*/}
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-green-900 hover:bg-green-700"
            >
              {isLoading ? (
                <>
                  <PiSpinnerBold className="mr-2 h-5 w-5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default UpdateCabinForm;

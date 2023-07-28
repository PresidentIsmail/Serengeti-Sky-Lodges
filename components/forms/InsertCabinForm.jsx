"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

// function that will insert a new cabin into the database
import { insertCabin } from "@/supabase/cabinsApi";

import { PiSpinnerBold } from "react-icons/pi";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const InsertCabinForm = ({ refreshOnCabinSubmit }) => {
  // 1. Initialize the useForm hook and get form methods and state
  const { register, handleSubmit, formState, setError, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  // 2. Define a submit handler
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Format the data to match the database table structure
      const formattedData = {
        name: data.name,
        maxcapacity: parseInt(data.maxCapacity),
        regularprice: parseFloat(data.price),
        discount: parseFloat(data.discount),
        description: data.description,
        image: data.cabinPhoto[0],
      };

      // Call the function to insert the cabin data into the database
      await insertCabin(formattedData);
      // console.log(formattedData);

      // Display a success toast if the data was sent successfully
      toast.success("Cabin added successfully");

      // Reset the form
      reset();

      // Refresh the cabins table
      refreshOnCabinSubmit();
    } catch (error) {
      // Display an error toast if there was an error sending the data
      toast.error("Error adding cabin");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // 3. Create the form with onSubmit handler
    <form className="mx-auto mt-8 max-w-lg" onSubmit={handleSubmit(onSubmit)}>
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
          Cabin Photo
        </Label>
        <Input
          {...register("cabinPhoto", {
            required: "Cabin Photo is required",
          })}
          type="file"
          id="cabinPhoto"
        />
        {/* Show validation error message */}
        {formState.errors.cabinPhoto && (
          <span className="mt-1 text-sm text-red-600">
            {errors.cabinPhoto.message}
          </span>
        )}
      </div>

      {/* Add Cabin and Cancel buttons */}
      <div className="flex justify-end space-x-4">
        <Button
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
              <span>Adding...</span>
            </>
          ) : (
            "Add Cabin"
          )}
        </Button>
      </div>
    </form>
  );
};

export default InsertCabinForm;

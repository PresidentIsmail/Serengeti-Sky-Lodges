"use client";

import React from "react";
import { useForm } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const CabinForm = () => {
  // 1. Initialize the useForm hook and get form methods and state
  const { register, handleSubmit, formState, setError } = useForm();

  // 2. Define a submit handler
  const onSubmit = (data) => {
    // Log the form data to the console
    console.log(data);
  };

  return (
    // 3. Create the form with onSubmit handler
    <form className="mx-auto max-w-lg " onSubmit={handleSubmit(onSubmit)}>
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
            required: "Cabin Photo URL is required",
            pattern: {
              value: /^(ftp|http|https):\/\/[^ "]+$/,
              message: "Invalid URL format",
            },
          })}
          type="text"
          id="cabinPhoto"
          placeholder="Enter cabin photo URL"
        />
        {/* Show validation error message */}
        {formState.errors.cabinPhoto && (
          <span className="mt-1 text-sm text-red-600">
            {formState.errors.cabinPhoto.message}
          </span>
        )}
      </div>

      {/* Add Cabin and Cancel buttons */}
      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          className="rounded-lg bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
        >
          Add Cabin
        </button>
        <button
          type="button"
          className="rounded-lg border border-gray-400 px-6 py-2 hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CabinForm;

// cabinsApi.js
import { supabase } from "./supabase";
import { v4 as uuidv4 } from "uuid";

const table = "cabins_test";

// get all cabins
export async function getAllCabins() {
  let { data: cabins, error } = await supabase.from(table).select("*");

  if (error) {
    throw error;
  }

  return cabins;
}

// delete a cabin
export async function deleteCabin(cabinId) {
  const { error } = await supabase.from(table).delete().eq("id", cabinId);

  if (error) {
    throw error;
  }
}

// insert a cabin
// export async function insertCabin(cabin) {
//   const { data, error } = await supabase.from(table).insert([cabin]).single();

//   if (error) {
//     throw error;
//   }

//   return data;
// }

// insert a cabin with image
export async function insertCabin(cabin) {
  try {
    // Generate a unique ID for the image file
    const uniqueId = uuidv4();
    const fileName = `${uniqueId}-${cabin.image.name}`;

    // Upload the image to the "cabin-test-images" bucket with the unique ID as the filename
    const { data: imageUploadData, error: imageUploadError } =
      await supabase.storage
        .from("cabin-test-images")
        .upload(fileName, cabin.image);

    if (imageUploadError) {
      throw imageUploadError;
    }

    // Get the URL of the uploaded image
    const imagePath = imageUploadData.path;

    // example img url
    // https://xwpwrzydtdujobdfhkqd.supabase.co/storage/v1/object/public/cabin-test-images/9918ed5b-e114-4240-9920-d590980d3240-dog-01.jpg

    const imageUrl = `https://xwpwrzydtdujobdfhkqd.supabase.co/storage/v1/object/public/cabin-test-images/${imagePath}`;

    // Add the image URL to the cabin data
    const cabinWithImage = {
      ...cabin,
      image: imageUrl,
    };

    // Insert the cabin with the image URL into the table
    const { data, error } = await supabase
      .from(table)
      .insert([cabinWithImage])
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    // Handle any errors and prevent adding data if there's an issue with image upload
    console.error(error);
    throw new Error("Error adding cabin with image");
  }
}

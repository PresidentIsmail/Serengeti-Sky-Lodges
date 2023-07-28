// settingsApi.js
import { supabase } from "./supabase";
import { v4 as uuidv4 } from "uuid";

const table = "settings";

// get all settings
export async function getAllSettings() {
  let { data: settings, error } = await supabase
    .from(table)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return settings;
}

// update settings
// export async function updateSettings(settings) {
//   console.log("settings", settings);
//   try {
//     const { data, error } = await supabase
//       .from(table)
//       .update(settings)
//       .eq("id", settings.id) // Add the WHERE clause based on the id field
//       .single();

//     if (error) {
//       throw error;
//     }

//     return data;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Error updating settings");
//   }
// }

// update settings
export async function updateSettings(settings) {
  try {
    // Perform the update query
    const { error } = await supabase
      .from(table)
      .update(settings)
      .eq("id", settings.id);

    if (error) {
      throw error;
    }

    // Fetch the updated data after the update
    const { data: updatedData, error: fetchError } = await supabase
      .from(table)
      .select()
      .eq("id", settings.id)
      .single();

    if (fetchError) {
      throw fetchError;
    }


    return updatedData;
  } catch (error) {
    console.error(error);
    throw new Error("Error updating settings");
  }
}

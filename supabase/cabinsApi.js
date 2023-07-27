// cabinsApi.js
import { supabase } from "./supabase";

// get all cabins
export async function getAllCabins() {
  let { data: cabins, error } = await supabase.from("cabins_test").select("*");

  if (error) {
    throw error;
  }

  return cabins;
}

// delete a cabin
export async function deleteCabin(cabinId) {
  const { error } = await supabase
    .from("cabins_test")
    .delete()
    .eq("id", cabinId);

  if (error) {
    throw error;
  }
}

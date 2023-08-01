import { supabase } from "./supabase";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { v4 as uuidv4 } from "uuid";

const supabase_cookie = createClientComponentClient();

// update user function that will handle updating user data. updates the fullname and if there is an avatar it will update that as well.
export async function updateUser({ fullName, avatar }) {
  // check if there is an avatar
  if (avatar) {
    // if there is an avatar then update the user with the avatar
    const { data: user, error } = await supabase_cookie.auth.updateUser({
      data: {
        full_name: fullName,
        avatar: avatar,
      },
    });

    if (error) {
      // Handle update error
      console.error("Update Error:", error.message);
      throw new Error(error.message);
    }

    return user;
  }

  // if there is no avatar then update the user without the avatar
  const { data: user, error } = await supabase_cookie.auth.updateUser({
    data: {
      full_name: fullName,
    },
  });

  if (error) {
    // Handle update error
    console.error("Update Error:", error.message);
    throw new Error(error.message);
  }

  return user;
}

// function that gets the user session
export async function getUserSession() {
  // get the user's session
  const {
    data: { user },
  } = await supabase_cookie.auth.getUser();

  // create a user object with the data we need
  const userData = {
    id: user.id,
    role: user.role,
    email: user.email,
    full_name: user.user_metadata.full_name,
    avatar: user.user_metadata.avatar,
  };

  return userData;
}

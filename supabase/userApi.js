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

// function that uploads the user's avatar to the avatars bucket
export async function uploadAvatar(avatar) {
  try {
    // create a unique id for the image
    const uniqueId = uuidv4();
    // create a file name for the image
    const fileName = `${uniqueId}-${avatar.name}`;

    // upload the image to the avatars bucket
    const { data: imageUploadData, error: imageUploadError } =
      await supabase.storage.from("avatars").upload(fileName, avatar);

    if (imageUploadError) {
      throw imageUploadError;
    }

    // get the path of the image
    const imagePath = imageUploadData.path;

    // return the image path
    return `https://xwpwrzydtdujobdfhkqd.supabase.co/storage/v1/object/public/avatars/${imagePath}`;
  } catch (error) {
    console.error(error);
    throw new Error("Error uploading avatar");
  }
}

// function that gets adds the avatar url to the user's metadata
export async function addAvatarToUser(avatarUrl) {
  try {
    // get the user's session
    const {
      data: { user },
      error: userError,
    } = await supabase_cookie.auth.getUser();

    if (userError) {
      throw userError;
    }

    // update the user's metadata with the avatar url
    const { data, error } = await supabase_cookie.auth.updateUser({
      data: {
        avatar: avatarUrl,
      },
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error adding avatar to user");
  }
}

// function that gets the updates the users full name
export async function updateFullName(fullName) {
  try {
    // update the user's metadata with the full name
    const { data, error } = await supabase_cookie.auth.updateUser({
      data: {
        full_name: fullName,
      },
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error updating full name");
  }
}

// function that combines the upload avatar and add avatar to user functions
export async function uploadAvatarAndAddToUser(avatar) {
  try {
    // upload the avatar
    const avatarUrl = await uploadAvatar(avatar);

    // add the avatar url to the user's metadata
    const user = await addAvatarToUser(avatarUrl);

    return user;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

// function that updates the user's password
export async function updatePassword(password) {
  try {
    // update the user's password
    const { error } = await supabase_cookie.auth.updateUser({
      password: password,
    });

    if (error) {
      throw error;
    }

    return;
  } catch (error) {
    console.error(error);
    throw new Error("Error updating password");
  }
}

/* 
https://xwpwrzydtdujobdfhkqd.supabase.co/storage/v1/object/public/avatars/profile_one.png?t=2023-08-01T13%3A42%3A55.158Z
*/

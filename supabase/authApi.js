

/* using a different client for auth
  This code loads the Supabase client and sets up authentication.
  the session from logging in will be saved to the cookies.
  */
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase_cookie = createClientComponentClient();



// login function that will handle user login using email and password
export async function loginUser({ email, password }) {
  try {
    const { data: user, error } = await supabase_cookie.auth.signInWithPassword({
      email,
      password,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      // Handle login error
      console.error("Login Error:", error.message);
      throw new Error(error.message);
    }

    return user;
  } catch (error) {
    // Handle any other errors that might occur during login
    console.error("Error logging in:", error.message);
    throw new Error(error.message);
  }
}

// log out function that will handle user logout
export async function logoutUser() {
  try {
    const { error } = await supabase_cookie.auth.signOut();

    if (error) {
      // Handle logout error
      console.error("Logout Error:", error.message);
      throw new Error(error.message);
    }
  } catch (error) {
    // Handle any errors that might have occurred during logout
    console.error("Error logging out:", error.message);
    throw new Error(error.message);
  }
}


/*
using this client for auth because for signing up there is no need to save the users session to cookies.
The supabase_cookie client will save the session to cookies, but the supabase_session client will not.
*/

import { supabase as supabase_session } from "./supabase";

// sign up function that will handle user sign up
export async function signUpUser({ fullName, email, password }) {
  const { data: user, error } = await supabase_session.auth.signUp({
    email,
    password,
    options: {
      fullName,
      avatar_url: "",
      // redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) {
    // Handle sign up error
    console.error("Sign Up Error:", error.message);
    throw new Error(error.message);
  }
}
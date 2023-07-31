/* using a different client for auth
  This code loads the Supabase client and sets up authentication.
  the session from logging in will be saved in the cache
  */
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

// login function that will handle user login using email and password
export async function loginUser({ email, password }) {
  try {
    const { data: user, error } = await supabase.auth.signInWithPassword({
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
    const { error } = await supabase.auth.signOut();

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

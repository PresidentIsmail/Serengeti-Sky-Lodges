// import { supabase } from "@/supabase/supabase";
import { CabinsFormContextProvider } from "@/context/CabinsFormContext";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import Sidebar from "@/components/sidebar/Sidebar";
import Navbar from "@/components/navbar/Navbar";

export default async function ApplicationLayout({ children }) {
  // This code creates a Supabase client and sets the authentication cookie.
  const supabase = createServerComponentClient({ cookies });

  // get the existing session
  const { data } = await supabase.auth.getSession();

  // get the user from the session
  const user = data?.session?.user;

  // if there is no user, redirect to login
  if (!user) {
    redirect("/login");
  }

  return (
    <>
      {/* context provider for the cabin */}
      <CabinsFormContextProvider>
        <div className="flex h-[100dvh]">
          <Sidebar />
          <div className="flex flex-1 flex-col ">
            <Navbar />
            <main className="relative h-full bg-gray-50 overflow-y-scroll pb-24 pe-16 ps-8 pt-16">
              {children}
            </main>
          </div>
        </div>
      </CabinsFormContextProvider>
    </>
  );
}

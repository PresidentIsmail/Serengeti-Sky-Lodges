import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import Image from "next/image";

import logo from "@/public/img/logo-light.png";
import LoginForm from "@/components/forms/LoginForm";

const Login = async () => {
  // This code creates a Supabase client and sets the authentication cookie.
  const supabase = createServerComponentClient({ cookies });

  // get the existing session
  const { data } = await supabase.auth.getSession();

  // get the user from the session
  const user = data?.session?.user;

  // if there is a user, redirect to "/"
  if (user) {
    redirect("/account");
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8">
      <Image src={logo} height={125} width={"auto"} alt="logo" />

      <LoginForm />
    </div>
  );
};

export default Login;

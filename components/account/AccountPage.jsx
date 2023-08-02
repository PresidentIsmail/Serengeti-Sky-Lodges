// api
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// icons and components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Password from "@/components/account/Password";
import Profile from "@/components/account/Profile";

const AccountPage = async () => {
  const supabase = createServerComponentClient({ cookies });
  // get the user's session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // create a user object with the data we need
  const userData = {
    id: user.id,
    role: user.role,
    email: user.email,
    full_name: user.user_metadata.full_name,
    avatar: user.user_metadata.avatar,
  };

  return (
    <Tabs defaultValue="profile" className="w-[500px] ">
      <h1 className="self-start  text-3xl font-semibold lg:text-4xl">
        Edit Account
      </h1>
      <p className="mb-4 text-base text-slate-500 dark:text-slate-400">
        Make changes to your account here. Click save when you&apos;re done.
      </p>

      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <Profile user={userData} />
      </TabsContent>
      <TabsContent value="password">
        <Password />
      </TabsContent>
    </Tabs>
  );
};

export default AccountPage;

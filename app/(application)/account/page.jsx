import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Password from "@/components/account/Password";
import Profile from "@/components/account/Profile";

const Account = () => {
  return (
    <section className="flex h-full w-full items-center justify-center bg-white">
      <Tabs defaultValue="profile" className="w-[500px]">
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
          <Profile />
        </TabsContent>
        <TabsContent value="password">
          <Password />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Account;

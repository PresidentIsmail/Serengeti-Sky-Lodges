import dynamic from "next/dynamic";

// import AccountPage from "@/components/account/AccountPage";
const AccountPage = dynamic(() => import("@/components/account/AccountPage"), {
  ssr: false,
});

const Account = () => {

  return (
    <section className="flex h-full w-full items-center justify-center">
      <AccountPage />
    </section>
  );
};

export default Account;

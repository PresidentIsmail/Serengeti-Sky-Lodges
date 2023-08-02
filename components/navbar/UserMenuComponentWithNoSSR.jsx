import dynamic from "next/dynamic";

const UserMenuComponentWithNoSSR = dynamic(
  () => import("@/components/navbar/UserMenu"),
  {
    ssr: false,
  },
);

// eslint-disable-next-line react/display-name, import/no-anonymous-default-export
export default () => <UserMenuComponentWithNoSSR />;

/* 
I have this component because I was getting this error:
"Warning: Prop `id` did not match. Server: "radix-:Rj6qcq:" Client: "radix-:R2cr9j9:"` did not match" on the UserMenu component.
This seems to be the only way to fix it.
*/

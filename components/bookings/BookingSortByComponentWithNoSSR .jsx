import dynamic from "next/dynamic";

const BookingSortByComponentWithNoSSR = dynamic(
  () => import("@/components/bookings/BookingsSortBy"),
  {
    ssr: false,
  },
);

// eslint-disable-next-line react/display-name, import/no-anonymous-default-export
export default () => <BookingSortByComponentWithNoSSR />;

/* 
I have this component because I was getting this error:
"Warning: Prop `aria-controls` did not match" on the BookingsSortBy component.
This seems to be the only way to fix it.
*/

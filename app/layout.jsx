import "./globals.css";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";

const ceraPro = localFont({
  src: [
    {
      path: "../public/fonts/CeraPro.woff2",
      weight: "400",
    },
    {
      path: "../public/fonts/CeraProMedium.woff2",
      weight: "600",
    },
    {
      path: "../public/fonts/CeraProBold.woff2",
      weight: "700",
    },
  ],
  variable: "--font-cera-pro",
});

export const metadata = {
  title: "The Wild Oasis",
  description:
    "Welcome to The Wild Oasis, your ultimate getaway to a serene and enchanting retreat! Nestled amidst the breathtaking wilderness, our cabins offer a tranquil haven where guests can escape the hustle and bustle of everyday life and immerse themselves in the beauty of nature.  At The Wild Oasis, we pride ourselves on providing an unforgettable lodge experience that combines rustic charm with modern comfort. Each cabin is thoughtfully designed to blend seamlessly with the natural surroundings, offering guests a cozy and intimate setting to unwind and rejuvenate.Our dedicated team of hospitality experts ensures that every aspect of your stay is meticulously taken care of. From the moment you arrive, you'll be greeted with warm hospitality and a sense of belonging. Whether you're seeking a romantic retreat, a family adventure, or a solo escape, we have the perfect cabin to cater to your unique preferences.With an array of outdoor activities, you can immerse yourself in the wonders of nature. From hiking through scenic trails to stargazing under the clear night sky, every moment spent at The Wild Oasis is an opportunity to connect with the wilderness and create lasting memories.Indulge in the rich flavors of local cuisine at our charming lodge restaurant, where farm-to-table dishes are crafted with love and passion. Unwind with a soothing massage at our spa or simply relax by the crackling fireplace with a good book.Discover a place where time stands still, and the stresses of everyday life fade away. Whether you seek adventure or tranquility, The Wild Oasis promises an unparalleled experience that will leave you feeling recharged and connected to nature's wonders.Escape to The Wild Oasis, and let the wilderness embrace you with its untamed beauty and magical allure. Your journey to serenity begins here.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${ceraPro.variable} font-sans`}>
        {/* use toaster in app */}
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "4rem" }}
          toastOptions={{
            success: {
              style: {
                background: "#10B981",
                color: "#fff",
              },
              duration: 3000,
            },
            error: {
              style: {
                background: "#EF4444",
                color: "#fff",
              },
              duration: 5000,
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}

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
  title: "Serengeti Sky Lodges",
  description:
    "Welcome to Serengeti Sky Lodges, your ultimate getaway to a serene and enchanting wilderness retreat. Nestled amidst the breathtaking landscapes of the iconic Serengeti, our luxury lodges offer a tranquil haven where guests can escape the hustle and bustle of everyday life and immerse themselves in the untamed beauty of nature. At Serengeti Sky Lodges, we pride ourselves on providing an unforgettable lodge experience that combines rustic charm with modern comfort. Each lodge is thoughtfully designed to blend seamlessly with the natural surroundings, offering guests a cozy and intimate setting to unwind and rejuvenate.",
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

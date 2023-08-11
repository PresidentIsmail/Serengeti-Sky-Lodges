"use client";

import { Toaster } from "react-hot-toast";

const Providers = ({ children }) => {
  return (
    <>
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
    </>
  );
};

export default Providers;

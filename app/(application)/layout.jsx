import { CabinsFormContextProvider } from "@/context/CabinsFormContext";
import { Toaster } from "react-hot-toast";

import Sidebar from "@/components/sidebar/Sidebar";
import Header from "@/components/header/Header";

export default function ApplicationLayout({ children }) {
  return (
    <>
      {/* context provider for the cabin */}
      <CabinsFormContextProvider>
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
        <div className="flex h-[100dvh]">
          <Sidebar />
          <div className="flex flex-1 flex-col ">
            <Header />
            <main className="relative h-full overflow-y-scroll bg-gray-50 pb-24 pe-16 ps-8 pt-16">
              {children}
            </main>
          </div>
        </div>
      </CabinsFormContextProvider>
    </>
  );
}

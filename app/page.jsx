"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // when user lands on the home page, redirect to /dashboard
    router.push("/dashboard");
  }, [router]);

  return null;
}

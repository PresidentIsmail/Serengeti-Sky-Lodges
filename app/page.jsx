"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  // when user lands on the home page, redirect to /dashboard
  useRouter().push("/dashboard");
  return null;
}

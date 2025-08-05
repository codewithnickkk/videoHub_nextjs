// app/upload/page.tsx (Server Component)
"use client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Adjust this path
import { redirect } from "next/navigation";
import UploadVideo from "../components/uploadvideo"; // Adjust path


import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UploadPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Avoid redirecting until session is known
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.push("/api/auth/signin?callbackUrl=/upload");
    }
  }, [status]);

  if (status === "loading") {
    return <p className="text-center mt-10">Checking session...</p>;
  }

  if (!session) return null; // Prevent rendering until session is ready
  if (!session) {
    redirect("/login");
  }

  return <UploadVideo />;
}

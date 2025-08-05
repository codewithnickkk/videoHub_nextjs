// No "use client"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import UploadVideo from "../components/uploadvideo";
import { useRouter } from "next/router";

export default async function UploadPage() {
  const session = await getServerSession(authOptions);
  const Route = useRouter(); 
  if (!session) {
    // redirect("/api/auth/signin?callbackUrl=/upload");
    Route.push("/login");
  }

  return <UploadVideo />;
}

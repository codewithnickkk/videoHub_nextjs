// app/upload/page.tsx (Server Component)
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Adjust this path
import { redirect } from "next/navigation";
import UploadVideo from "../components/uploadvideo"; // Adjust path

export default async function UploadPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return <UploadVideo />;
}

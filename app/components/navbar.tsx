// app/components/navbar.tsx
"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link href="/" className="font-bold">
        VideoHub
      </Link>
      <div className="space-x-4">
        {session ? (
          <>
            <Link href="/upload">Upload</Link>
            <button onClick={() => signOut()}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

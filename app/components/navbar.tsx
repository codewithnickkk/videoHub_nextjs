"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Providers from "./providers";

export function Navbar() {
  const { data: session, status } = useSession();

  const handleAuthClick = () => {
    if (session) {
      signOut();
    } else {
      signIn(); // Optional: pass signIn("credentials") if using credentials
    }
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-xl font-bold text-amber-400">
            VideoHub
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6">
            <Link href="/" className="hover:text-amber-300 transition-colors">
              Home
            </Link>
            <Link
              href="/upload"
              className="hover:text-amber-300 transition-colors"
            >
              Upload Video
            </Link>
            <Link
              href="/about"
              className="hover:text-amber-300 transition-colors"
            >
              About
            </Link>

            {/* Conditional Auth Button */}
            <button
              onClick={handleAuthClick}
              className="hover:text-amber-300 transition-colors"
            >
              {status === "loading" ? "..." : session ? "Logout" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

// "use client";

// import { useSession, signIn, signOut } from "next-auth/react";
// import Link from "next/link";
// import Providers from "./providers";

// export function Navbar() {
//   const { data: session, status } = useSession();

//   const handleAuthClick = () => {
//     if (session) {
//       signOut();
//     } else {
//       signIn(); // Optional: pass signIn("credentials") if using credentials
//     }
//   };

//   return (
//     <nav className="bg-gray-900 text-white shadow-lg">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0 text-xl font-bold text-amber-400">
//             VideoHub
//           </div>

//           {/* Navigation Links */}
//           <div className="flex space-x-6">
//             <Link href="/" className="hover:text-amber-300 transition-colors">
//               Home
//             </Link>
//             <Link
//               href="/upload"
//               className="hover:text-amber-300 transition-colors"
//             >
//               Upload Video
//             </Link>
//             <Link
//               href="/about"
//               className="hover:text-amber-300 transition-colors"
//             >
//               About
//             </Link>

//             {/* Conditional Auth Button */}
//             <button
//               onClick={handleAuthClick}
//               className="hover:text-amber-300 transition-colors"
//             >
//               {status === "loading" ? "..." : session ? "Logout" : "Login"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const handleAuthClick = () => {
    if (session) {
      signOut();
    } else {
      signIn();
    }
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-xl font-bold text-amber-400">VideoHub</div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-6">
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
            <button
              onClick={handleAuthClick}
              className="hover:text-amber-300 transition-colors"
            >
              {status === "loading" ? "..." : session ? "Logout" : "Login"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link href="/" className="block hover:text-amber-300">
            Home
          </Link>
          <Link href="/upload" className="block hover:text-amber-300">
            Upload Video
          </Link>
          <Link href="/about" className="block hover:text-amber-300">
            About
          </Link>
          <button
            onClick={handleAuthClick}
            className="block hover:text-amber-300"
          >
            {status === "loading" ? "..." : session ? "Logout" : "Login"}
          </button>
        </div>
      )}
    </nav>
  );
}

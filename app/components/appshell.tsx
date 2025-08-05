// app/components/appshell.tsx
"use client";

import { Navbar } from "./navbar";
import React from "react";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

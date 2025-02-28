// app/(dashboard)/layout.tsx
import React from 'react';
import { NavBar } from './_partials/NavBar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full items-start justify-start gap-10">
      <NavBar />
      <main className="min-h-screen w-full">{children}</main>
    </div>
  );
}

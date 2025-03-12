import { authOptions } from '@/config/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import { NavBar } from './_partials/NavBar';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) return redirect('/');

  return (
    <div className="flex min-h-screen w-full items-start justify-start gap-10">
      <NavBar />
      <main className="min-h-screen w-full">{children}</main>
    </div>
  );
}

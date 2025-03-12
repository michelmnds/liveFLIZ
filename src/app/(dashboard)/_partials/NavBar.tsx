'use client';

import { Avatar } from '@/components/Avatar';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { FaUserCircle } from 'react-icons/fa';
import { FaTachographDigital } from 'react-icons/fa6';
import { IoMdHelpCircle } from 'react-icons/io';
import { MdDashboard } from 'react-icons/md';
import { RiPagesFill } from 'react-icons/ri';

export const NavBar = () => {
  const { data: session } = useSession();
  const streamer = session?.user;

  return (
    <nav className="flex h-screen w-[20%] flex-col items-start justify-start bg-secondaryColor p-8 font-medium text-green-50 transition-all">
      <div className="flex h-full flex-col items-start justify-start gap-8">
        <div className="flex flex-row items-center justify-start gap-2">
          <Avatar logoUrl={streamer?.logoUrl} height={40} width={40} rounded="full" className="bg-white" />
          <h1 className="text-xl font-bold">{streamer?.username}</h1>
        </div>
        <div className="flex flex-col items-start justify-start gap-6">
          <div className="jusstify-start flex items-center gap-2">
            <MdDashboard scale={15} />
            <Link
              href="/dashboard"
              className="flex flex-row items-center justify-start gap-2 transition-all hover:text-white">
              Dashboard
            </Link>
          </div>
          <div className="jusstify-start flex items-center gap-2">
            <FaTachographDigital scale={15} />
            <Link
              href="/widgets"
              className="flex flex-row items-center justify-start gap-2 transition-all hover:text-white">
              Widgets
            </Link>
          </div>
          <div className="jusstify-start flex items-center gap-2">
            <FaUserCircle scale={15} />
            <Link
              href="/profile"
              className="flex flex-row items-center justify-start gap-2 transition-all hover:text-white">
              Profile
            </Link>
          </div>
          <div className="jusstify-start flex items-center gap-2">
            <RiPagesFill scale={15} />
            <Link
              href={`/${streamer?.username}`}
              className="flex flex-row items-center justify-start gap-2 transition-all hover:text-white">
              Preview
            </Link>
          </div>
          <div className="jusstify-start flex items-center gap-2">
            <IoMdHelpCircle scale={15} />
            <Link
              href="/help"
              className="flex flex-row items-center justify-start gap-2 transition-all hover:text-white">
              Help
            </Link>
          </div>
        </div>
      </div>
      <Image src={'/white-logo.svg'} width={100} height={100} alt="Fliz Logo" />
    </nav>
  );
};

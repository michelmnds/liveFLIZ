import { Button } from '@/components/Button';
import Image from 'next/image';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className="flex w-full flex-row items-center justify-between p-4 shadow-md">
      <Image src="/fliz-logo.png" width={100} height={100} alt="Logo" />
      <Button className="w-30">
        <Link href="/login">Login</Link>
      </Button>
    </header>
  );
};

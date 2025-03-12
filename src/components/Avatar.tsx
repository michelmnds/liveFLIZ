import { cn } from '@/utils/cn';
import Image from 'next/image';
import { FaUser } from 'react-icons/fa';

interface AvatarProps {
  logoUrl?: string;
  width: number;
  height: number;
  rounded: 'full' | 'xl';
  className?: string;
}

export const Avatar = ({ logoUrl, height, width, rounded, className }: AvatarProps) => {
  return (
    <div
      className={cn(
        `text-mint-20 rounded-${rounded} relative flex bg-primaryColor h-[${height}px] w-[${width}px] items-center justify-center ${className}`,
        !logoUrl && 'bg-primaryColor'
      )}>
      {logoUrl ? (
        <Image
          src={logoUrl!}
          priority
          alt="Profile picture"
          width={width}
          height={height}
          className={`z-10 rounded-${rounded}`}
        />
      ) : (
        <FaUser size={width / 2} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      )}
    </div>
  );
};

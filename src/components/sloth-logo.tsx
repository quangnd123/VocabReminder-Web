import Image from 'next/image';
import { cn } from '@/src/lib/utils';
import Link from 'next/link';
export default function SlothLogo({ className, href }: { className?: string, href: string }) {
  return (
      <Link href={href} aria-label="home"className={cn("flex items-center space-x-2", className)}>
        <Image
          src="/favicon.ico"
          alt="Sloth Logo"
          width={32}
          height={32}
          className="rounded-full"
        />
        <span className="text-base font-semibold">
          Vocab Reminder
        </span>
      </Link>
  );
}
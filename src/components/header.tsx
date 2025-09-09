
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Facebook, Instagram, Ticket, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isHomePage, setIsHomePage] = useState(false);
  const [headerClass, setHeaderClass] = useState('');
  const [logoClass, setLogoClass] = useState('max-w-full h-auto');

  useEffect(() => {
    const home = pathname === '/';
    setIsHomePage(home);

    setHeaderClass(cn(
        'z-50 w-full py-4',
        home
          ? 'absolute top-0 bg-transparent'
          : 'fixed top-0 border-b bg-background/80 backdrop-blur-sm'
    ));

    setLogoClass(cn(
        'max-w-full h-auto',
        !home && 'dark:invert-0'
    ));
  }, [pathname]);

  return (
    <header
      className={headerClass}
    >
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        {/* Left-aligned navigation */}
        <div className="flex w-1/3 items-center gap-6 text-sm">
          {isHomePage ? (
            <>
              {/* Desktop Button */}
              <Button
                asChild
                variant="outline"
                className="border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground hidden sm:inline-flex"
              >
                <Link href="/reservations">
                  <Ticket className="mr-2 h-4 w-4" /> My Booking
                </Link>
              </Button>
               {/* Mobile Icon Button */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      asChild
                      variant="outline"
                      size="icon"
                      className="border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground sm:hidden"
                    >
                      <Link href="/reservations">
                        <Ticket className="h-5 w-5" />
                        <span className="sr-only">My Booking</span>
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>My Booking</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          ) : (
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          )}
        </div>

        {/* Centered Logo */}
        <div className="flex w-1/3 justify-center">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="The Black Cat Pumpkin Patch Logo"
              width={120}
              height={28}
              priority
              className={logoClass}
            />
          </Link>
        </div>

        {/* Right-aligned social icons */}
        <div className="flex w-1/3 items-center justify-end gap-4">
          {isHomePage && (
            <>
              <Link
                href="https://www.facebook.com/theblackcatpumpkinpatch"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-6 w-6 text-white hover:text-primary transition-colors" />
              </Link>
              <Link
                href="https://www.instagram.com/tbcpumpkinpatch/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-6 w-6 text-white hover:text-primary transition-colors" />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

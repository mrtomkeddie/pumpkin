import Link from "next/link";
import { Button } from "./ui/button";
import { Facebook, Instagram, Ticket } from "lucide-react";
import Image from "next/image";

export function Header() {
  return (
    <header className="absolute top-0 z-50 w-full py-4">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        {/* Left-aligned navigation */}
        <div className="flex items-center gap-6 text-sm text-white">
           <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Link href="/reservations"><Ticket className="mr-2 h-4 w-4" /> My Booking</Link>
          </Button>
        </div>

        {/* Centered Logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link href="/">
             <Image
              src="/logo.png"
              alt="The Black Cat Pumpkin Patch Logo"
              width={120}
              height={28}
              priority
              className="max-w-full h-auto"
            />
          </Link>
        </div>

        {/* Right-aligned social icons */}
        <div className="flex items-center gap-4">
           <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook className="h-6 w-6 text-white hover:text-primary transition-colors" />
          </Link>
          <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram className="h-6 w-6 text-white hover:text-primary transition-colors" />
          </Link>
        </div>
      </div>
    </header>
  );
}

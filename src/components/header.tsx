import Link from "next/link";
import { Button } from "./ui/button";
import { Facebook, Instagram } from "lucide-react";

export function Header() {
  return (
    <header className="absolute top-0 z-50 w-full">
      <div className="container flex h-20 max-w-7xl items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook className="h-6 w-6 text-foreground hover:text-primary transition-colors" />
          </Link>
          <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram className="h-6 w-6 text-foreground hover:text-primary transition-colors" />
          </Link>
        </div>
        <nav className="flex items-center gap-2">
          <Button variant="outline" asChild className="border-primary text-foreground hover:bg-primary/10 hover:text-primary">
            <Link href="/reservations">
              My Bookings
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}

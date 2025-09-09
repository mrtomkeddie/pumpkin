import Link from "next/link";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="absolute top-0 z-50 w-full">
      <div className="container flex h-20 max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-headline text-2xl font-bold">PINGLE FARM</span>
        </Link>
        <nav className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/reservations">
              My Bookings
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}

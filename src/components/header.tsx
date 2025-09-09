import Link from "next/link";
import { Gift, Ticket } from "lucide-react";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-headline text-xl font-bold">Pingle Farm</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/">Book an Activity</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/gift-card">
              <Gift className="mr-2 h-4 w-4" />
              Gift Cards
            </Link>
          </Button>
          <Button asChild>
            <Link href="/reservations">
              <Ticket className="mr-2 h-4 w-4" />
              My Reservations
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}

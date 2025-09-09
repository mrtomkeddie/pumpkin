
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import { ReservationsProvider } from '@/context/reservations-context';

export const metadata: Metadata = {
  title: 'Pingle Farm',
  description: 'Book your next adventure at Pingle Farm.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;700&family=Nunito+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased min-h-screen flex flex-col')}>
        <ReservationsProvider>
          <Header />
          <div className="flex flex-col flex-1 pt-20">
            {children}
          </div>
          <Toaster />
        </ReservationsProvider>
      </body>
    </html>
  );
}

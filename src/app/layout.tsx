
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import { ReservationsProvider } from '@/context/reservations-context';

export const metadata: Metadata = {
  title: 'Black Cat Events',
  description: 'Book your next adventure at Black Cat Events.',
  manifest: '/manifest.json',
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
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <meta name="application-name" content="Black Cat Events" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Black Cat Events" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" href="/sww.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/sww.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/sww.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/sww.png" />

        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={cn('font-body antialiased min-h-screen flex flex-col')}
        suppressHydrationWarning={true}
      >
        <ReservationsProvider>
          <Header />
          <div className="flex flex-col flex-1 pt-24">
            {children}
          </div>
          <Toaster />
        </ReservationsProvider>
      </body>
    </html>
  );
}

    

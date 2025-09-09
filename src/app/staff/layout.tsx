
'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function StaffLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // This effect runs only on the client.
    try {
      const isAuthenticated = sessionStorage.getItem('staff-authenticated') === 'true';

      if (!isAuthenticated && pathname !== '/staff/login') {
        router.replace('/staff/login');
      } else {
        setIsAuthorized(true);
      }
    } catch (error) {
        // If sessionStorage is not available, deny access.
        if (pathname !== '/staff/login') {
            router.replace('/staff/login');
        } else {
             setIsAuthorized(true); // Allow rendering login page
        }
    }
  }, [pathname, router]);

  // Render children only if authorized, to prevent flashing of protected content.
  if (!isAuthorized) {
    return null; // Or a loading spinner
  }

  return <>{children}</>;
}


'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function StaffLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    // This effect runs only on the client.
    let isAuthenticated = false;
    try {
      isAuthenticated = sessionStorage.getItem('staff-authenticated') === 'true';
    } catch (error) {
      // sessionStorage is not available (e.g., in SSR or private browsing)
      isAuthenticated = false;
    }
    
    if (!isAuthenticated && pathname !== '/staff/login') {
      router.replace('/staff/login');
    } else {
      setIsAuthorized(true);
    }
  }, [pathname, router]);

  // Render children only if authorized, otherwise return null to prevent flashing of protected content.
  if (!isAuthorized) {
    return null; // Or a loading spinner
  }

  return <>{children}</>;
}

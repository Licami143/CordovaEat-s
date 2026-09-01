'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  requireRole?: 'customer' | 'owner' | 'admin';
}

/**
 * Client-side auth guard. Redirects unauthenticated users to
 * /login?redirect=/current-path so they can be brought back after login.
 */
export function ProtectedRoute({ children, redirectTo, requireRole }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      const loginUrl = `/login?redirect=${encodeURIComponent(redirectTo || pathname)}`;
      router.replace(loginUrl);
      return;
    }

    if (requireRole && user.role !== requireRole && user.role !== 'admin') {
      router.replace('/');
    }
  }, [user, loading, router, pathname, redirectTo, requireRole]);

  // Show nothing while auth state is loading or redirecting
  if (loading || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-stone-400">
          <div className="h-8 w-8 rounded-full border-2 border-cordova-green border-t-transparent animate-spin" />
          <p className="text-xs">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (requireRole && user.role !== requireRole && user.role !== 'admin') {
    return null;
  }

  return <>{children}</>;
}

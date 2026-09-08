'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { RequireRole } from '@/components/RequireRole';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { RestaurantGridSkeleton } from '@/components/ui/Skeleton';
import type { Restaurant, BusinessStatus } from '@/lib/types';

const STATUS_COLOR: Record<BusinessStatus, 'success' | 'warning' | 'danger' | 'neutral'> = {
  verified: 'success',
  pending: 'warning',
  rejected: 'danger',
  suspended: 'danger',
};

export default function DashboardPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/api/restaurants/mine')
      .then((res) => setRestaurants(res.data))
      .catch(() => setRestaurants([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <RequireRole roles={['owner', 'admin', 'customer']}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4 pb-4 border-b border-stone-200/80 dark:border-stone-800/80">
          <div>
            <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
              Restaurant Owner Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
              Manage your establishment profile, menu items, operating hours, and promotions.
            </p>
          </div>
          <Link href="/dashboard/new">
            <Button className="bg-gradient-to-r from-cordova-gold to-amber-600 hover:from-cordova-goldHover hover:to-amber-700 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-spatial-sm hover:shadow-spatial-gold-glow transition-all active:scale-95 border border-white/20">
              + Register New Establishment
            </Button>
          </Link>
        </div>

        {loading ? (
          <RestaurantGridSkeleton count={3} />
        ) : restaurants.length === 0 ? (
          <div className="spatial-card p-12 text-center rounded-3xl bg-white/80 dark:bg-[#1a211c]/90 backdrop-blur-xl border border-stone-200/80 dark:border-stone-800/80 shadow-spatial-md max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center text-3xl mx-auto mb-4 border border-amber-500/20">
              🏪
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white mb-2">
              No Registered Establishments Yet
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mb-6 max-w-xs mx-auto">
              Join CordovaEats to showcase your authentic cuisine, manage your digital menu, and reach local diners.
            </p>
            <Link href="/dashboard/new">
              <Button className="bg-cordova-green hover:bg-cordova-greenHover text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow transition-all hover:scale-105 active:scale-95">
                Register Your Restaurant Now
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((r) => (
              <Link
                key={r.id}
                href={`/dashboard/${r.id}`}
                className="spatial-card p-6 rounded-2xl bg-white/80 dark:bg-[#1a211c]/90 backdrop-blur-xl border border-stone-200/80 dark:border-stone-800/80 hover:border-emerald-500/60 dark:hover:border-emerald-400/60 shadow-spatial-sm hover:shadow-spatial-md transition-all duration-300 block hover:-translate-y-1 group"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-serif font-bold text-base text-stone-900 dark:text-white group-hover:text-cordova-green dark:group-hover:text-emerald-400 transition-colors">
                    {r.name}
                  </h3>
                  <Badge color={STATUS_COLOR[r.status]}>{r.status}</Badge>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2">{r.address}</p>
                {r.status === 'rejected' && r.rejection_reason && (
                  <p className="text-xs text-red-500 mt-2 bg-red-500/10 p-2 rounded-lg border border-red-500/20">
                    Reason: {r.rejection_reason}
                  </p>
                )}
                {r.status === 'pending' && (
                  <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-2 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                    ⏳ Under municipal admin verification
                  </p>
                )}
                <div className="flex items-center gap-4 mt-4 pt-3 border-t border-stone-100 dark:border-stone-800/60 text-xs text-stone-500 dark:text-stone-400 font-medium">
                  <span>👁️ {r.view_count || 0} views</span>
                  <span>⭐ {Number(r.avg_rating || 5).toFixed(1)} ({r.review_count || 0})</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </RequireRole>
  );
}

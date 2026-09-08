'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from './ui/Skeleton';

/**
 * Leaflet touches `window` at import time, breaking Next.js SSR.
 * Dynamic client-only wrapper for FoodTrailMap.
 */
export const FoodTrailMapClient = dynamic(
  () => import('./FoodTrailMap').then((m) => m.FoodTrailMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[480px] rounded-2xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center p-8 border border-stone-200/80 dark:border-white/10">
        <div className="flex flex-col items-center gap-3 text-stone-400">
          <div className="w-10 h-10 border-4 border-cordova-green/30 border-t-cordova-green rounded-full animate-spin" />
          <span className="text-xs font-semibold tracking-wider uppercase">Loading Spatial Map...</span>
        </div>
      </div>
    ),
  }
);

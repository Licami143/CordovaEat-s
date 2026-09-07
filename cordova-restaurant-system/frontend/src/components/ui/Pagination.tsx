'use client';

import { Button } from './Button';
import type { PageMeta } from '@/lib/types';

export function Pagination({ meta, onPageChange }: { meta: PageMeta; onPageChange: (page: number) => void }) {
  if (meta.totalPages <= 1) return null;

  const pages = Array.from({ length: meta.totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === meta.totalPages || Math.abs(p - meta.page) <= 1
  );

  return (
    <nav className="flex items-center justify-center gap-2 mt-8" aria-label="Pagination">
      <button
        disabled={!meta.hasPrevPage}
        onClick={() => onPageChange(meta.page - 1)}
        aria-label="Previous page"
        className="px-3.5 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1a211c] text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-40 disabled:pointer-events-none transition-colors"
      >
        ← Prev
      </button>

      {pages.map((p, idx) => (
        <span key={p} className="flex items-center gap-1.5">
          {idx > 0 && pages[idx - 1] !== p - 1 && <span className="text-stone-400 px-1">…</span>}
          <button
            onClick={() => onPageChange(p)}
            aria-current={p === meta.page ? 'page' : undefined}
            className={`h-9 w-9 rounded-lg text-sm font-semibold transition-all duration-200 ${
              p === meta.page
                ? 'bg-cordova-green text-white shadow-md ring-2 ring-cordova-green/30 font-bold'
                : 'bg-white dark:bg-[#1a211c] border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-cordova-gold hover:text-cordova-green'
            }`}
          >
            {p}
          </button>
        </span>
      ))}

      <button
        disabled={!meta.hasNextPage}
        onClick={() => onPageChange(meta.page + 1)}
        aria-label="Next page"
        className="px-3.5 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1a211c] text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-40 disabled:pointer-events-none transition-colors"
      >
        Next →
      </button>
    </nav>
  );
}

'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Tag,
  Search,
  Sparkles,
  Calendar,
  Trash2,
  CheckCircle2,
  Clock,
  ExternalLink,
  Store,
  Percent,
} from 'lucide-react';
import { api, ApiClientError } from '@/lib/api';
import { useToast } from '@/lib/toast-context';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Skeleton } from '@/components/ui/Skeleton';
import { Modal } from '@/components/ui/Modal';
import { useDebounce } from '@/hooks/useDebounce';
import type { Promotion } from '@/lib/types';

function AdminPromotionsContent() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialStatus = searchParams.get('status') || 'active';
  const [status, setStatus] = useState(initialStatus);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [deleteTarget, setDeleteTarget] = useState<Promotion | null>(null);

  useEffect(() => {
    const urlStatus = searchParams.get('status') || 'active';
    if (urlStatus !== status) {
      setStatus(urlStatus);
    }
  }, [searchParams]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (status) params.set('status', status);
      if (debouncedSearch) params.set('search', debouncedSearch);
      params.set('limit', '50');
      const res = await api.get(`/api/admin/promotions?${params.toString()}`);
      setPromotions(res.data || []);
    } catch (err) {
      setPromotions([]);
      toast(err instanceof ApiClientError ? err.message : 'Failed to load promotions', 'error');
    } finally {
      setLoading(false);
    }
  }, [status, debouncedSearch, toast]);

  useEffect(() => {
    load();
  }, [load]);

  const handleTabChange = (newStatus: string) => {
    setStatus(newStatus);
    router.replace(`/admin/promotions?status=${newStatus}`, { scroll: false });
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await api.patch(`/api/admin/promotions/${id}/status`, { status: newStatus });
      toast(`Promotion marked as ${newStatus}`, 'success');
      load();
    } catch (err) {
      toast(err instanceof ApiClientError ? err.message : 'Failed to update promotion', 'error');
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/api/admin/promotions/${deleteTarget.id}`);
      toast('Promotion deleted permanently', 'info');
      setDeleteTarget(null);
      load();
    } catch (err) {
      toast(err instanceof ApiClientError ? err.message : 'Failed to delete promotion', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
          Promotion & Advertising Moderation
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Monitor dining deals, seasonal discounts, and featured advertising campaigns submitted by restaurant owners.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-[#1a211c] p-3 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'active', label: 'Active Deals', icon: Sparkles },
            { id: 'expired', label: 'Expired / Past', icon: Clock },
            { id: 'all', label: 'All Promotions', icon: Tag },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = status === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-cordova-green text-white shadow-sm'
                    : 'bg-stone-50 dark:bg-stone-800/60 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <Input
            placeholder="Search deals, restaurants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-3 py-1.5 text-xs w-full"
          />
        </div>
      </div>

      {/* Promotions List */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-48 w-full rounded-2xl" />
          <Skeleton className="h-48 w-full rounded-2xl" />
        </div>
      ) : promotions.length === 0 ? (
        <div className="spatial-card bg-white dark:bg-[#1a211c] border border-stone-200 dark:border-stone-800 rounded-3xl p-12 text-center text-stone-500">
          <Percent className="mx-auto text-amber-500 mb-3" size={40} />
          <p className="font-serif font-bold text-base text-stone-800 dark:text-stone-200">
            No promotions found under &ldquo;{status}&rdquo;
          </p>
          <p className="text-xs text-stone-400 mt-1">
            Try choosing a different status filter or clearing your search term.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {promotions.map((p) => {
            const isExpired = new Date(p.end_date) < new Date();
            const isActive = p.status === 'active' && !isExpired;

            return (
              <div
                key={p.id}
                className="spatial-card bg-white dark:bg-[#1a211c] border border-stone-200 dark:border-stone-800 rounded-2xl p-5 shadow-sm flex flex-col justify-between gap-4 transition-all hover:shadow-spatial-sm"
              >
                <div className="flex gap-4">
                  {/* Promo Image */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 shrink-0">
                    {p.image_url ? (
                      <Image
                        src={p.image_url}
                        alt={p.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-stone-400 p-2 text-center">
                        <Tag size={20} className="mb-1 text-amber-500" />
                        <span className="text-[10px] font-bold">Special Promo</span>
                      </div>
                    )}
                    {p.discount_label && (
                      <div className="absolute top-1.5 left-1.5 bg-cordova-gold text-stone-900 text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-sm">
                        {p.discount_label}
                      </div>
                    )}
                  </div>

                  {/* Promo Details */}
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-serif font-bold text-base text-stone-900 dark:text-white truncate">
                        {p.title}
                      </h2>
                      <Badge color={isActive ? 'success' : 'neutral'}>
                        {isActive ? 'Active' : isExpired ? 'Expired' : p.status}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-cordova-green dark:text-emerald-400 font-semibold truncate">
                      <Store size={13} className="shrink-0" />
                      <span>{p.restaurant_name || 'Partner Restaurant'}</span>
                    </div>

                    {p.description && (
                      <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2">
                        {p.description}
                      </p>
                    )}

                    <div className="flex items-center gap-1.5 text-[11px] text-stone-400 pt-1">
                      <Calendar size={12} />
                      <span>
                        {new Date(p.start_date).toLocaleDateString()} – {new Date(p.end_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-stone-800/80">
                  {p.restaurant_slug ? (
                    <Link href={`/restaurants/${p.restaurant_slug}`} target="_blank">
                      <Button variant="secondary" size="sm" className="text-xs">
                        <ExternalLink size={12} className="mr-1" /> Venue Profile
                      </Button>
                    </Link>
                  ) : (
                    <span />
                  )}

                  <div className="flex items-center gap-2">
                    {p.status === 'active' ? (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => updateStatus(p.id, 'expired')}
                        className="text-xs text-amber-600 dark:text-amber-400"
                      >
                        Mark Expired
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => updateStatus(p.id, 'active')}
                        className="bg-cordova-green hover:bg-cordova-greenHover text-white text-xs font-bold"
                      >
                        <CheckCircle2 size={12} className="mr-1" /> Reactivate
                      </Button>
                    )}

                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setDeleteTarget(p)}
                      className="text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                      title="Delete Promotion"
                    >
                      <Trash2 size={13} />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Promotion">
        <div className="space-y-4">
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300">
            Are you sure you want to permanently delete the promotion &ldquo;
            <span className="font-bold text-stone-900 dark:text-white">{deleteTarget?.title}</span>&rdquo;? This cannot be undone.
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs"
            >
              Confirm Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default function AdminPromotionsPage() {
  return (
    <Suspense fallback={<Skeleton className="h-96 w-full rounded-2xl" />}>
      <AdminPromotionsContent />
    </Suspense>
  );
}

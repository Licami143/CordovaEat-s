'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Sparkles, Utensils, Check, ArrowRight, Compass, ShieldCheck } from 'lucide-react';
import { api, ApiClientError } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import { useToast } from '@/lib/toast-context';
import type { PriceRange } from '@/lib/types';

const FOOD_TYPES = [
  'Filipino',
  'Seafood',
  'Bakasi & Shellfish',
  'Grill & BBQ',
  'Cebuano / Local',
  'Cafe',
  'Fast Food',
  'Pizza & Pasta',
  'Desserts & Milktea',
  'Resort Dining',
  'Street Food',
];

const DIETARY_OPTIONS = [
  { id: 'halal', label: 'Halal' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'no_pork', label: 'No Pork' },
  { id: 'gluten_free', label: 'Gluten-Free' },
];

const SERVICES_OPTIONS = [
  { id: 'seaside_view', label: 'Seaside / Sunset View' },
  { id: 'al_fresco', label: 'Outdoor / Al Fresco' },
  { id: 'live_music', label: 'Live Music' },
  { id: 'air_conditioned', label: 'Air Conditioned' },
  { id: 'dine_in', label: 'Dine-In' },
  { id: 'takeout', label: 'Takeout' },
  { id: 'delivery', label: 'Delivery' },
];

const PRICE_RANGES: { value: PriceRange; label: string; symbol: string }[] = [
  { value: 'budget', label: 'Budget', symbol: '₱' },
  { value: 'moderate', label: 'Moderate', symbol: '₱₱' },
  { value: 'expensive', label: 'Upscale', symbol: '₱₱₱' },
  { value: 'premium', label: 'Fine Dining', symbol: '₱₱₱₱' },
];

export default function PreferencesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isFirstTime = searchParams.get('firstTime') === 'true';
  const returnTo = searchParams.get('returnTo') || '/';
  const { user } = useAuth();
  const { showToast } = useToast();

  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<PriceRange | null>('budget');
  const [selectedDistance, setSelectedDistance] = useState<number>(10);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    async function loadExistingPreferences() {
      try {
        const res = await api.get('/api/users/me/preferences');
        if (res.data?.preferences) {
          const p = res.data.preferences;
          if (Array.isArray(p.preferred_cuisines)) setSelectedCuisines(p.preferred_cuisines);
          if (Array.isArray(p.dietary_restrictions)) setSelectedDietary(p.dietary_restrictions);
          if (Array.isArray(p.preferred_services)) setSelectedServices(p.preferred_services);
          if (p.budget_range) setSelectedBudget(p.budget_range);
          if (p.max_distance_km) setSelectedDistance(Number(p.max_distance_km));
        }
      } catch {
        // guest or no preferences set yet
      } finally {
        setFetching(false);
      }
    }
    loadExistingPreferences();
  }, []);

  const toggleCuisine = (item: string) => {
    setSelectedCuisines((prev) =>
      prev.some((x) => x.toLowerCase() === item.toLowerCase())
        ? prev.filter((x) => x.toLowerCase() !== item.toLowerCase())
        : [...prev, item]
    );
  };

  const toggleDietary = (id: string) => {
    setSelectedDietary((prev) =>
      prev.some((x) => x.toLowerCase() === id.toLowerCase())
        ? prev.filter((x) => x.toLowerCase() !== id.toLowerCase())
        : [...prev, id]
    );
  };

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.some((x) => x.toLowerCase() === id.toLowerCase())
        ? prev.filter((x) => x.toLowerCase() !== id.toLowerCase())
        : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      showToast('Please log in or sign up to save preferences', 'info');
      router.push(`/login?redirect=${encodeURIComponent('/preferences')}`);
      return;
    }

    setLoading(true);
    try {
      await api.put('/api/users/me/preferences', {
        preferredCuisines: selectedCuisines,
        dietaryRestrictions: selectedDietary,
        preferredServices: selectedServices,
        budgetRange: selectedBudget || null,
        maxDistanceKm: selectedDistance,
      });
      showToast(
        isFirstTime
          ? 'Preferences saved! Welcome to your personalized Cordova dining experience.'
          : 'Taste preferences updated successfully!',
        'success'
      );
      router.push(returnTo);
    } catch (err) {
      if (err instanceof ApiClientError) {
        showToast(err.message, 'error');
      } else {
        showToast('Failed to save preferences. Please try again.', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cordova-cream dark:bg-[#121614] flex items-center justify-center p-4 sm:p-6 my-auto relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-amber-500/10 dark:bg-amber-500/15 blur-[120px] pointer-events-none" />

      <div className="spatial-card max-w-2xl w-full p-6 sm:p-10 shadow-spatial-lg rounded-3xl border border-stone-200/80 dark:border-white/10 my-8 relative z-10 space-y-8 bg-white/90 dark:bg-[#1a211c]/90 backdrop-blur-2xl">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="relative h-16 w-16 mx-auto filter drop-shadow-md">
            <Image
              src="/cordova_eats_logo.png"
              alt="CordovaEats Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cordova-gold uppercase tracking-wider mb-1">
              <Sparkles size={14} className="animate-pulse" />
              {isFirstTime ? 'Step 2: Personalize Your Taste' : 'Dining Preferences'}
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white tracking-tight">
              {isFirstTime ? 'Welcome to CordovaEats!' : 'Your Dining Profile'}
            </h1>
            <p className="text-stone-500 dark:text-stone-400 text-xs sm:text-sm max-w-md mx-auto mt-1">
              Tell us what you love to eat. We will customize your restaurant recommendations and search rankings.
            </p>
          </div>
        </div>

        {fetching ? (
          <div className="py-16 text-center text-stone-400 text-sm flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-cordova-green border-t-transparent animate-spin" />
            <span>Loading your taste profile...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8 text-left">
            {/* 1. Cuisines */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 flex items-center gap-2">
                  <Utensils size={15} className="text-cordova-green dark:text-emerald-400" />
                  Favorite Cuisines & Food Types
                </label>
                {selectedCuisines.length > 0 && (
                  <span className="text-[11px] font-semibold text-cordova-green dark:text-emerald-400">
                    {selectedCuisines.length} selected
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {FOOD_TYPES.map((type) => {
                  const selected = selectedCuisines.some((c) => c.toLowerCase() === type.toLowerCase());
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => toggleCuisine(type)}
                      className={`py-2 px-3.5 rounded-full border text-xs font-medium transition-all duration-200 ${
                        selected
                          ? 'border-cordova-green dark:border-emerald-500 bg-cordova-green dark:bg-emerald-600 text-white shadow-spatial-sm font-bold scale-105'
                          : 'border-stone-200 dark:border-white/10 bg-white/70 dark:bg-white/5 text-stone-800 dark:text-stone-200 hover:border-cordova-green/50 dark:hover:border-emerald-400/50'
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Dietary Restrictions */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 flex items-center gap-2">
                <ShieldCheck size={15} className="text-cordova-gold" />
                Dietary Requirements
              </label>
              <div className="flex flex-wrap gap-2">
                {DIETARY_OPTIONS.map((item) => {
                  const selected = selectedDietary.some((d) => d.toLowerCase() === item.id.toLowerCase());
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleDietary(item.id)}
                      className={`py-2 px-3.5 rounded-full border text-xs font-semibold tracking-wider transition-all duration-200 ${
                        selected
                          ? 'border-cordova-gold bg-gradient-to-r from-cordova-gold to-amber-600 text-white shadow-spatial-sm font-bold scale-105'
                          : 'border-stone-200 dark:border-white/10 bg-white/70 dark:bg-white/5 text-stone-700 dark:text-stone-300 hover:border-cordova-gold/50'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Atmosphere & Amenities */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 flex items-center gap-2">
                <Compass size={15} className="text-amber-500" />
                Preferred Atmosphere & Amenities
              </label>
              <div className="flex flex-wrap gap-2">
                {SERVICES_OPTIONS.map((service) => {
                  const selected = selectedServices.some((s) => s.toLowerCase() === service.id.toLowerCase());
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => toggleService(service.id)}
                      className={`py-2 px-3.5 rounded-full border text-xs font-medium transition-all duration-200 ${
                        selected
                          ? 'border-emerald-600 bg-emerald-600 dark:bg-emerald-700 text-white shadow-spatial-sm font-bold scale-105'
                          : 'border-stone-200 dark:border-white/10 bg-white/70 dark:bg-white/5 text-stone-700 dark:text-stone-300 hover:border-emerald-500/50'
                      }`}
                    >
                      {service.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Target Budget */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200">
                Preferred Price Tier
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {PRICE_RANGES.map((pr) => {
                  const selected = selectedBudget === pr.value;
                  return (
                    <button
                      key={pr.value}
                      type="button"
                      onClick={() => setSelectedBudget(pr.value)}
                      className={`p-3 rounded-2xl border text-center transition-all duration-200 flex flex-col items-center justify-center gap-1 ${
                        selected
                          ? 'border-cordova-green dark:border-emerald-500 bg-cordova-green/10 dark:bg-emerald-500/10 text-cordova-green dark:text-emerald-400 font-bold ring-2 ring-cordova-green/30'
                          : 'border-stone-200 dark:border-white/10 bg-white/70 dark:bg-white/5 text-stone-700 dark:text-stone-300 hover:border-cordova-green/40'
                      }`}
                    >
                      <span className="font-mono text-base font-bold">{pr.symbol}</span>
                      <span className="text-xs font-medium">{pr.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Max Proximity Distance */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200">
                <span>Maximum Distance</span>
                <span className="text-cordova-green dark:text-emerald-400 font-mono text-sm">{selectedDistance} km</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={selectedDistance}
                onChange={(e) => setSelectedDistance(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-cordova-green dark:accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-stone-400">
                <span>1 km (Nearby Only)</span>
                <span>20 km (All Cordova & Surrounds)</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-stone-200/80 dark:border-white/10">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-cordova-gold via-amber-500 to-amber-600 hover:from-cordova-goldHover hover:to-amber-700 text-white font-bold py-3.5 px-6 rounded-2xl text-xs uppercase tracking-wider shadow-spatial-md transition-all duration-200 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                ) : (
                  <>
                    <span>{isFirstTime ? 'Complete Sign Up & Discover Restaurants' : 'Save Preferences'}</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => router.push(returnTo)}
                className="w-full py-2.5 text-xs font-semibold text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-white transition-colors"
              >
                {isFirstTime ? 'Skip for now (I’ll set it up in My Profile later)' : 'Cancel & Back to Home'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

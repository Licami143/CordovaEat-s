'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  MapPin,
  Clock,
  Star,
  Navigation,
  ExternalLink,
  Sparkles,
  ChevronRight,
  LocateFixed,
  Route as RouteIcon,
  CheckCircle2,
  UtensilsCrossed,
  Share2,
} from 'lucide-react';
import { CORDOVA_FOOD_TRAILS, FoodTrail, TrailStop } from '@/data/foodTrails';
import { FoodTrailMapClient } from '@/components/FoodTrailMapClient';

function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

export default function FoodTrailsPage() {
  const [activeTrailId, setActiveTrailId] = useState<string>(CORDOVA_FOOD_TRAILS[0].id);
  const [selectedStop, setSelectedStop] = useState<TrailStop | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentTrail =
    CORDOVA_FOOD_TRAILS.find((t) => t.id === activeTrailId) || CORDOVA_FOOD_TRAILS[0];

  // Request user location on mount or when requested
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setLocating(false);
      },
      () => {
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleShareTrail = () => {
    if (navigator.share) {
      navigator.share({
        title: `${currentTrail.title} — Cordova Eats`,
        text: `Check out the ${currentTrail.title} food trail in Cordova, Cebu!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-cordova-cream dark:bg-[#121614] pb-24 relative overflow-hidden">
      {/* Ambient Lighting Cones */}
      <div className="absolute top-[15%] left-[-10%] w-[550px] h-[550px] rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 blur-[130px] pointer-events-none -z-0" />
      <div className="absolute top-[50%] right-[-10%] w-[500px] h-[500px] rounded-full bg-amber-500/10 dark:bg-amber-500/15 blur-[120px] pointer-events-none -z-0" />

      {/* HERO / HEADER SECTION */}
      <section className="pt-10 pb-8 px-4 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cordova-gold/15 text-cordova-gold dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-md border border-cordova-gold/30">
            <Compass size={14} className="animate-spin" style={{ animationDuration: '12s' }} />
            <span>Curated Culinary Tours</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 dark:text-white tracking-tight mb-3">
            Cordova Food Trails & Spatial Map
          </h1>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-sans">
            Explore curated gastronomic routes across Cordova’s 13 coastal barangays.
            Follow the interactive map, track live distance from your location, and discover signature island dishes.
          </p>
        </div>

        {/* TRAIL SELECTOR PILLS */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 overflow-x-auto pb-2 scrollbar-none max-w-4xl mx-auto">
          {CORDOVA_FOOD_TRAILS.map((trail) => {
            const isActive = trail.id === activeTrailId;
            return (
              <button
                key={trail.id}
                onClick={() => {
                  setActiveTrailId(trail.id);
                  setSelectedStop(null);
                }}
                className={`spatial-pill whitespace-nowrap text-xs font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-cordova-green dark:bg-emerald-700 text-white shadow-spatial-md scale-105 border-cordova-green dark:border-emerald-500 ring-2 ring-cordova-green/30'
                    : 'text-stone-700 dark:text-stone-200 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                <span className="text-sm">{trail.icon}</span>
                <span>{trail.title.replace(' Trail', '').replace(' Crawl', '')}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ACTIVE TRAIL OVERVIEW BANNER */}
      <section className="px-4 max-w-7xl mx-auto mb-8 relative z-10">
        <div className="spatial-card p-6 sm:p-8 overflow-hidden relative border border-stone-200/80 dark:border-white/10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${currentTrail.badgeColor}`}>
                  {currentTrail.theme.toUpperCase()} TRAIL
                </span>
                <div className="flex items-center gap-1 text-xs font-semibold text-cordova-gold">
                  <Star size={14} className="fill-cordova-gold" />
                  <span>{currentTrail.rating} Rating</span>
                </div>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
                {currentTrail.title}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                {currentTrail.description}
              </p>
            </div>

            {/* Quick Stats Badges */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
              <div className="p-3.5 rounded-xl bg-stone-100/80 dark:bg-white/5 border border-stone-200/60 dark:border-white/5 text-center min-w-[90px]">
                <div className="text-stone-500 dark:text-stone-400 text-[10px] uppercase font-bold tracking-wider">Stops</div>
                <div className="text-lg font-serif font-bold text-stone-900 dark:text-white">{currentTrail.stopsCount}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-100/80 dark:bg-white/5 border border-stone-200/60 dark:border-white/5 text-center min-w-[90px]">
                <div className="text-stone-500 dark:text-stone-400 text-[10px] uppercase font-bold tracking-wider">Distance</div>
                <div className="text-lg font-serif font-bold text-stone-900 dark:text-white">~{currentTrail.estimatedDistanceKm} km</div>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-100/80 dark:bg-white/5 border border-stone-200/60 dark:border-white/5 text-center min-w-[105px]">
                <div className="text-stone-500 dark:text-stone-400 text-[10px] uppercase font-bold tracking-wider">Duration</div>
                <div className="text-sm font-serif font-bold text-stone-900 dark:text-white mt-1">{currentTrail.estimatedDuration}</div>
              </div>
              <button
                onClick={handleShareTrail}
                className="p-3.5 rounded-xl bg-stone-100/80 dark:bg-white/5 hover:bg-stone-200 dark:hover:bg-white/10 border border-stone-200/60 dark:border-white/5 text-stone-700 dark:text-stone-200 transition-colors"
                title="Share this Food Trail"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SPLIT SCREEN MAIN CONTENT */}
      <section className="px-4 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE: STEP-BY-STEP ITINERARY CHECKLIST (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* GPS STATUS BAR */}
            <div className="spatial-card p-4 flex items-center justify-between gap-3 border border-stone-200/80 dark:border-white/10">
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-full ${userLocation ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-stone-100 dark:bg-white/5 text-stone-500'}`}>
                  <LocateFixed size={18} className={locating ? 'animate-spin' : ''} />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900 dark:text-white">
                    {userLocation ? 'GPS Location Active' : 'Enable Live GPS Distance'}
                  </div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400">
                    {userLocation
                      ? 'Distances calculated from your live coordinates.'
                      : 'Tap to see distances from where you are in Cordova.'}
                  </div>
                </div>
              </div>
              <button
                onClick={handleLocateMe}
                disabled={locating}
                className="bg-cordova-green hover:bg-cordova-greenHover dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white text-[11px] font-bold px-3.5 py-2 rounded-xl shadow-spatial-sm transition-all active:scale-95 shrink-0"
              >
                {locating ? 'Locating...' : userLocation ? 'Update GPS' : 'Locate Me'}
              </button>
            </div>

            {/* STOPS LIST */}
            <div className="space-y-3.5">
              <div className="flex items-center justify-between px-1">
                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
                  <RouteIcon size={17} className="text-cordova-gold" />
                  Trail Stops Itinerary
                </h3>
                <span className="text-xs text-stone-500 font-medium">Click a stop to focus on map</span>
              </div>

              {currentTrail.stops.map((stop, idx) => {
                const isSelected = selectedStop?.restaurantSlug === stop.restaurantSlug;
                const distance = userLocation
                  ? calculateDistanceKm(userLocation.lat, userLocation.lng, stop.latitude, stop.longitude)
                  : null;

                return (
                  <motion.div
                    key={stop.restaurantSlug}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: idx * 0.05 }}
                    onClick={() => setSelectedStop(stop)}
                    className={`spatial-card p-4 sm:p-5 cursor-pointer transition-all duration-200 relative ${
                      isSelected
                        ? 'border-cordova-gold dark:border-cordova-gold ring-2 ring-cordova-gold/40 bg-amber-500/10 dark:bg-amber-500/15 shadow-spatial-md scale-[1.01]'
                        : 'hover:border-cordova-green/50 dark:hover:border-emerald-500/40'
                    }`}
                  >
                    {/* Header Row */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-cordova-green to-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-spatial-sm">
                          {stop.order}
                        </div>
                        <div>
                          <h4 className="font-serif font-bold text-base text-stone-900 dark:text-white leading-tight">
                            {stop.name}
                          </h4>
                          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 flex items-center gap-1">
                            <MapPin size={12} className="text-cordova-gold shrink-0" />
                            <span>{stop.barangay}, Cordova</span>
                          </p>
                        </div>
                      </div>

                      {/* Distance Pill if available */}
                      {distance !== null && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                          {distance} km away
                        </span>
                      )}
                    </div>

                    {/* Highlight Description */}
                    <p className="text-xs text-stone-600 dark:text-stone-300 mt-2.5 leading-relaxed font-sans">
                      {stop.highlight}
                    </p>

                    {/* Must Try Dish & Best Time */}
                    <div className="mt-3 pt-3 border-t border-stone-100 dark:border-white/5 space-y-1.5 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-cordova-gold font-bold text-[11px] shrink-0">✨ Must Try:</span>
                        <span className="text-stone-800 dark:text-stone-200 font-medium truncate">{stop.mustTryDish}</span>
                      </div>
                      <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400 text-[11px]">
                        <Clock size={12} className="shrink-0" />
                        <span>Best visit: {stop.bestTime}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-3.5 pt-2 border-t border-stone-100 dark:border-white/5">
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${stop.latitude},${stop.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-cordova-gold to-amber-600 hover:from-cordova-goldHover hover:to-amber-700 text-white text-xs font-bold py-2 px-3 rounded-xl shadow-spatial-sm transition-all active:scale-95"
                      >
                        <Navigation size={13} />
                        <span>Directions</span>
                      </a>
                      <Link
                        href={`/restaurants/${stop.restaurantSlug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center justify-center gap-1 bg-stone-100 dark:bg-white/10 hover:bg-stone-200 dark:hover:bg-white/15 text-stone-800 dark:text-white text-xs font-semibold py-2 px-3.5 rounded-xl transition-colors border border-stone-200 dark:border-white/10"
                      >
                        <span>View Menu</span>
                        <ExternalLink size={12} />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE: INTERACTIVE SPATIAL MAP (7 cols sticky) */}
          <div className="lg:col-span-7 sticky top-28 h-[550px] sm:h-[650px]">
            <FoodTrailMapClient
              trail={currentTrail}
              selectedStop={selectedStop}
              onSelectStop={(stop) => setSelectedStop(stop)}
              userLocation={userLocation}
            />

            {/* Map Info Overlay Banner */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/85 dark:bg-[#141815]/90 backdrop-blur-2xl rounded-xl p-3.5 border border-white/60 dark:border-white/10 shadow-spatial-md flex items-center justify-between text-xs z-10">
              <div className="flex items-center gap-2 text-stone-700 dark:text-stone-300">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold">{currentTrail.stops.length} Stops along {currentTrail.title}</span>
              </div>
              <span className="text-[11px] text-stone-500 dark:text-stone-400 hidden sm:inline">
                Tap numbered pins for directions
              </span>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

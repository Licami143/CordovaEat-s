'use client';

import { memo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Star } from 'lucide-react';
import type { Restaurant } from '@/lib/types';
import { applyRestaurantCustomization } from '@/data/restaurants';

export const RestaurantCard = memo(function RestaurantCard({
  restaurant: rawRestaurant,
  matchScore,
}: {
  restaurant: Restaurant;
  matchScore?: number;
}) {
  const restaurant = applyRestaurantCustomization(rawRestaurant);
  const [imgError, setImgError] = useState(false);
  const ratingVal = Number(restaurant.avg_rating || 4.5).toFixed(1);
  const locationText = restaurant.barangay
    ? `${restaurant.barangay}, Cordova`
    : restaurant.address || 'Cordova, Cebu';

  const isSponsored = Boolean(restaurant.isSponsored || rawRestaurant.isSponsored);
  const displayScore =
    matchScore !== undefined
      ? matchScore
      : restaurant.relevance_score !== undefined
      ? Math.round(restaurant.relevance_score * 100)
      : undefined;

  const hasValidImage =
    Boolean(
      restaurant.cover_image_url &&
        (restaurant.cover_image_url.startsWith('http') ||
          restaurant.cover_image_url.startsWith('/'))
    ) && !imgError;

  return (
    <div className={`bg-white dark:bg-[#1a211c] rounded-lg border transition-all duration-300 flex flex-col h-full group ${
      isSponsored
        ? 'border-amber-400/80 dark:border-amber-600/60 shadow-md ring-1 ring-amber-400/20'
        : 'border-stone-200/80 dark:border-stone-800/80 shadow-sm hover:shadow-md'
    }`}>
      {/* Cover Image */}
      <div className="relative h-48 sm:h-52 w-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
        {hasValidImage ? (
          <Image
            src={restaurant.cover_image_url!}
            alt={restaurant.name}
            fill
            unoptimized
            onError={() => setImgError(true)}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center text-4xl bg-gradient-to-br from-amber-50 to-stone-100 dark:from-stone-800 dark:to-stone-900 text-stone-400">
            <span className="text-3xl mb-1">🍽️</span>
            <span className="text-xs font-serif font-semibold text-stone-500 dark:text-stone-400">
              CordovaEats
            </span>
          </div>
        )}

        {/* Sponsored Badge (Top Left) */}
        {isSponsored && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className="bg-amber-500/90 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm backdrop-blur-sm flex items-center gap-1">
              <span>★</span> Sponsored
            </span>
          </div>
        )}

        {/* Match / Relevance Score (Top Right) */}
        {displayScore !== undefined && (
          <div className="absolute top-2.5 right-2.5 z-10">
            <span className="bg-cordova-green/90 text-white text-xs font-semibold px-2.5 py-1 rounded shadow-sm backdrop-blur-sm">
              {Math.round(displayScore)}% match
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-2.5">
          {/* Title */}
          <div>
            <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white leading-tight group-hover:text-cordova-green transition-colors">
              {restaurant.name}
            </h3>
            {restaurant.price_range && (
              <span className="text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                {restaurant.price_range} • {restaurant.category || restaurant.cuisines?.[0] || 'Restaurant'}
              </span>
            )}
          </div>

          {/* Location & Distance */}
          <div className="flex items-center justify-between text-xs text-stone-600 dark:text-stone-300">
            <div className="flex items-center gap-1.5 min-w-0">
              <MapPin size={14} className="text-cordova-gold shrink-0" />
              <span className="truncate">{locationText}</span>
            </div>
            {restaurant.distance_km != null && (
              <span className="shrink-0 text-stone-500 font-medium ml-2">
                {restaurant.distance_km} km
              </span>
            )}
          </div>

          {/* Rating & Availability */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 font-semibold text-stone-800 dark:text-stone-200">
              <Star size={14} className="fill-cordova-gold text-cordova-gold" />
              <span>{ratingVal}</span>
              <span className="text-stone-400 font-normal">({restaurant.review_count || 0})</span>
            </div>

            {restaurant.is_open === false ? (
              <span className="text-red-500 font-medium text-[11px]">Closed</span>
            ) : (
              <span className="text-emerald-600 dark:text-emerald-400 font-medium text-[11px]">Open now</span>
            )}
          </div>

          {/* Matched Menu Items Preview */}
          {restaurant.matched_menu_items && restaurant.matched_menu_items.length > 0 && (
            <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80">
              <p className="text-[11px] font-semibold text-stone-500 dark:text-stone-400 mb-1">
                Matching dishes:
              </p>
              <div className="flex flex-wrap gap-1">
                {restaurant.matched_menu_items.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 text-[10px] px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800"
                  >
                    {item.name} (₱{item.price})
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <Link
          href={`/restaurants/${restaurant.slug}`}
          className="w-full bg-cordova-green hover:bg-cordova-greenHover text-white font-medium text-sm py-2.5 rounded text-center transition-colors duration-200 shadow-sm block mt-2"
        >
          View Details
        </Link>
      </div>
    </div>
  );
});

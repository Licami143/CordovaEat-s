'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import Image from 'next/image';
import Link from 'next/link';
import { Navigation, Star, Clock, MapPin, ExternalLink, Sparkles } from 'lucide-react';
import type { FoodTrail, TrailStop } from '@/data/foodTrails';

// Cordova, Cebu center coordinates
const CORDOVA_CENTER: [number, number] = [10.2535, 123.9490];

function createTrailMarkerIcon(order: number, isSelected: boolean, theme: string) {
  const bgColors: Record<string, string> = {
    seafood: 'linear-gradient(135deg, #0891b2, #0d9488)',
    cafe: 'linear-gradient(135deg, #d97706, #e11d48)',
    bbq: 'linear-gradient(135deg, #ea580c, #b91c1c)',
    family: 'linear-gradient(135deg, #059669, #4338ca)',
  };

  const bg = bgColors[theme] || 'linear-gradient(135deg, #1B5232, #D4A017)';
  const scale = isSelected ? 'scale(1.2)' : 'scale(1)';
  const ring = isSelected ? 'box-shadow: 0 0 0 4px rgba(212, 160, 23, 0.6), 0 8px 20px rgba(0,0,0,0.4);' : 'box-shadow: 0 4px 12px rgba(0,0,0,0.3);';

  return new L.DivIcon({
    html: `
      <div style="
        transform: ${scale};
        transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        background: ${bg};
        ${ring}
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 2.5px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 800;
        font-size: 13px;
        font-family: ui-sans-serif, system-ui, sans-serif;
      ">
        ${order}
      </div>
    `,
    className: 'spatial-map-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
  });
}

function MapController({
  stops,
  selectedStop,
}: {
  stops: TrailStop[];
  selectedStop: TrailStop | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedStop) {
      map.flyTo([selectedStop.latitude, selectedStop.longitude], 16, { duration: 1.2 });
    } else if (stops.length > 0) {
      const bounds = L.latLngBounds(stops.map((s) => [s.latitude, s.longitude]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    }
  }, [stops, selectedStop, map]);

  return null;
}

export function FoodTrailMap({
  trail,
  selectedStop,
  onSelectStop,
  userLocation,
}: {
  trail: FoodTrail;
  selectedStop: TrailStop | null;
  onSelectStop?: (stop: TrailStop) => void;
  userLocation?: { lat: number; lng: number } | null;
}) {
  const positions: [number, number][] = trail.stops.map((s) => [s.latitude, s.longitude]);

  const polylineColors: Record<string, string> = {
    seafood: '#06b6d4',
    cafe: '#f59e0b',
    bbq: '#f97316',
    family: '#10b981',
  };

  const polylineColor = polylineColors[trail.theme] || '#D4A017';

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-stone-200/80 dark:border-white/10 shadow-spatial-md">
      <MapContainer
        center={CORDOVA_CENTER}
        zoom={14}
        className="h-full w-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Trail Polyline Route */}
        {positions.length > 1 && (
          <>
            {/* Ambient Route Glow */}
            <Polyline
              positions={positions}
              pathOptions={{
                color: polylineColor,
                weight: 8,
                opacity: 0.35,
                lineCap: 'round',
                lineJoin: 'round',
              }}
            />
            {/* Core Route Line */}
            <Polyline
              positions={positions}
              pathOptions={{
                color: polylineColor,
                weight: 4,
                opacity: 0.95,
                dashArray: '6, 8',
                lineCap: 'round',
              }}
            />
          </>
        )}

        {/* Stop Markers */}
        {trail.stops.map((stop) => {
          const isSelected = selectedStop?.restaurantSlug === stop.restaurantSlug;
          return (
            <Marker
              key={stop.restaurantSlug}
              position={[stop.latitude, stop.longitude]}
              icon={createTrailMarkerIcon(stop.order, isSelected, trail.theme)}
              eventHandlers={{
                click: () => onSelectStop?.(stop),
              }}
            >
              <Popup className="spatial-leaflet-popup">
                <div className="w-64 p-1 text-stone-900 dark:text-white font-sans">
                  {/* Photo Thumbnail */}
                  {stop.coverImage && (
                    <div className="relative h-28 w-full rounded-xl overflow-hidden mb-2.5 bg-stone-100">
                      <Image
                        src={stop.coverImage}
                        alt={stop.name}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Stop #{stop.order}
                      </div>
                    </div>
                  )}

                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-sm text-stone-900 leading-tight">
                      {stop.name}
                    </h4>
                    <p className="text-[11px] text-stone-500 flex items-center gap-1">
                      <MapPin size={12} className="text-cordova-gold shrink-0" />
                      <span>{stop.barangay}, Cordova</span>
                    </p>
                  </div>

                  <div className="my-2 p-2 rounded-lg bg-stone-50 border border-stone-200/80 text-[11px]">
                    <span className="font-semibold text-stone-700 block mb-0.5">✨ Must Try:</span>
                    <span className="text-stone-600 font-medium">{stop.mustTryDish}</span>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${stop.latitude},${stop.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1 bg-[#1B5232] hover:bg-[#143E26] text-white text-[11px] font-semibold py-1.5 px-2 rounded-lg shadow-sm transition-colors text-center"
                    >
                      <Navigation size={12} />
                      <span>Directions</span>
                    </a>
                    <Link
                      href={`/restaurants/${stop.restaurantSlug}`}
                      className="inline-flex items-center justify-center gap-1 bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-semibold py-1.5 px-2.5 rounded-lg transition-colors border border-stone-300"
                    >
                      <span>Menu</span>
                      <ExternalLink size={11} />
                    </Link>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* User GPS Location Marker */}
        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={
              new L.DivIcon({
                html: `
                  <div style="position:relative;width:20px;height:20px;">
                    <div style="position:absolute;inset:-6px;background:rgba(59, 130, 246, 0.35);border-radius:50%;animation:ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
                    <div style="position:absolute;inset:0;background:#2563eb;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>
                  </div>
                `,
                className: '',
                iconSize: [20, 20],
                iconAnchor: [10, 10],
              })
            }
          >
            <Popup>
              <div className="text-xs font-semibold p-1">📍 You are here</div>
            </Popup>
          </Marker>
        )}

        <MapController stops={trail.stops} selectedStop={selectedStop} />
      </MapContainer>
    </div>
  );
}

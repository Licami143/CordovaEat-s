import type { Restaurant } from '@/lib/types';

/**
 * ============================================================================
 * 🍽️ RESTAURANT FRONTEND DIRECTORY & CUSTOMIZATIONS
 * ============================================================================
 * All 27 verified Cordova restaurants, organized and numbered.
 * ============================================================================
 */

export type EstablishmentCategory = 'Fast Food' | 'Restaurant' | 'Cafe' | 'Street Food' | 'Resto Bar' | 'Pizza';

export interface RestaurantCustomConfig {
  name: string;
  category: EstablishmentCategory;
  coverImage?: string | null;
  barangay?: string;
  description?: string;
  phone?: string;
  address?: string;
  hidden?: boolean;
}

export const RESTAURANT_CUSTOMIZATIONS: Record<string, RestaurantCustomConfig> = {

  // 1. Horizon Bean Cafe
  'horizon-bean-cafe': {
    name: 'Horizon Bean Cafe',
    category: 'Cafe',
    coverImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1000&auto=format&fit=crop&q=85',
    barangay: 'San Miguel',
    description: 'A cozy, small-scale neighborhood coffee shop known for its premium coffee, comfort food, and late-night chill vibe.',
    address: 'San Miguel, Cordova, Cebu',
    phone: '',
  },

  // 2. Grillhouse Cordova BBQ
  'grillhouse-cordova-bbq': {
    name: 'Grillhouse Cordova BBQ',
    category: 'Restaurant',
    coverImage: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1000&auto=format&fit=crop&q=85',
    barangay: 'Ibabao',
    description: 'Classic Filipino BBQ and grilled favorites, budget-friendly family dining.',
    address: 'San Miguel Road, Ibabao',
    phone: '+639201112235',
  },

  // 3. Street Food Park
  'street-food-park': {
    name: 'Street Food Park',
    category: 'Street Food',
    coverImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1000&auto=format&fit=crop&q=85',
    barangay: 'Poblacion',
    description: 'affordable local street food and fresh seafood paired with a cool ocean breeze and sunset.',
    address: 'Roro Port, Cordova, Cebu',
    phone: '',
  },

  // 4. ABY ROAD Resto Bar
  'aby-road-resto-bar': {
    name: 'ABY ROAD Resto Bar',
    category: 'Resto Bar',
    coverImage: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1000&auto=format&fit=crop&q=85',
    barangay: 'Bangbang',
    description: 'Beatles-inspired restobar.',
    address: 'Bangbang, Cordova, Cebu',
    phone: '',
  },

  // 5. Eat n' Repeat
  'eat-n-repeat': {
    name: 'Eat n\' Repeat',
    category: 'Cafe',
    coverImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1000&auto=format&fit=crop&q=85',
    barangay: 'Bangbang',
    description: 'aesthetic at Instagram-worthy na cafe at tambayan.',
    address: 'Bangbang, Cordova, Cebu',
    phone: '',
  },

  // 6. Taytayan Pinoy Restaurant
  'taytayan-pinoy-restaurant': {
    name: 'Taytayan Pinoy Restaurant',
    category: 'Restaurant',
    coverImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1000&auto=format&fit=crop&q=85',
    barangay: 'Ibabao',
    description: 'ay isang kilalang open-air at lutong-bahay na kainan.',
    address: 'Ibabao, Cordova, Cebu',
    phone: '',
  },

  // 7. STUFFED N' FRIED Cordova Branch 
  'stuffed-n-fried-cordova': {
    name: 'STUFFED N\' FRIED Cordova Branch',
    category: 'Restaurant',
    coverImage: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=1000&auto=format&fit=crop&q=85',
    barangay: 'Gabi',
    description: 'a popular local chicken house in Cebu known for its signature double-fried, 15-spice Batter-Fried Whole Chicken, crispy lechon kawali, and special ngohiong.',
    address: 'Gabi, Cordova, Cebu',
    phone: '',
  },

  // 8. McDonald's Cordova 
  'mcdonalds-cordova': {
    name: 'McDonald\'s Cordova',
    category: 'Fast Food',
    coverImage: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=1000&auto=format&fit=crop&q=85',
    barangay: 'San Miguel',
    description: 'the world\'s largest chain of hamburger fast-food restaurants.',
    address: 'San Miguel, Cordova, Cebu',
    phone: '',
  },

  // 9. Barracks Grill and Resto Bar 
  'barracks-grill-and-resto-bar': {
    name: 'Barracks Grill and Resto Bar',
    category: 'Resto Bar',
    coverImage: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=1000&auto=format&fit=crop&q=85',
    barangay: 'Gabi',
    description: 'casual nightspot and dining place.',
    address: 'Gabi, Cordova, Cebu',
    phone: '',
  },

  // 10. BRIC Food Park 
  'bric-food-park': {
    name: 'BRIC Food Park',
    category: 'Street Food',
    coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000&auto=format&fit=crop&q=85',
    barangay: 'San Miguel',
    description: 'a vibrant, open-air al fresco dining destination.',
    address: 'San Miguel, Cordova, Cebu',
    phone: '',
  },

  // 11. RCA Bilao Food Station
  'rca-bilao-food-station': {
    name: 'RCA Bilao Food Station',
    category: 'Restaurant',
    coverImage: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1000&auto=format&fit=crop&q=85',
    barangay: 'Gabi',
    description: 'Pansit stir-fry, boneless lechon belly, kakanin sa bilao, ug lain-laing food trays.',
    address: 'Gabi, Cordova, Cebu',
    phone: '+63 912 345 6780',
  },

  // 12. MAVERICKS by The Baker Street 
  'mavericks-by-the-baker-street': {
    name: 'MAVERICKS by The Baker Street',
    category: 'Cafe',
    coverImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1000&auto=format&fit=crop&q=85',
    barangay: 'Gabi',
    description: 'Creative space Collective Stories Local Hangouts After hours refuge Pastry Party Coffee Catch up.',
    address: 'Gabi, Cordova, Cebu',
    phone: '+63 917 123 4567',
  },
 
  // 13. Entoys Bakasihan
  'entoys-bakasihan': {
    name: 'Entoys Bakasihan',
    category: 'Restaurant',
    coverImage: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=1000&auto=format&fit=crop&q=85',
    barangay: 'Buagsong',
    description: 'a popular open-air, casual eatery located in Barangay Buagsong, Cordova, Cebu, famous for its signature reef eel dish called nilarang na bakasi.',
    address: 'Buagsong, Cordova, Cebu',
    phone: '+63 912 345 6789',
  },

  // 14. Tita Kim's
  'tita-kims': {
    name: 'Tita Kims',
    category: 'Restaurant',
    coverImage: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=1000&auto=format&fit=crop&q=85',
    barangay: 'Gabi',
    description: 'an affordable, buffet-style Filipino restaurant located along the National Highway in Barangay Gabi, Cordova, Cebu.',
    address: 'National Highway, Gabi, Cordova, Cebu',
    phone: '+63 917 888 9900',
  },

  // 15. Burandat Seafood Bucket
  'burandat-seafood-bucket': {
    name: 'Burandat Seafood Bucket',
    category: 'Restaurant',
    coverImage: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=1000&auto=format&fit=crop&q=85',
    barangay: 'Gabi',
    description: 'Fresh catch-of-the-day seafood grilled to order, right by the shoreline.',
    address: 'Sitio Mactan, Gabi',
    phone: '+639201112233',
  },

  // 16. Csalt Cafe Cordova
  'csalt-cafe-cordova': {
    name: 'Csalt Cafe Cordova',
    category: 'Cafe',
    coverImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1000&auto=format&fit=crop&q=85',
    barangay: 'Poblacion',
    description: 'Cozy cafe with ocean views, specializing in coffee, pastries and light vegetarian meals.',
    address: 'Poblacion Cordova, near the wharf',
    phone: '+639201112234',
  },

  // 17. Cafe Mafia
  'cafe-mafia': {
    name: 'Cafe Mafia',
    category: 'Cafe',
    coverImage: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=1000&auto=format&fit=crop&q=85',
    barangay: 'Poblacion',
    description: '[Name confirmed, location approximate] A casual cafe in Cordova mentioned for its burgers and coffee. Exact address not independently verified — location shown is approximate.',
    address: 'Cordova, Cebu (exact address unverified)',
    phone: '',
  },

  // 18. Solea Mactan Resort
  'solea-mactan-resort': {
    name: 'Solea Mactan Resort',
    category: 'Pizza',
    coverImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1000&auto=format&fit=crop&q=85',
    barangay: 'Alegria',
    description: '[Verified] The in-house restaurant of Solea Mactan Resort, serving pizza, international, and Filipino dishes. Popular with resort guests and open to walk-in diners.',
    address: 'Victor Wahing Street, Alegria',
    phone: '',
  },    

  // 19. Husby's Grill
  'husbys-grill': {
    name: 'Husby\'s Grill',
    category: 'Restaurant',
    coverImage: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=1000&auto=format&fit=crop&q=85',
    barangay: 'Gabi',
    description: '[Verified] An outdoor grill restaurant in Barangay Gabi known for affordable Filipino grilled dishes — tuna belly, baby back ribs, kinilaw, and panga are frequently mentioned favorites.',
    address: 'Manuel L. Quezon Road, Gabi',
    phone: '',
  },

  // 20. Sungka Native Restaurant
  'sungka-native-restaurant': {
    name: 'Sungka Native Restaurant',
    category: 'Restaurant',
    coverImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&auto=format&fit=crop&q=85',
    barangay: 'Day-as',
    description: 'Classic Filipino dishes served with warm hospitality near Cordova port.',
    address: 'Cordova, Cebu (exact address unverified)',
    phone: '',
  },

  // 21. Lantaw Floating Native Restaurant
  'lantaw-floating-native-restaurant': {
    name: 'Lantaw Floating Native Restaurant',
    category: 'Restaurant',
    coverImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1000&auto=format&fit=crop&q=85',
    barangay: 'Day-as',
    description: '[Verified] A floating native restaurant on the Cordova waterfront known for sunset views across the Mactan Channel toward the Cebu City skyline. Filipino and seafood dishes served in open-air, bamboo-accented dining platforms over the water.',
    address: 'Sa Baybayon, Barangay Day-as',
    phone: '032-514-2959',
  },

  // 22. Alberto's Pizza Cordova
  'albertos-pizza-cordova': {
    name: 'Alberto\'s Pizza Cordova',
    category: 'Pizza',
    coverImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1000&auto=format&fit=crop&q=85',
    barangay: 'Buagsong',
    description: '[Name confirmed, location approximate] A local pizzeria in Cordova. Exact address not independently verified — location shown is approximate.',
    address: 'Cordova, Cebu (exact address unverified)',
    phone: '',
  },

  // 23. Cascaja Cafe 
  'cascaja-cafe': {
    name: 'Cascaja Cafe',
    category: 'Cafe',
    coverImage: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1000&auto=format&fit=crop&q=85',
    barangay: 'Calan',
    description: 'sa Cordova, Cebu ay isang cozy na coffee shop na nag-aalok ng masasarap na kape, rice meals, pasta, at budget-friendly na inumin.',
    address: 'Cordova, Cebu (exact address unverified)',
    phone: '',
  },

  // 24. Don Macchiatos Cordova
  'don-macchiatos-cordova': {
    name: 'Don Macchiatos Cordova',
    category: 'Cafe',
    coverImage: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=1000&auto=format&fit=crop&q=85',
    barangay: 'San Miguel',
    description: '[Name confirmed, location approximate] A coffee shop in Cordova. Exact address not independently verified — location shown is approximate.',
    address: 'Cordova, Cebu (exact address unverified)',
    phone: '',
  },

  // 25. Parola Seaview Restaurant
  'parola-seaview-restaurant': {
    name: 'Parola Seaview Restaurant',
    category: 'Restaurant',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&auto=format&fit=crop&q=85',
    barangay: 'Poblacion',
    description: '[Verified] A large open-air restaurant near the Cordova RORO port, built around a decorative lighthouse (parola) with an overwater deck facing Bantayan Bay. Known for Filipino seafood and meat dishes and sunset views.',
    address: 'Roro Port Cordova',
    phone: '+63 947 990 8561',
  },

  // 26. 10,000 Roses Cafe & More
  '10000-roses-cafe-and-more': {
    name: '10,000 Roses Cafe & More',
    category: 'Cafe',
    coverImage: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1000&auto=format&fit=crop&q=85',
    barangay: 'Day-as',
    description: '[Verified] A cafe and garden attraction within the Cordova Tourism Center compound, known for its thousands of LED-lit artificial roses that illuminate at dusk. Serves coffee, pizza, pasta, and light Filipino fare alongside the light installation.',
    address: 'Day-as Barangay Rd, Cordova Tourism Center',
    phone: '032-496-7023',
  },

  // 27. Papsys BBQ
  'papsys-bbq': {
    name: 'Papsys BBQ',
    category: 'Fast Food',
    coverImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1000&auto=format&fit=crop&q=85',
    barangay: 'Bang-bang',
    description: 'a popular Filipino casual dining restaurant chain known for its signature charcoal-grilled specialties and rustic, modern ambiance',
    address: 'Barangay Bang-bang, Cordova, Cebu.',
    phone: '',
  },
};

export function normalizeKey(str?: string): string {
  return (str || '').toLowerCase().replace(/[\s\-_]/g, '');
}

export function slugifyKey(key: string): string {
  return key
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function inferCuisines(name: string, description: string = '', barangay: string = ''): string[] {
  const text = `${name} ${description} ${barangay}`.toLowerCase();
  const list: string[] = [];
  if (text.includes('seafood') || text.includes('bakasi') || text.includes('fish') || text.includes('shrimp') || text.includes('shellfish')) {
    list.push('Seafood');
  }
  if (text.includes('cafe') || text.includes('café') || text.includes('coffee') || text.includes('pastry') || text.includes('baker') || text.includes('tea') || text.includes('macchiato') || text.includes('milktea')) {
    list.push('Cafe');
  }
  if (text.includes('grill') || text.includes('bbq') || text.includes('barbecue') || text.includes('lechon') || text.includes('fried') || text.includes('chicken') || text.includes('ribs')) {
    list.push('Grill & BBQ');
  }
  if (text.includes('pizza') || text.includes('pasta') || text.includes('italian')) {
    list.push('Pizza & Pasta');
  }
  if (text.includes('resort') || text.includes('hotel') || text.includes('roses')) {
    list.push('Resort Dining');
  }
  if (text.includes('street food') || text.includes('tambayan') || text.includes('food park') || text.includes('bilao')) {
    list.push('Street Food');
  }
  if (list.length === 0 || text.includes('pinoy') || text.includes('filipino') || text.includes('cebuano') || text.includes('lutong-bahay') || text.includes('native')) {
    list.push('Filipino');
  }
  return Array.from(new Set(list));
}

function inferPriceRange(name: string, description: string = ''): 'budget' | 'moderate' | 'expensive' | 'premium' {
  const text = `${name} ${description}`.toLowerCase();
  if (text.includes('resort') || text.includes('fine') || text.includes('solea')) return 'premium';
  if (text.includes('resto bar') || text.includes('bucket') || text.includes('parola') || text.includes('seafood grill')) return 'moderate';
  if (text.includes('expensive') || text.includes('luxury')) return 'expensive';
  return 'budget';
}

export function getAllStaticRestaurants(): Restaurant[] {
  const result: Restaurant[] = [];
  let index = 1;

  for (const [key, config] of Object.entries(RESTAURANT_CUSTOMIZATIONS)) {
    if (config.hidden) continue;

    const slug = slugifyKey(key);
    const cuisines = inferCuisines(config.name, config.description, config.barangay);
    const priceRange = inferPriceRange(config.name, config.description);

    result.push({
      id: `static-${slug}`,
      owner_id: 'owner-static',
      name: config.name || key,
      category: config.category,
      slug: slug,
      description: config.description || `Welcome to ${config.name || key} in Cordova, Cebu.`,
      address: config.address || (config.barangay ? `${config.barangay}, Cordova, Cebu` : 'Cordova, Cebu'),
      barangay: config.barangay || 'Cordova',
      latitude: 10.2500 + (index * 0.0012) % 0.02,
      longitude: 123.9480 + (index * 0.0015) % 0.02,
      phone: config.phone || '+63 917 123 4567',
      email: `${slug}@cordovaeats.local`,
      price_range: priceRange,
      services_offered: ['dine_in', 'takeout'],
      cover_image_url: config.coverImage || undefined,
      status: 'verified',
      avg_rating: 4.5 + ((index % 5) * 0.1),
      review_count: 8 + (index * 3) % 45,
      view_count: 100 + (index * 23) % 300,
      is_active: true,
      cuisines: cuisines,
      dietary_options: [],
      amenities: ['Al Fresco', 'Dine-In'],
      created_at: new Date().toISOString(),
    });
    index++;
  }

  return result;
}

export function getStaticRestaurantBySlug(slug: string): Restaurant | null {
  const all = getAllStaticRestaurants();
  const norm = normalizeKey(slug);
  return all.find((r) => normalizeKey(r.slug) === norm || normalizeKey(r.name) === norm || normalizeKey(r.id) === norm) || null;
}

export function matchesCategory(restaurant: Restaurant, category: string): boolean {
  if (!category) return true;
  const cat = category.toLowerCase().trim();
  if (cat === 'all') return true;

  const restCustom = getRestaurantCustomization(restaurant);
  const restCategory = (restCustom?.category || restaurant.category || '').toLowerCase().trim();

  // Normalize e.g. "fastfood" vs "fast food", "restobar" vs "resto bar"
  const catNorm = normalizeKey(cat);
  const restCatNorm = normalizeKey(restCategory);

  if (catNorm === 'all') return true;
  if (restCatNorm && (restCatNorm === catNorm || restCatNorm.includes(catNorm) || catNorm.includes(restCatNorm))) {
    return true;
  }

  return false;
}

export function getRestaurantCustomization(restaurant: Restaurant): RestaurantCustomConfig | null {
  if (!restaurant) return null;

  // Direct lookup
  let custom =
    RESTAURANT_CUSTOMIZATIONS[restaurant.slug] ||
    RESTAURANT_CUSTOMIZATIONS[restaurant.id];

  // Fallback: normalized loose match
  if (!custom) {
    const slugNorm = normalizeKey(restaurant.slug);
    const nameNorm = normalizeKey(restaurant.name);
    for (const [key, val] of Object.entries(RESTAURANT_CUSTOMIZATIONS)) {
      const keyNorm = normalizeKey(key);
      const valNameNorm = normalizeKey(val.name);
      if (
        keyNorm === slugNorm ||
        keyNorm === nameNorm ||
        valNameNorm === nameNorm ||
        (slugNorm && keyNorm && (slugNorm.startsWith(keyNorm) || keyNorm.startsWith(slugNorm))) ||
        (nameNorm && valNameNorm && (nameNorm.includes(valNameNorm) || valNameNorm.includes(nameNorm)))
      ) {
        custom = val;
        break;
      }
    }
  }

  return custom || null;
}

export function isRestaurantVisible(restaurant: Restaurant): boolean {
  if (!restaurant) return false;
  const custom = getRestaurantCustomization(restaurant);
  if (!custom) return true;
  if (custom.hidden) return false;
  return true;
}

export function applyRestaurantCustomization(restaurant: Restaurant): Restaurant {
  if (!restaurant) return restaurant;
  const custom = getRestaurantCustomization(restaurant);

  if (!custom) return restaurant;

  return {
    ...restaurant,
    name: custom.name || restaurant.name,
    category: custom.category || restaurant.category,
    cover_image_url:
      custom.coverImage !== undefined && custom.coverImage !== null && custom.coverImage.trim() !== ''
        ? custom.coverImage
        : restaurant.cover_image_url,
    barangay: custom.barangay || restaurant.barangay,
    description: custom.description || restaurant.description,
    address: custom.address || restaurant.address,
    phone: custom.phone || restaurant.phone,
  };
}

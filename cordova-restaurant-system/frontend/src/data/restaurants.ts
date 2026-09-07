import type { Restaurant } from '@/lib/types';

/**
 * ============================================================================
 * 🍽️ RESTAURANT FRONTEND DIRECTORY & CUSTOMIZATIONS
 * ============================================================================
 * You can easily edit any restaurant's display name, cover image, or details
 * right here in this single file!
 *
 * HOW TO ADD AN IMAGE:
 * 1. Place your image file in `frontend/public/` (e.g. `frontend/public/lapu-lapu-cover.png`)
 * 2. Put the path in `coverImage` below: `'/lapu-lapu-cover.png'`
 *    (or paste any external web image URL starting with http:// or https://)
 *
 * HOW TO RENAME A RESTAURANT:
 * Change the `name` field below to whatever you want.
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
  'Horizon Bean Cafe': {
    name: 'Horizon Bean Cafe',
    category: 'Cafe',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjr6iV9_a_faqTZ-ifuWgFk7EFlqV4QwQobcFDdYO8WXbjpAq1AmURrTo0&s=10',
    barangay: 'San Miguel',
    description: 'A cozy, small-scale neighborhood coffee shop known for its premium coffee, comfort food, and late-night chill vibe.',
  },

  // 2. Grillhouse Cordova BBQ
  'grillhouse-cordova-bbq': {
    name: 'Grillhouse Cordova BBQ',
    category: 'Restaurant',
    coverImage: 'https://cdn.vectorstock.com/i/500p/52/47/rustic-bbq-grill-house-logo-vector-48525247.jpg',
    barangay: 'Ibabao',
    description: 'Classic Filipino BBQ and grilled favorites, budget-friendly family dining.',
  },

  // 3. Street Food Park
  'Street Food Park': {
    name: 'Street Food Park',
    category: 'Street Food',
    coverImage: '',
    barangay: 'Roro Port',
    description: 'Affordable local street food and fresh seafood paired with a cool ocean breeze and sunset.',
  },

  // 4. ABY ROAD Resto Bar
  'ABY ROAD Resto Bar': {
    name: 'ABY ROAD Resto Bar',
    category: 'Resto Bar',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5Kp2YeaylbA53UcCROxnangSIQ2YUsJqB4hx0nIhYoPxKqG-rz4-Z0uo&s=10',
    barangay: 'Bangbang',
    description: 'Beatles-inspired restobar serving cocktails, local brews, and hot pulutan.',
  },

  // 5. Eat n' Repeat
  'Eat n Repeat': {
    name: 'Eat n Repeat',
    category: 'Cafe',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTljx2J4NBwd7y-XFG3lf7VKIZLO29ZC-cuA8CFhgD75w&s',
    barangay: 'Bangbang',
    description: 'Aesthetic at Instagram-worthy na cafe at tambayan for students and friends.',
  },

  // 6. Taytayan Pinoy Restaurant
  'Taytayan Pinoy Restaurant': {
    name: 'Taytayan Pinoy Restaurant',
    category: 'Restaurant',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOHy3PHIsfUzrC58vwiqRiVlF1hd-8faf7hRWgZnVOwg&s',
    barangay: 'Ibabao',
    description: 'Isang kilalang open-air at lutong-bahay na kainan serving native Cebuano dishes.',
  },

  // 7. STUFFED N' FRIED Cordova Branch 
  'STUFFED N FRIED Cordova Branch': {
    name: 'STUFFED N FRIED Cordova Branch',
    category: 'Fast Food',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSub4cBCkl0sLPiZn-BhNhb7c4hdfE3MRFGRLD74LABAA&s=10',
    barangay: 'Gabi',
    description: 'Popular local chicken house in Cebu known for double-fried 15-spice chicken and crispy lechon kawali.',
  },

  // 8. McDonald's Cordova 
  'McDonalds Cordova': {
    name: 'McDonalds Cordova',
    category: 'Fast Food',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUBuFiPDiQi0bDijKV76uMXADQD2DVL6JlpKeaD0zy17-sGjV6caPB9Z6r&s=10',
    barangay: 'San Miguel',
    description: 'World-famous fast-food restaurant serving burgers, fries, breakfast meals, and McCafe drinks.',
  },

  // 9. Barracks Grill and Resto Bar 
  'Barracks Grill and Resto Bar': {
    name: 'Barracks Grill and Resto Bar',
    category: 'Resto Bar',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw9TzDGJ4zS-V0gyGl2bxHntWaRRvVsWV2sj-ES9LZVw&s=10',
    barangay: 'Gabi',
    description: 'Casual nightspot and dining place with chilled drinks and sizzling grilled meals.',
  },

  // 10. BRIC Food Park 
  'BRIC Food Park': {
    name: 'BRIC Food Park',
    category: 'Street Food',
    coverImage: '',
    barangay: 'San Miguel',
    description: 'A vibrant, open-air al fresco dining destination featuring various food stalls and drinks.',
  },

  // 11. RCA Bilao Food Station
  'RCA Bilao Food Station': {
    name: 'RCA Bilao Food Station',
    category: 'Fast Food',
    coverImage: '',
    barangay: 'Gabi',
    description: 'Pansit stir-fry, boneless lechon belly, kakanin sa bilao, and savory party food trays.',
  },

  // 12. MAVERICKS by The Baker Street 
  'mavericks-by-the-baker-street': {
    name: 'MAVERICKS by The Baker Street',
    category: 'Cafe',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu11QAkAvQPNZ0Y4r8_IbqwVvIJxwA2-bk15_VEO_zKcHOiSdH6-5VH4Sw&s=10',
    barangay: 'Gabi',
    description: 'Creative space, collective stories, pastry party, specialty coffee, and late night hangout.',
  },
 
  // 13. Entoys Bakasihan
  'entoys-bakasihan': {
    name: 'Entoys Bakasihan',
    category: 'Restaurant',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpHsAd4SnchBnY77rNwaDu5kDEzsZxWdKald-A3SgojkG0BmHa3Cx2lGVK&s=10',
    barangay: 'Buagsong',
    description: 'Famous open-air eatery in Buagsong famous for its signature reef eel dish nilarang na bakasi.',
  },

  // 14. Tita Kim's
  'tita-kims': {
    name: 'Tita Kims',
    category: 'Restaurant',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQukvKATrQQW_HUYIbjrG6X6b9KNlzpQz5qlo3DJuung&s=10',
    barangay: 'Gabi',
    description: 'An affordable buffet-style Filipino restaurant located along the National Highway in Gabi.',
  },

  // 15. Burandat Seafood Bucket
  'Burandat Seafood Bucket': {
    name: 'Burandat Seafood Bucket',
    category: 'Restaurant',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnfjHmw1Us3mlI-tffQq2II3E62OOo-9HD_C5SkWUykDQHElwEa0m7Suar&s=10',
    barangay: 'Gabi',
    description: 'Fresh catch-of-the-day seafood buckets and grilled specialties, right by the shoreline.',
  },

  // 16. Csalt Cafe Cordova (formerly Seaside Cafe)
  'seaside-cafe-cordova': {
    name: 'Csalt Cafe Cordova',
    category: 'Cafe',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe-86il0KEf6Gh0WJs_q-X3I8tGbhjWomjoBkTJBGbBw&s=10',
    barangay: 'Poblacion',
    description: 'Cozy cafe with ocean views, specializing in artisan coffee, pastries and light meals.',
  },

  // 17. Cafe Mafia
  'cafe-mafia': {
    name: 'Cafe Mafia',
    category: 'Cafe',
    coverImage: '/cafe-mafia-cover.png',
    barangay: 'Dapitan',
    description: 'A casual cafe in Cordova famous for its gourmet burgers, artisan coffee, and mafia-themed ambiance.',
  },

  // 18. Solea Mactan Resort
  'solea-mactan-restaurant': {
    name: 'Solea Mactan Resort',
    category: 'Restaurant',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1chtVc3dJnqcBmKpfhs2m1XZFxefrDaMOMKv39wP64KQgROxl7rAp0zJ2&s=10',
    barangay: 'Alegria',
    description: 'Resort dining featuring international buffets, poolside bar, and local island specialties.',
  },    

  // 19. Husby's Grill
  'husbys-grill': {
    name: "Husby's Grill",
    category: 'Restaurant',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkGL3w8GCIdrok2FgfyTdxIqAT5wa7nqoouJvJ25X92C_i1U5WARzw58s&s=10',
    barangay: 'Gabi',
    description: 'A local grill house known for tender ribs, BBQ skewers, and family meals.',
  },

  // 20. Sungka Native Restaurant
  'Sungka Native Restaurant': {
    name: 'Sungka Native Restaurant',
    category: 'Restaurant',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGBGg6Wa1-ENZF8u9GRdtULjgb5iegQ8LhACawQfBDCnSScyedDKVe0heb&s=10',
    barangay: 'Day-as',
    description: 'Classic Filipino dishes served with warm hospitality near Cordova port.',
  },

  // 21. Lantaw Floating Native Restaurant
  'lantaw-floating-native-restaurant': {
    name: 'Lantaw Floating Native Restaurant',
    category: 'Restaurant',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm8BkI9tT-mcfl6xJLf_aW0sM0pIIYXwSqAgdJgG_iw_dDToAvdUf_90Y&s=10',
    barangay: 'Day-as',
    description: 'A floating native restaurant on the Cordova waterfront known for breathtaking sunset views and seafood.',
  },

  // 22. Alberto's Pizza Cordova
  'albertos-pizza-cordova': {
    name: "Alberto's Pizza Cordova",
    category: 'Pizza',
    coverImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80',
    barangay: 'Gabi',
    description: 'Affordable, freshly-baked local favorite and specialty pizzas with quick takeout.',
  },

  // 23. Cascaja Cafe 
  'cascadja-cafe': {
    name: 'Cascaja Cafe',
    category: 'Cafe',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaMHiYg94wzeeK6oPQ5FTQczijAWKvc6mCLFWa1_FHW2uxgFuFfns-Gi0&s=10',
    barangay: 'Calan',
    description: 'Cozy coffee shop in Cordova offering delicious coffee, rice meals, pasta, and budget-friendly drinks.',
  },

  // 24. Don Macchiatos Cordova
  'don-macchiatos-cordova': {
    name: 'Don Macchiatos Cordova',
    category: 'Cafe',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsHRwhEvXCxKQ1AVNCYkjdPMZdRuUiRXpMXcQ4X65kZmOXOitEot5-CQmD&s=10',
    barangay: 'San Miguel',
    description: 'Budget-friendly espresso drinks, iced caramel macchiatos, and coffee favorites.',
  },

  // 25. Parola Seaview Restaurant
  'parola-seaview-restaurant': {
    name: 'Parola Seaview Restaurant',
    category: 'Restaurant',
    coverImage: 'https://ak-d.tripcdn.com/images/1i6572224riot1ksxB04C_Q90.jpg?proc=source/trip',
    barangay: 'Poblacion',
    description: 'Open-air seaside dining centered around an illuminated lighthouse overlooking the bay.',
  },

  // 26. 10,000 Roses Cafe & More
  '10000-roses-cafe-and-more': {
    name: '10,000 Roses Cafe & More',
    category: 'Cafe',
    coverImage: 'https://travelcebu.b-cdn.net/wp-content/uploads/2024/06/10000-roses-logo-light-night.jpg',
    barangay: 'Day-as',
    description: 'Iconic tourist attraction and cafe surrounded by thousands of LED-lit artificial white roses.',
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
  if (text.includes('cafe') || text.includes('café') || text.includes('coffee') || text.includes('pastry') || text.includes('baker') || text.includes('tea') || text.includes('macchiato')) {
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
      if (keyNorm === slugNorm || keyNorm === nameNorm) {
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
      custom.coverImage !== undefined && custom.coverImage !== null
        ? custom.coverImage
        : restaurant.cover_image_url,
    barangay: custom.barangay || restaurant.barangay,
    description: custom.description || restaurant.description,
    address: custom.address || restaurant.address,
    phone: custom.phone || restaurant.phone,
  };
}

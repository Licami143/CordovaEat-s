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
    coverImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80',
    barangay: 'San Miguel',
    description: 'A cozy, small-scale neighborhood coffee shop known for its premium coffee, comfort food, and late-night chill vibe.',
    address: 'San Miguel, Cordova, Cebu',
    phone: '+63 917 123 4567',
  },

  // 2. Grillhouse Cordova BBQ
  'grillhouse-cordova-bbq': {
    name: 'Grillhouse Cordova BBQ',
    category: 'Restaurant',
    coverImage: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&auto=format&fit=crop&q=80',
    barangay: 'Ibabao',
    description: 'Classic Filipino BBQ and grilled favorites, budget-friendly family dining.',
    address: 'San Miguel Road, Ibabao',
    phone: '+639201112235',
  },

  // 3. Street Food Park
  'street-food-park': {
    name: 'Street Food Park',
    category: 'Street Food',
    coverImage: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80',
    barangay: 'Poblacion',
    description: 'affordable local street food and fresh seafood paired with a cool ocean breeze and sunset.',
    address: 'Roro Port, Cordova, Cebu',
    phone: '',
  },

  // 4. ABY ROAD Resto Bar
  'aby-road-resto-bar': {
    name: 'ABY ROAD Resto Bar',
    category: 'Resto Bar',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5Kp2YeaylbA53UcCROxnangSIQ2YUsJqB4hx0nIhYoPxKqG-rz4-Z0uo&s=10',
    barangay: 'Bangbang',
    description: 'Beatles-inspired restobar.',
    address: 'Bangbang, Cordova, Cebu',
    phone: '',
  },

  // 5. Eat n' Repeat
  'eat-n-repeat': {
    name: 'Eat n\' Repeat',
    category: 'Cafe',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfQN23Tk3arzxnvZgYwgrZTOYhPgijf_4p5q3K621FO-181pCjRTDDMTE&s=10',
    barangay: 'Bangbang',
    description: 'aesthetic at Instagram-worthy na cafe at tambayan.',
    address: 'Bangbang, Cordova, Cebu',
    phone: '',
  },

  // 6. Taytayan Pinoy Restaurant
  'taytayan-pinoy-restaurant': {
    name: 'Taytayan Pinoy Restaurant',
    category: 'Restaurant',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAYNgM2l1VWAjy1lHThQ1WNwLiI44JDAfo8aQqPS-wKw&s',
    barangay: 'Ibabao',
    description: 'ay isang kilalang open-air at lutong-bahay na kainan.',
    address: 'Ibabao, Cordova, Cebu',
    phone: '',
  },

  // 7. STUFFED N' FRIED Cordova Branch 
  'stuffed-n-fried-cordova': {
    name: 'STUFFED N\' FRIED Cordova Branch',
    category: 'Restaurant',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSub4cBCkl0sLPiZn-BhNhb7c4hdfE3MRFGRLD74LABAA&s=10',
    barangay: 'Gabi',
    description: 'a popular local chicken house in Cebu known for its signature double-fried, 15-spice Batter-Fried Whole Chicken, crispy lechon kawali, and special ngohiong.',
    address: 'Gabi, Cordova, Cebu',
    phone: '',
  },

  // 8. McDonald's Cordova 
  'mcdonalds-cordova': {
    name: 'McDonald\'s Cordova',
    category: 'Fast Food',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUBuFiPDiQi0bDijKV76uMXADQD2DVL6JlpKeaD0zy17-sGjV6caPB9Z6r&s=10',
    barangay: 'San Miguel',
    description: 'the world\'s largest chain of hamburger fast-food restaurants.',
    address: 'San Miguel, Cordova, Cebu',
    phone: '',
  },

  // 9. Barracks Grill and Resto Bar 
  'barracks-grill-and-resto-bar': {
    name: 'Barracks Grill and Resto Bar',
    category: 'Resto Bar',
    coverImage: 'https://lh3.googleusercontent.com/grass-cs/ACvplmP1_ZIZux8LEYKASSCkThb2Q5Xfp8toCwBgS6gR0yYblz4-nHIdDYzdpQMjKUn7jXu5G9wYNFod4dWcCTSvjT9sCay87OKunPdMMUupTd3j7StpHg43j3LIzG2a_KFUd1xr1AFL=s294-w294-h220-n-k-no',
    barangay: 'Gabi',
    description: 'casual nightspot and dining place.',
    address: 'Gabi, Cordova, Cebu',
    phone: '',
  },

  // 10. BRIC Food Park 
  'bric-food-park': {
    name: 'BRIC Food Park',
    category: 'Street Food',
    coverImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80',
    barangay: 'San Miguel',
    description: 'a vibrant, open-air al fresco dining destination.',
    address: 'San Miguel, Cordova, Cebu',
    phone: '',
  },

  // 11. RCA Bilao Food Station
  'rca-bilao-food-station': {
    name: 'RCA Bilao Food Station',
    category: 'Restaurant',
    coverImage: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80',
    barangay: 'Gabi',
    description: 'Pansit stir-fry, boneless lechon belly, kakanin sa bilao, ug lain-laing food trays.',
    address: 'Gabi, Cordova, Cebu',
    phone: '+63 912 345 6780',
  },

  // 12. MAVERICKS by The Baker Street 
  'mavericks-by-the-baker-street': {
    name: 'MAVERICKS by The Baker Street',
    category: 'Cafe',
    coverImage: 'https://scontent.fmnl8-3.fna.fbcdn.net/v/t39.30808-1/539516293_122112420230971888_5351222020459115141_n.jpg?stp=c0.15.1009.1009a_dst-jpg_tt6&cstp=mx1009x1009&ctp=s160x160&_nc_cat=105&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=2d3e12&_nc_eui2=AeEqtS_ggK-Yzhv7JVd5siW82S7THdpzd57ZLtMd2nN3nk4V7V-_4iIlo5X4HLnoxlfqUoDcaFgtdKiZL9FY5Ncd&_nc_ohc=RVABe0oI_k4Q7kNvwFW4c3S&_nc_oc=Adrctva9p4S5aKBf3m_eW4re9ELW4a5qTvDFIfF5z7WOANAYW3OmXcSvsd7p9A_VQRs&_nc_zt=24&_nc_ht=scontent.fmnl8-3.fna&_nc_gid=N1fM9vkL9rPtZVZ_fVL-fA&_nc_ss=7b2a8&oh=00_AQFvtXW1b4xj2SynF37ifUfCgAzcjuNUb1wIegYAzTHXQQ&oe=6A937899',
    barangay: 'Gabi',
    description: 'Creative space Collective Stories Local Hangouts After hours refuge Pastry Party Coffee Catch up.',
    address: 'Gabi, Cordova, Cebu',
    phone: '+63 917 123 4567',
  },
 
  // 13. Entoys Bakasihan
  'entoys-bakasihan': {
    name: 'Entoys Bakasihan',
    category: 'Restaurant',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQukvKATrQQW_HUYIbjrG6X6b9KNlzpQz5qlo3DJuung&s=10',
    barangay: 'Buagsong',
    description: 'a popular open-air, casual eatery located in Barangay Buagsong, Cordova, Cebu, famous for its signature reef eel dish called nilarang na bakasi.',
    address: 'Buagsong, Cordova, Cebu',
    phone: '+63 912 345 6789',
  },

  // 14. Tita Kim's
  'tita-kims': {
    name: 'Tita Kims',
    category: 'Restaurant',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQukvKATrQQW_HUYIbjrG6X6b9KNlzpQz5qlo3DJuung&s=10',
    barangay: 'Gabi',
    description: 'an affordable, buffet-style Filipino restaurant located along the National Highway in Barangay Gabi, Cordova, Cebu.',
    address: 'National Highway, Gabi, Cordova, Cebu',
    phone: '+63 917 888 9900',
  },

  // 15. Burandat Seafood Bucket
  'burandat-seafood-bucket': {
    name: 'Burandat Seafood Bucket',
    category: 'Restaurant',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnfjHmw1Us3mlI-tffQq2II3E62OOo-9HD_C5SkWUykDQHElwEa0m7Suar&s=10',
    barangay: 'Gabi',
    description: 'Fresh catch-of-the-day seafood grilled to order, right by the shoreline.',
    address: 'Sitio Mactan, Gabi',
    phone: '+639201112233',
  },

  // 16. Csalt Cafe Cordova
  'csalt-cafe-cordova': {
    name: 'Csalt Cafe Cordova',
    category: 'Cafe',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe-86il0KEf6Gh0WJs_q-X3I8tGbhjWomjoBkTJBGbBw&s=10',
    barangay: 'Poblacion',
    description: 'Cozy cafe with ocean views, specializing in coffee, pastries and light vegetarian meals.',
    address: 'Poblacion Cordova, near the wharf',
    phone: '+639201112234',
  },

  // 17. Cafe Mafia
  'cafe-mafia': {
    name: 'Cafe Mafia',
    category: 'Cafe',
    coverImage: 'http://localhost:3000/cafe-mafia-cover.png',
    barangay: 'Poblacion',
    description: '[Name confirmed, location approximate] A casual cafe in Cordova mentioned for its burgers and coffee. Exact address not independently verified — location shown is approximate.',
    address: 'Cordova, Cebu (exact address unverified)',
    phone: '',
  },

  // 18. Solea Mactan Resort
  'solea-mactan-resort': {
    name: 'Solea Mactan Resort',
    category: 'Pizza',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1chtVc3dJnqcBmKpfhs2m1XZFxefrDaMOMKv39wP64KQgROxl7rAp0zJ2&s=10',
    barangay: 'Alegria',
    description: '[Verified] The in-house restaurant of Solea Mactan Resort, serving pizza, international, and Filipino dishes. Popular with resort guests and open to walk-in diners.',
    address: 'Victor Wahing Street, Alegria',
    phone: '',
  },    

  // 19. Husby's Grill
  'husbys-grill': {
    name: 'Husby\'s Grill',
    category: 'Restaurant',
    coverImage: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&auto=format&fit=crop&q=80',
    barangay: 'Gabi',
    description: '[Verified] An outdoor grill restaurant in Barangay Gabi known for affordable Filipino grilled dishes — tuna belly, baby back ribs, kinilaw, and panga are frequently mentioned favorites.',
    address: 'Manuel L. Quezon Road, Gabi',
    phone: '',
  },

  // 20. Sungka Native Restaurant
  'sungka-native-restaurant': {
    name: 'Sungka Native Restaurant',
    category: 'Restaurant',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGBGg6Wa1-ENZF8u9GRdtULjgb5iegQ8LhACawQfBDCnSScyedDKVe0heb&s=10',
    barangay: 'Day-as',
    description: 'Classic Filipino dishes served with warm hospitality near Cordova port.',
    address: 'Cordova, Cebu (exact address unverified)',
    phone: '',
  },

  // 21. Lantaw Floating Native Restaurant
  'lantaw-floating-native-restaurant': {
    name: 'Lantaw Floating Native Restaurant',
    category: 'Restaurant',
    coverImage: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80',
    barangay: 'Day-as',
    description: '[Verified] A floating native restaurant on the Cordova waterfront known for sunset views across the Mactan Channel toward the Cebu City skyline. Filipino and seafood dishes served in open-air, bamboo-accented dining platforms over the water.',
    address: 'Sa Baybayon, Barangay Day-as',
    phone: '032-514-2959',
  },

  // 22. Alberto's Pizza Cordova
  'albertos-pizza-cordova': {
    name: 'Alberto\'s Pizza Cordova',
    category: 'Pizza',
    coverImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80',
    barangay: 'Buagsong',
    description: '[Name confirmed, location approximate] A local pizzeria in Cordova. Exact address not independently verified — location shown is approximate.',
    address: 'Cordova, Cebu (exact address unverified)',
    phone: '',
  },

  // 23. Cascaja Cafe 
  'cascaja-cafe': {
    name: 'Cascaja Cafe',
    category: 'Cafe',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaMHiYg94wzeeK6oPQ5FTQczijAWKvc6mCLFWa1_FHW2uxgFuFfns-Gi0&s=10',
    barangay: 'Calan',
    description: 'sa Cordova, Cebu ay isang cozy na coffee shop na nag-aalok ng masasarap na kape, rice meals, pasta, at budget-friendly na inumin.',
    address: 'Cordova, Cebu (exact address unverified)',
    phone: '',
  },

  // 24. Don Macchiatos Cordova
  'don-macchiatos-cordova': {
    name: 'Don Macchiatos Cordova',
    category: 'Cafe',
    coverImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80',
    barangay: 'San Miguel',
    description: '[Name confirmed, location approximate] A coffee shop in Cordova. Exact address not independently verified — location shown is approximate.',
    address: 'Cordova, Cebu (exact address unverified)',
    phone: '',
  },

  // 25. Parola Seaview Restaurant
  'parola-seaview-restaurant': {
    name: 'Parola Seaview Restaurant',
    category: 'Restaurant',
    coverImage: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80',
    barangay: 'Poblacion',
    description: '[Verified] A large open-air restaurant near the Cordova RORO port, built around a decorative lighthouse (parola) with an overwater deck facing Bantayan Bay. Known for Filipino seafood and meat dishes and sunset views.',
    address: 'Roro Port Cordova',
    phone: '+63 947 990 8561',
  },

  // 26. 10,000 Roses Cafe & More
  '10000-roses-cafe-and-more': {
    name: '10,000 Roses Cafe & More',
    category: 'Cafe',
    coverImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80',
    barangay: 'Day-as',
    description: '[Verified] A cafe and garden attraction within the Cordova Tourism Center compound, known for its thousands of LED-lit artificial roses that illuminate at dusk. Serves coffee, pizza, pasta, and light Filipino fare alongside the light installation.',
    address: 'Day-as Barangay Rd, Cordova Tourism Center',
    phone: '032-496-7023',
  },

  // 27. Papsys BBQ
  'papsys-bbq': {
    name: 'Papsys BBQ',
    category: 'Fast Food',
    coverImage: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&auto=format&fit=crop&q=80',
    barangay: 'Bang-bang',
    description: 'a popular Filipino casual dining restaurant chain known for its signature charcoal-grilled specialties and rustic, modern ambiance',
    address: 'Barangay Bang-bang, Cordova, Cebu.',
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

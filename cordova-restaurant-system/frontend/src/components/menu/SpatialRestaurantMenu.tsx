'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ShoppingBag,
  Flame,
  Star,
  Info,
  Check,
  Phone,
  Plus,
  Minus,
  X,
  Search,
  Utensils,
  Award,
} from 'lucide-react';
import type { Restaurant, MenuItem, MenuCategory } from '@/lib/types';
import { useToast } from '@/lib/toast-context';

interface SpatialRestaurantMenuProps {
  restaurant: Restaurant;
  items: MenuItem[];
  categories: MenuCategory[];
}

// Curated signature dishes & fallback category menus tailored for Cordova restaurants
const CATEGORY_DEFAULT_MENUS: Record<
  string,
  {
    heroDish: {
      name: string;
      tagline: string;
      price: number;
      image: string;
      description: string;
      hotspots: { x: number; y: number; title: string; desc: string }[];
    };
    menuItems: {
      name: string;
      category: string;
      price: number;
      description: string;
      image: string;
      tag: string;
      popular?: boolean;
    }[];
  }
> = {
  Cafe: {
    heroDish: {
      name: 'Artisan Spanish Latte & Toast',
      tagline: 'CREAMY • BOLD • ROASTED',
      price: 185,
      image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&auto=format&fit=crop&q=80',
      description: 'Slow-dripped Arabica espresso infused with condensed milk and velvety steamed milk.',
      hotspots: [
        { x: 30, y: 35, title: 'Single-Origin Arabica', desc: 'Freshly ground and pulled at 9 bars of pressure.' },
        { x: 65, y: 55, title: 'Velvety Micro-Foam', desc: 'Steamed to silky perfection with subtle sweet notes.' },
        { x: 45, y: 75, title: 'Artisan Glaze', desc: 'Caramelized sugar drizzle with cinnamon dusting.' },
      ],
    },
    menuItems: [
      {
        name: 'Spanish Latte (Iced/Hot)',
        category: 'Coffee & Espresso',
        price: 165,
        description: 'Rich espresso layered over sweetened milk and ice.',
        image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600&auto=format&fit=crop&q=80',
        tag: '⭐ Bestseller',
        popular: true,
      },
      {
        name: 'Caramel Macchiato',
        category: 'Coffee & Espresso',
        price: 175,
        description: 'Freshly steamed milk with vanilla-flavored syrup marked with espresso and caramel.',
        image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=600&auto=format&fit=crop&q=80',
        tag: '✨ House Favorite',
      },
      {
        name: 'Creamy Carbonara Pasta',
        category: 'Mains & Pasta',
        price: 245,
        description: 'Al dente fettuccine tossed in rich egg yolk, parmesan cheese, and crispy bacon bits.',
        image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&auto=format&fit=crop&q=80',
        tag: '🍝 Must Try',
        popular: true,
      },
      {
        name: 'Avocado Sourdough Toast',
        category: 'Snacks & Toast',
        price: 195,
        description: 'Toasted sourdough topped with mashed ripe avocado, poached egg, and chili flakes.',
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop&q=80',
        tag: '🌿 Healthy',
      },
      {
        name: 'Matcha Green Tea Cooler',
        category: 'Beverages',
        price: 170,
        description: 'Authentic ceremonial grade Uji matcha with oat milk and honey drizzle.',
        image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&auto=format&fit=crop&q=80',
        tag: '🍵 Refreshing',
      },
      {
        name: 'Choco Lava Cake',
        category: 'Desserts',
        price: 160,
        description: 'Warm molten dark chocolate cake served with vanilla bean ice cream.',
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80',
        tag: '🍫 Sweet Treat',
      },
    ],
  },
  'Fast Food': {
    heroDish: {
      name: 'Signature Crispy Crunch Burger',
      tagline: 'CRUNCHY • JUICY • SIZZLING',
      price: 210,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80',
      description: 'Flame-grilled 100% beef patty with melted cheddar, crispy bacon, and smoky secret sauce on toasted brioche.',
      hotspots: [
        { x: 35, y: 30, title: 'Toasted Golden Brioche', desc: 'Butter-toasted artisan bun with golden shine.' },
        { x: 55, y: 50, title: 'Flame-Grilled Beef Patty', desc: 'Seasoned to perfection and seared for rich juiciness.' },
        { x: 45, y: 70, title: 'Secret Smokey Sauce', desc: 'House recipe blend of roasted garlic, smoked paprika, and honey.' },
      ],
    },
    menuItems: [
      {
        name: 'Double Cheeseburger Deluxe',
        category: 'Burgers',
        price: 240,
        description: 'Two pure beef patties, double cheddar cheese, lettuce, tomato, and special sauce.',
        image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80',
        tag: '🔥 Top Seller',
        popular: true,
      },
      {
        name: 'Crispy Fried Chicken (2 Pcs)',
        category: 'Chicken & Combos',
        price: 195,
        description: 'Crisp and juicy golden fried chicken with warm savory gravy and steamed rice.',
        image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&auto=format&fit=crop&q=80',
        tag: '🍗 Bestseller',
        popular: true,
      },
      {
        name: 'Loaded Cheesy Bacon Fries',
        category: 'Sides',
        price: 145,
        description: 'Golden fries smothered in melted cheese sauce, sour cream, and crispy bacon bits.',
        image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=600&auto=format&fit=crop&q=80',
        tag: '🧀 Cheesy',
      },
      {
        name: 'Spicy Buffalo Wings (6 Pcs)',
        category: 'Chicken & Combos',
        price: 230,
        description: 'Tender chicken wings tossed in tangy cayenne pepper glaze served with ranch dip.',
        image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=600&auto=format&fit=crop&q=80',
        tag: '🌶️ Spicy',
      },
      {
        name: 'Thick Vanilla Milkshake',
        category: 'Drinks',
        price: 120,
        description: 'Hand-spun ice cream milkshake with whipped cream and cherry on top.',
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80',
        tag: '🥤 Classic',
      },
    ],
  },
  Pizza: {
    heroDish: {
      name: 'Artisan Brick-Oven Supreme Pizza',
      tagline: 'WOOD-FIRED • CRISPY CRUST • CHEESY',
      price: 495,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80',
      description: 'Hand-stretched dough baked in wood fire with mozzarella, pepperoni, bell peppers, olives, and basil.',
      hotspots: [
        { x: 30, y: 35, title: 'Crispy Leopard Crust', desc: 'Fermented 48 hours and charred over mangrove wood.' },
        { x: 60, y: 45, title: '100% Mozzarella Blend', desc: 'Rich, stringy, melted cheese pull with olive oil.' },
        { x: 45, y: 65, title: 'San Marzano Tomato Sauce', desc: 'Slow-simmered vine-ripened tomatoes and fresh herbs.' },
      ],
    },
    menuItems: [
      {
        name: 'Quattro Formaggi (4 Cheese)',
        category: 'Pizzas',
        price: 480,
        description: 'Mozzarella, Gorgonzola, Parmesan, and Fontina cheese with a touch of honey.',
        image: 'https://images.unsplash.com/photo-1573821663912-569905455b1c?w=600&auto=format&fit=crop&q=80',
        tag: '🧀 Cheese Lover',
        popular: true,
      },
      {
        name: 'Pepperoni Feast Pizza',
        category: 'Pizzas',
        price: 460,
        description: 'Generous layers of premium cured pepperoni, spicy tomato sauce, and herbs.',
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&auto=format&fit=crop&q=80',
        tag: '🍕 Classic',
        popular: true,
      },
      {
        name: 'Creamy Truffle Pasta',
        category: 'Pasta',
        price: 320,
        description: 'Penne in decadent white truffle cream sauce with sauteed wild mushrooms.',
        image: 'https://images.unsplash.com/photo-1621996346565-e3adc6d7d0f4?w=600&auto=format&fit=crop&q=80',
        tag: '✨ Chef Choice',
      },
      {
        name: 'Garlic Butter Parmesan Wings',
        category: 'Appetizers',
        price: 260,
        description: 'Crispy tossed chicken in garlic herb butter and grated aged parmesan.',
        image: 'https://images.unsplash.com/photo-1527477321055-43615b6294a5?w=600&auto=format&fit=crop&q=80',
        tag: '🧄 Savory',
      },
    ],
  },
  'Resto Bar': {
    heroDish: {
      name: 'Sizzling Ribeye Steak & Cocktails',
      tagline: 'SIZZLING • CHARGRILLED • VIBRANT',
      price: 580,
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
      description: 'Prime cut ribeye steak grilled to medium-rare on a piping hot skillet with peppercorn gravy and garlic butter.',
      hotspots: [
        { x: 35, y: 35, title: 'Flame-Seared Ribeye', desc: 'Marbled prime beef seared for caramelized crust.' },
        { x: 60, y: 50, title: 'Garlic Herb Compound Butter', desc: 'Melts over hot steak for unmatched richness.' },
        { x: 45, y: 70, title: 'Peppercorn Red Wine Sauce', desc: 'Simmered with crushed peppercorns and red wine reduction.' },
      ],
    },
    menuItems: [
      {
        name: 'Crispy Pork Sisig on Cast Iron',
        category: 'Bar Chow & Sizzlers',
        price: 280,
        description: 'Minced crispy pork face and belly with onions, chili, calamansi, and fresh farm egg.',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
        tag: '🔥 Island Legend',
        popular: true,
      },
      {
        name: 'Gambas Al Ajillo (Garlic Shrimp)',
        category: 'Bar Chow & Sizzlers',
        price: 340,
        description: 'Fresh local shrimp sauteed in olive oil, toasted garlic, and spicy paprika.',
        image: 'https://images.unsplash.com/photo-1559742811-82286364ceaf?w=600&auto=format&fit=crop&q=80',
        tag: '🦐 Seafood',
        popular: true,
      },
      {
        name: 'Cordova Sunset Mojito',
        category: 'Signature Cocktails',
        price: 190,
        description: 'White rum, fresh mint leaves, lime juice, brown sugar, and sparkling soda.',
        image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80',
        tag: '🍹 Signature Drink',
      },
      {
        name: 'Smoked BBQ Ribs Full Rack',
        category: 'Mains',
        price: 620,
        description: 'Slow-smoked baby back ribs glazed in hickory honey BBQ sauce with butter corn.',
        image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&auto=format&fit=crop&q=80',
        tag: '🍖 Generous Share',
      },
    ],
  },
  // Default Seafood / Traditional Filipino Restaurant
  Restaurant: {
    heroDish: {
      name: 'Cordova Seafood Platter & Bakasi Special',
      tagline: 'FRESH CATCH • CHARCOAL GRILLED • CEBUANO',
      price: 680,
      image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80',
      description: 'Generous feast of charcoal-grilled pompano, garlic butter scallops, bakasi eel soup, and grilled squid.',
      hotspots: [
        { x: 30, y: 35, title: 'Fresh Daily Catch', desc: 'Directly sourced every morning from Cordova fishing boats.' },
        { x: 65, y: 45, title: 'Baked Cheesy Garlic Scallops', desc: 'Broiled in rich butter, minced garlic, and melted cheese.' },
        { x: 45, y: 70, title: 'Charcoal Smoke Infusion', desc: 'Grilled over coconut husks for authentic Cebuano aroma.' },
      ],
    },
    menuItems: [
      {
        name: 'Grilled Stuffed Squid (Inihaw na Pusit)',
        category: 'Seafood & Grills',
        price: 360,
        description: 'Fresh whole squid stuffed with onions, tomatoes, and herbs, basted in sweet-savory soy glaze.',
        image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600&auto=format&fit=crop&q=80',
        tag: '⭐ House Signature',
        popular: true,
      },
      {
        name: 'Baked Scallops with Cheese & Garlic',
        category: 'Seafood & Grills',
        price: 320,
        description: 'Locally harvested scallops broiled in golden butter, garlic, and melted cheddar.',
        image: 'https://images.unsplash.com/photo-1625944525533-a5868999824a?w=600&auto=format&fit=crop&q=80',
        tag: '🐚 Seafood Classic',
        popular: true,
      },
      {
        name: 'Cordova Bakasi Soup (Reef Eel Soup)',
        category: 'Soups & Traditional',
        price: 250,
        description: 'Famous Cordova delicacy simmered in ginger, lemongrass, tomatoes, and native spices.',
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&auto=format&fit=crop&q=80',
        tag: '🏆 Cordova Legend',
        popular: true,
      },
      {
        name: 'Crispy Pork Pata Especial',
        category: 'Traditional Favorites',
        price: 650,
        description: 'Deep-fried pork knuckle with crackling skin and tender meat, served with spiced vinegar dip.',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
        tag: '🔥 Family Feast',
      },
      {
        name: 'Sinigang na Lapu-Lapu sa Miso',
        category: 'Soups & Traditional',
        price: 420,
        description: 'Fresh grouper fish in sour tamarind and fermented soybean broth with island greens.',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop&q=80',
        tag: '🌿 Sour & Savory',
      },
      {
        name: 'Buko Halo-Halo Tropical Supreme',
        category: 'Desserts',
        price: 180,
        description: 'Served inside a fresh young coconut shell with shaved ice, ube, leche flan, and sweet fruits.',
        image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&auto=format&fit=crop&q=80',
        tag: '🥥 Island Sweet',
      },
    ],
  },
};

export function SpatialRestaurantMenu({ restaurant, items = [], categories = [] }: SpatialRestaurantMenuProps) {
  const { toast } = useToast();
  const categoryKey = restaurant.category || 'Restaurant';
  const defaultData = CATEGORY_DEFAULT_MENUS[categoryKey] || CATEGORY_DEFAULT_MENUS.Restaurant;

  // Selected Category filter
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  // Quick Order Modal State
  const [modalItem, setModalItem] = useState<{
    name: string;
    price: number;
    description: string;
    image: string;
    tag?: string;
  } | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [specialNotes, setSpecialNotes] = useState('');

  // Merge API items with curated default items if API items are sparse
  const allMenuItems = useMemo(() => {
    if (items.length >= 4) {
      return items.map((it) => ({
        id: it.id,
        name: it.name,
        category: categories.find((c) => c.id === it.category_id)?.name || 'Main Dishes',
        price: Number(it.price),
        description: it.description || 'Crafted fresh with traditional Cordova flavors.',
        image: it.image_url || defaultData.heroDish.image,
        tag: '✨ Chef Special',
        popular: true,
      }));
    }

    // Combine any existing with default items
    const defaults = defaultData.menuItems.map((it, idx) => ({
      id: `curated-${idx}`,
      ...it,
    }));

    if (items.length > 0) {
      const customOnes = items.map((it) => ({
        id: it.id,
        name: it.name,
        category: categories.find((c) => c.id === it.category_id)?.name || 'House Specialties',
        price: Number(it.price),
        description: it.description || 'Special house recipe prepared daily.',
        image: it.image_url || defaultData.heroDish.image,
        tag: '⭐ Signature',
        popular: true,
      }));
      return [...customOnes, ...defaults];
    }

    return defaults;
  }, [items, categories, defaultData]);

  // List of unique categories for tabs
  const categoryTabs = useMemo(() => {
    const set = new Set<string>();
    allMenuItems.forEach((i) => set.add(i.category));
    return ['All', ...Array.from(set)];
  }, [allMenuItems]);

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return allMenuItems.filter((item) => {
      const matchesCat = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [allMenuItems, activeCategory, searchQuery]);

  const hero = defaultData.heroDish;

  const handleOpenOrder = (item: {
    name: string;
    price: number;
    description: string;
    image: string;
    tag?: string;
  }) => {
    setModalItem(item);
    setQuantity(1);
    setSpecialNotes('');
  };

  const handleConfirmOrder = () => {
    if (!modalItem) return;
    toast(`Added ${quantity}x "${modalItem.name}" to order inquiry!`, 'success');
    setModalItem(null);
  };

  return (
    <div className="space-y-16">
      {/* ========================================================================= */}
      {/* 🌟 1. SHOWSTOPPER SPATIAL HERO SECTION (Inspired by Dribbble Flavor Pop) */}
      {/* ========================================================================= */}
      <section className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-950/80 via-[#132219]/90 to-[#0e1713]/95 border border-emerald-500/20 shadow-[0_24px_64px_rgba(0,0,0,0.4)] p-6 sm:p-10 lg:p-12">
        {/* Ambient Backlight Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Giant Background Typography: "FLAVOR POP" / Category Stamp */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none opacity-10">
          <span className="font-serif font-black text-7xl sm:text-9xl lg:text-[14rem] tracking-tighter text-white whitespace-nowrap uppercase">
            FLAVOR POP
          </span>
        </div>

        {/* Top Header Bar inside Hero */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles size={13} className="text-emerald-400 animate-pulse" />
              Signature Dish
            </span>
            <span className="text-xs text-stone-300 font-medium tracking-wide">
              {restaurant.name} &bull; Cordova, Cebu
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-amber-300 font-semibold flex items-center gap-1">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              {Number(restaurant.avg_rating || 4.9).toFixed(1)} Rating
            </span>
          </div>
        </div>

        {/* Center Grid: Floating Dish + Interactive Hotspots + Floating Cards */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-8">
          {/* Left Column: Floating Order Notepad Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 flex flex-col gap-4"
          >
            {/* Notepad Card */}
            <div className="bg-white/10 dark:bg-black/40 backdrop-blur-2xl border border-white/20 rounded-2xl p-4 sm:p-5 shadow-spatial-float text-white">
              <div className="flex items-center gap-2 text-xs font-bold text-cordova-gold uppercase tracking-wider mb-2">
                <Utensils size={14} />
                <span>Place your order</span>
              </div>
              <h4 className="font-serif text-lg font-bold text-white line-clamp-1">{hero.name}</h4>
              <p className="text-xs text-stone-300 line-clamp-2 mt-1">{hero.description}</p>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
                <span className="font-bold text-base text-amber-400">₱{hero.price}</span>
                <button
                  onClick={() =>
                    handleOpenOrder({
                      name: hero.name,
                      price: hero.price,
                      description: hero.description,
                      image: hero.image,
                      tag: '🏆 Signature Highlight',
                    })
                  }
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all active:scale-95 flex items-center gap-1"
                >
                  <ShoppingBag size={12} />
                  <span>Order</span>
                </button>
              </div>
            </div>

            {/* Quick Chef Badge */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-stone-300 text-xs">
              <Award size={18} className="text-emerald-400 shrink-0" />
              <span>Prepared fresh daily with authentic local spices and ingredients.</span>
            </div>
          </motion.div>

          {/* Center Column: Big 3D Floating Dish with Interactive Hotspots */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-6 relative flex flex-col items-center justify-center py-4"
          >
            {/* Main Floating Dish Presentation */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group"
            >
              <Image
                src={hero.image}
                alt={hero.name}
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Interactive Hotspot Pulses on the Food */}
              {hero.hotspots.map((spot, idx) => {
                const isOpen = activeHotspot === idx;
                return (
                  <div
                    key={idx}
                    style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  >
                    {/* Hotspot Pulse Button */}
                    <button
                      onClick={() => setActiveHotspot(isOpen ? null : idx)}
                      onMouseEnter={() => setActiveHotspot(idx)}
                      className="relative flex items-center justify-center h-7 w-7 rounded-full bg-white/90 text-stone-900 shadow-[0_0_15px_rgba(255,255,255,0.8)] border border-white/80 hover:scale-125 transition-transform cursor-pointer"
                      title={spot.title}
                      aria-label={spot.title}
                    >
                      <span className="absolute -inset-1 rounded-full bg-white/40 animate-ping" />
                      <span className="relative text-[10px] font-black">+{idx + 1}</span>
                    </button>

                    {/* Popover Tooltip */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5, scale: 0.9 }}
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 sm:w-56 p-3 rounded-xl bg-black/90 backdrop-blur-xl border border-white/30 text-white text-xs shadow-2xl z-30 pointer-events-none"
                        >
                          <div className="flex items-center gap-1 text-cordova-gold font-bold mb-1">
                            <Sparkles size={11} />
                            <span>{spot.title}</span>
                          </div>
                          <p className="text-[11px] text-stone-200 leading-relaxed">{spot.desc}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>

            {/* Hotspot helper text */}
            <p className="text-[11px] text-emerald-300/80 mt-4 flex items-center gap-1.5 font-medium tracking-wide">
              <Info size={12} /> Tap numbers on the dish to discover ingredient secrets
            </p>
          </motion.div>

          {/* Right Column: Social Proof & Order CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 flex flex-col gap-5 text-white"
          >
            {/* 100K+ Bites Stat Card */}
            <div className="bg-white/10 dark:bg-black/40 backdrop-blur-2xl border border-white/20 rounded-2xl p-5 shadow-spatial-float">
              <div className="text-3xl font-black font-serif text-white tracking-tight">10K+</div>
              <p className="text-xs font-semibold text-emerald-300 mt-0.5">Happy bites delivered</p>

              {/* Avatar Pile */}
              <div className="flex items-center gap-2 mt-4">
                <div className="flex -space-x-2">
                  <div className="h-8 w-8 rounded-full border-2 border-white overflow-hidden relative">
                    <Image
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                      alt="Reviewer"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="h-8 w-8 rounded-full border-2 border-white overflow-hidden relative">
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                      alt="Reviewer"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="h-8 w-8 rounded-full border-2 border-white overflow-hidden relative">
                    <Image
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                      alt="Reviewer"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <span className="text-[11px] text-stone-300 font-medium">Loved by locals</span>
              </div>
            </div>

            {/* Main Order CTA Button */}
            <button
              onClick={() =>
                handleOpenOrder({
                  name: hero.name,
                  price: hero.price,
                  description: hero.description,
                  image: hero.image,
                  tag: '⭐ Signature Experience',
                })
              }
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm tracking-wider uppercase shadow-[0_8px_25px_rgba(16,185,129,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)] active:scale-95 transition-all flex items-center justify-center gap-2 border border-emerald-300/40"
            >
              <ShoppingBag size={18} />
              <span>ORDER NOW &bull; ₱{hero.price}</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🍴 2. CATEGORIZED SPATIAL GLASS MENU BROWSER */}
      {/* ========================================================================= */}
      <section className="space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles size={20} className="text-cordova-gold animate-pulse" />
              <h3 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
                Explore Full Menu
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
              Freshly crafted delicacies and island favorites ready for your order.
            </p>
          </div>

          {/* Menu Search Bar */}
          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, drinks..."
              className="w-full pl-9 pr-8 py-2.5 text-xs bg-white/80 dark:bg-black/30 backdrop-blur-md border border-stone-200/80 dark:border-white/10 rounded-xl text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-cordova-green/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Category Pill Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categoryTabs.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all shrink-0 select-none ${
                  isSelected
                    ? 'bg-gradient-to-r from-cordova-green to-emerald-700 text-white shadow-spatial-sm border border-emerald-400/40 scale-105'
                    : 'bg-white/80 dark:bg-white/5 hover:bg-stone-100 dark:hover:bg-white/10 text-stone-700 dark:text-stone-300 border border-stone-200/80 dark:border-white/10 backdrop-blur-md'
                }`}
              >
                {cat === 'All' ? '✨ All Dishes' : cat}
              </button>
            );
          })}
        </div>

        {/* Dish Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center text-stone-400 bg-white/40 dark:bg-white/5 rounded-2xl border border-stone-200/60 dark:border-white/10">
            <Utensils size={36} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm font-semibold">No menu dishes found matching &quot;{searchQuery}&quot;</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="mt-3 text-xs text-cordova-green dark:text-emerald-400 font-bold underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: Math.min(idx, 6) * 0.05 }}
                className="group relative bg-white/80 dark:bg-[#161c18]/80 backdrop-blur-xl border border-white/60 dark:border-white/10 rounded-2xl overflow-hidden shadow-spatial-sm hover:shadow-spatial-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Dish Card Top / Image */}
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                    {/* Tag Badge */}
                    {item.tag && (
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold tracking-wider uppercase flex items-center gap-1">
                        <span>{item.tag}</span>
                      </div>
                    )}

                    {/* Price Badge */}
                    <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-amber-500/95 backdrop-blur-md text-white font-bold text-sm shadow-md border border-amber-300/40">
                      ₱{item.price}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 sm:p-5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cordova-gold">
                      {item.category}
                    </span>
                    <h4 className="font-serif text-base font-bold text-stone-900 dark:text-white group-hover:text-cordova-green dark:group-hover:text-emerald-400 transition-colors mt-0.5">
                      {item.name}
                    </h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1.5 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-4 sm:p-5 pt-0 mt-auto">
                  <button
                    onClick={() => handleOpenOrder(item)}
                    className="w-full py-2.5 px-4 rounded-xl bg-stone-100 dark:bg-white/10 hover:bg-cordova-green hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white text-stone-800 dark:text-stone-200 text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 active:scale-95 border border-stone-200/60 dark:border-white/10 group-hover:border-cordova-green/50"
                  >
                    <ShoppingBag size={14} />
                    <span>Quick Order / Details</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 🛍️ 3. SPATIAL QUICK ORDER & DISH DETAIL MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {modalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white/95 dark:bg-[#151c17]/95 backdrop-blur-2xl border border-white/60 dark:border-white/15 rounded-3xl shadow-[0_24px_64px_rgba(0,0,0,0.5)] overflow-hidden text-stone-900 dark:text-white"
            >
              {/* Close Button */}
              <button
                onClick={() => setModalItem(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                title="Close"
              >
                <X size={18} />
              </button>

              {/* Modal Dish Header Photo */}
              <div className="relative h-56 w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
                <Image src={modalItem.image} alt={modalItem.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                  <div>
                    {modalItem.tag && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-cordova-gold bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-sm">
                        {modalItem.tag}
                      </span>
                    )}
                    <h3 className="font-serif text-2xl font-bold text-white mt-1">{modalItem.name}</h3>
                  </div>
                  <span className="text-xl font-bold text-amber-400">₱{modalItem.price}</span>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-5">
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {modalItem.description}
                </p>

                {/* Quantity Selector */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-100/80 dark:bg-white/5 border border-stone-200/80 dark:border-white/10">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300">
                    Select Quantity
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-1.5 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-white/10 text-stone-700 dark:text-stone-200 hover:bg-stone-200 active:scale-95"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-bold text-sm min-w-[20px] text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-1.5 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-white/10 text-stone-700 dark:text-stone-200 hover:bg-stone-200 active:scale-95"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Special Instructions */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1.5">
                    Special Preparation Notes (Optional)
                  </label>
                  <input
                    type="text"
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    placeholder="e.g. Less spicy, extra sauce, separate dressing..."
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 dark:bg-black/30 border border-stone-200 dark:border-white/10 rounded-xl text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-cordova-green/50"
                  />
                </div>

                {/* Action Buttons: Direct Call & Confirm Order */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  {restaurant.phone && (
                    <a
                      href={`tel:${restaurant.phone.replace(/\s+/g, '')}`}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-stone-100 dark:bg-white/10 hover:bg-stone-200 dark:hover:bg-white/15 text-stone-800 dark:text-stone-200 text-xs font-bold uppercase tracking-wider border border-stone-200 dark:border-white/10 transition-all shrink-0"
                    >
                      <Phone size={15} className="text-emerald-500" />
                      <span>Call {restaurant.phone}</span>
                    </a>
                  )}

                  <button
                    onClick={handleConfirmOrder}
                    className="w-full flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-cordova-green to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-xs font-bold uppercase tracking-wider shadow-spatial-sm active:scale-95 transition-all"
                  >
                    <Check size={16} />
                    <span>Confirm Selection &bull; ₱{(modalItem.price * quantity).toFixed(0)}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SpatialRestaurantMenu;

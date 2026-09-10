import type { MenuItem, MenuCategory } from '@/lib/types';

export const PAROLA_CATEGORIES: MenuCategory[] = [
  {
    "id": "532987c3-038d-4083-896d-5e3e68c87f7d",
    "restaurant_id": "parola-seaview-restaurant",
    "name": "Parola Seafood & House Specialties",
    "sort_order": 1
  },
  {
    "id": "b45449f6-a5d0-46a7-82f2-b7c71b57ca62",
    "restaurant_id": "parola-seaview-restaurant",
    "name": "Pork, Beef & Meat Specialties",
    "sort_order": 2
  },
  {
    "id": "dcf35cc2-21bc-49f0-a4dc-b0b75a4ac0c5",
    "restaurant_id": "parola-seaview-restaurant",
    "name": "Soups, Noodles & Native Dishes",
    "sort_order": 3
  },
  {
    "id": "d66da36b-dd99-4c24-afea-0edb0d53d352",
    "restaurant_id": "parola-seaview-restaurant",
    "name": "Parola Seafood Bilao & Group Sets",
    "sort_order": 4
  },
  {
    "id": "7475bafb-7505-4d38-97e4-d9c34056aa41",
    "restaurant_id": "parola-seaview-restaurant",
    "name": "Rice & Side Extras",
    "sort_order": 5
  },
  {
    "id": "d984b38a-b6e5-4ce2-bf7b-cda91a5f1d7e",
    "restaurant_id": "parola-seaview-restaurant",
    "name": "Desserts, Shakes & Drinks",
    "sort_order": 6
  }
];

export const PAROLA_MENU_ITEMS: MenuItem[] = [
  {
    "id": "a6a5e8eb-51a1-473a-a893-542acfe7dc2e",
    "restaurant_id": "parola-seaview-restaurant",
    "category_id": "532987c3-038d-4083-896d-5e3e68c87f7d",
    "category_name": "Parola Seafood & House Specialties",
    "name": "Baked Scallops with Cheese & Garlic",
    "description": "Fresh local Bantayan scallops baked to golden perfection with melted butter, rich garlic, and cheddar cheese.",
    "price": 295,
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU2SeIGTvOEIiD7TNoKqF_7o0tvYvvr98NZbYL50OJUA&s=10",
    "is_available": true,
    "dietary_tags": [
      "seafood"
    ]
  },
  {
    "id": "4f87bd94-e67e-4a0f-b8b2-df303172781a",
    "restaurant_id": "parola-seaview-restaurant",
    "category_id": "532987c3-038d-4083-896d-5e3e68c87f7d",
    "category_name": "Parola Seafood & House Specialties",
    "name": "Crispy Calamares",
    "description": "Tender squid rings lightly battered and deep-fried to a crisp crunch, served with homemade tartar dipping sauce.",
    "price": 285,
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReaLRSnvc46AJDHyMj97jDsg11bLV5jFsJWM8UV5FPGA&s=10",
    "is_available": true,
    "dietary_tags": [
      "seafood"
    ]
  },
  {
    "id": "19cf39c6-695a-48fb-a9a0-6d66ef419717",
    "restaurant_id": "parola-seaview-restaurant",
    "category_id": "532987c3-038d-4083-896d-5e3e68c87f7d",
    "category_name": "Parola Seafood & House Specialties",
    "name": "Garlic Butter Shrimp",
    "description": "Plump succulent prawns tossed in savory golden garlic butter sauce and fresh island spring onions.",
    "price": 360,
    "image_url": "https://www.thepeachkitchen.com/wp-content/uploads/2023/12/Garlic-Butter-Shrimp-with-Ketchup2.png",
    "is_available": true,
    "dietary_tags": [
      "seafood"
    ]
  },
  {
    "id": "510a2080-5aa5-407e-87f1-ea49b7c64134",
    "restaurant_id": "parola-seaview-restaurant",
    "category_id": "532987c3-038d-4083-896d-5e3e68c87f7d",
    "category_name": "Parola Seafood & House Specialties",
    "name": "Grilled Tuna Panga (Seaside Grill)",
    "description": "Charcoal-grilled premium tuna jaw glazed in sweet-savory calamansi soy marinade and chili garlic.",
    "price": 395,
    "image_url": "https://www.thepeachkitchen.com/wp-content/uploads/2016/09/Grilled-Tuna-Panga.png",
    "is_available": true,
    "dietary_tags": [
      "seafood",
      "grilled"
    ]
  },
  {
    "id": "b79b48fa-23ee-4ebd-92fd-f82194feb52c",
    "restaurant_id": "parola-seaview-restaurant",
    "category_id": "532987c3-038d-4083-896d-5e3e68c87f7d",
    "category_name": "Parola Seafood & House Specialties",
    "name": "Tuna Pomelo Kinilaw",
    "description": "Fresh raw yellowfin tuna cubes ceviche cured in native coconut vinegar, ginger, chili, and sweet Davao pomelo pulp.",
    "price": 275,
    "image_url": "https://kusinasecrets.com/wp-content/uploads/2025/04/u3317447599_Homemade_Filipino_Tuna_Kinilaw_in_a_white_ceramic_8957013c-ba69-4769-9a57-4b16995438df_2-500x500.jpg",
    "is_available": true,
    "dietary_tags": [
      "seafood",
      "spicy"
    ]
  },
  {
    "id": "0c63a826-8f36-4db5-b46a-4d70150283c9",
    "restaurant_id": "parola-seaview-restaurant",
    "category_id": "532987c3-038d-4083-896d-5e3e68c87f7d",
    "category_name": "Parola Seafood & House Specialties",
    "name": "Grilled Stuffed Squid (Inihaw na Pusit)",
    "description": "Whole ocean squid stuffed with diced tomatoes, onions, and native herbs, grilled over open charcoal embers.",
    "price": 330,
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg2emjnvjFE_dRW9Q0SrRjJP6er1ZTRa91_fUHlv5lOJfziQFiPHt4DyA&s=10",
    "is_available": true,
    "dietary_tags": [
      "seafood",
      "grilled"
    ]
  },
  {
    "id": "7f534ee1-2532-4ea0-a192-aba0c9fe8cc6",
    "restaurant_id": "parola-seaview-restaurant",
    "category_id": "532987c3-038d-4083-896d-5e3e68c87f7d",
    "category_name": "Parola Seafood & House Specialties",
    "name": "Sweet & Sour Lapu-Lapu",
    "description": "Crispy fried local grouper fillet smothered in vibrant sweet and sour bell pepper sauce with pineapple chunks.",
    "price": 420,
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFAwlbmBbi6Slexl19wcrg8DH6XvIGE2f4kvVfpvhmqM0_X1ftM0IB8aY&s=10",
    "is_available": true,
    "dietary_tags": [
      "seafood"
    ]
  },
  {
    "id": "a9fe1465-0180-4df1-acd8-5d79d3b9b434",
    "restaurant_id": "parola-seaview-restaurant",
    "category_id": "532987c3-038d-4083-896d-5e3e68c87f7d",
    "category_name": "Parola Seafood & House Specialties",
    "name": "Sizzling Gambas al Ajillo",
    "description": "Spanish-Filipino style spicy sautéed shrimp bubbling on a cast-iron skillet with olive oil, lots of toasted garlic, and chili peppers.",
    "price": 320,
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKDiLne_EaFS9DH_udyhsgNJlB2u4jQ-9U-TLRlV3rSA&s=10",
    "is_available": true,
    "dietary_tags": [
      "seafood",
      "spicy"
    ]
  },
  {
    "id": "48213004-b4d1-41d2-96c6-bfed28fbec02",
    "restaurant_id": "parola-seaview-restaurant",
    "category_id": "b45449f6-a5d0-46a7-82f2-b7c71b57ca62",
    "category_name": "Pork, Beef & Meat Specialties",
    "name": "Parola Signature Crispy Pata",
    "description": "Deep-fried pork knuckle with blistered crackling skin and juicy tender meat, served with spiced soy vinegar dip.",
    "price": 695,
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWb4Hhn5AXUwTBjVKFCobvoPbKe_p6RD41dsZHLUSUyA&s=10",
    "is_available": true,
    "dietary_tags": [
      "pork"
    ]
  },
  {
    "id": "caab8f8f-344e-4fd4-8ecc-28efd0b250d6",
    "restaurant_id": "parola-seaview-restaurant",
    "category_id": "b45449f6-a5d0-46a7-82f2-b7c71b57ca62",
    "category_name": "Pork, Beef & Meat Specialties",
    "name": "Sizzling Pork Sisig with Egg",
    "description": "Minced pork cheeks and crispy mask seasoned with calamansi, onions, and chili peppers, topped with a fresh farm egg.",
    "price": 265,
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9xn7LNABu1ygwBh0BGh1pfNSOqeXOYWg9R8LRMgQ6zQ&s=10",
    "is_available": true,
    "dietary_tags": [
      "pork",
      "spicy"
    ]
  },
  {
    "id": "fa263cbc-3918-4608-af4e-6006e6f25791",
    "restaurant_id": "parola-seaview-restaurant",
    "category_id": "b45449f6-a5d0-46a7-82f2-b7c71b57ca62",
    "category_name": "Pork, Beef & Meat Specialties",
    "name": "Signature Tinapa Sisig",
    "description": "Parola specialty smoked fish flakes sautéed with aromatics, mayonnaise, and chili on a sizzling plate.",
    "price": 245,
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFTq1nFAdDhUwI5x4S80vbceMXo3M16tZr9G_nwvEmnw&s=10",
    "is_available": true,
    "dietary_tags": [
      "seafood",
      "spicy"
    ]
  },
  {
    "id": "6dec27e6-dafd-4498-b3e5-c34fcb90b8af",
    "restaurant_id": "parola-seaview-restaurant",
    "category_id": "b45449f6-a5d0-46a7-82f2-b7c71b57ca62",
    "category_name": "Pork, Beef & Meat Specialties",
    "name": "Beef Kare-Kare with Bagoong Alamang",
    "description": "Tender beef shank and tripe stewed in thick savory peanut sauce with string beans, eggplant, pechay, and shrimp paste.",
    "price": 450,
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5nnhGQ2QW8hYwsMqKKjxrO8xNA6OqC5lC3BtvVwylSw&s=10",
    "is_available": true,
    "dietary_tags": [
      "beef"
    ]
  },
  {
    "id": "5d7f79f7-5571-47e8-b88a-d93978b490a5",
    "restaurant_id": "parola-seaview-restaurant",
    "category_id": "b45449f6-a5d0-46a7-82f2-b7c71b57ca62",
    "category_name": "Pork, Beef & Meat Specialties",
    "name": "Lechon Kawali",
    "description": "Golden crunchy pork belly slabs fried to crisp perfection, accompanied by homemade liver gravy and spiced vinegar.",
    "price": 330,
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0B6fkOlijN29x4DYrvsedu6knlm8PKkqd3XT4NrpJ9Q&s=10",
    "is_available": true,
    "dietary_tags": [
      "pork"
    ]
  },
  {
    "id": "b32e0b4b-8643-45a2-a979-0dec84c8c0c1",
    "restaurant_id": "parola-seaview-restaurant",
    "category_id": "b45449f6-a5d0-46a7-82f2-b7c71b57ca62",
    "category_name": "Pork, Beef & Meat Specialties",
    "name": "Crispy Buttered Fried Chicken (Whole)",
    "description": "Deep-fried whole marinated chicken coated in aromatic melted garlic butter and golden seasonings.",
    "price": 380,
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8Xg0gDlZ7xBtAPhXaHZKBWjD3vkKK1Y6Z_qBJtVqmQw&s=10",
    "is_available": true,
    "dietary_tags": [
      "chicken"
    ]
  },
  {
    "id": "b94a91c9-80be-4ebb-a852-a97473a6979e",
    "restaurant_id": "parola-seaview-restaurant",
    "category_id": "b45449f6-a5d0-46a7-82f2-b7c71b57ca62",
    "category_name": "Pork, Beef & Meat Specialties",
    "name": "Pork BBQ Skewers (4 Sticks)",
    "description": "Tender skewered pork shoulder glazed in sweet Filipino banana ketchup and calamansi barbecue basting.",
    "price": 195,
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq-oWjQVFJoPIwFsyCFFWkD-e1KPU-7bbem-fwwwxSVQ&s=10",
    "is_available": true,
    "dietary_tags": [
      "pork",
      "grilled"
    ]
  },
  {
    "id": "9d45b59e-bc30-4957-a413-b03a24f63ad5",
    "restaurant_id": "parola-seaview-restaurant",
    "category_id": "dcf35cc2-21bc-49f0-a4dc-b0b75a4ac0c5",
    "category_name": "Soups, Noodles & Native Dishes",
    "name": "Sinigang na Isda sa Bayabas & Sampalok",
    "description": "Fresh island fish simmered in tangy tamarind and guava broth with kangkong, radish, tomatoes, and long green chili.",
    "price": 345,
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXGSagoTqcbxLBelDoDOjIx4BZlvLjZ-rivTYhxJmrmpz2HpCywWdLeKo&s=10",
    "is_available": true,
    "dietary_tags": [
      "seafood",
      "soup"
    ]
  },
  {
    "id": "d2cc2597-b8ec-4498-81f8-3d73a780dcfe",
    "restaurant_id": "parola-seaview-restaurant",
    "category_id": "dcf35cc2-21bc-49f0-a4dc-b0b75a4ac0c5",
    "category_name": "Soups, Noodles & Native Dishes",
    "name": "Nilarang na Tanguige / Bakasi",
    "description": "Authentic Cordova-style sour fish stew prepared with fermented black beans (tausi), ginger, tomatoes, and lemongrass.",
    "price": 320,
    "image_url": "https://pbs.twimg.com/media/EhYyrC2XsAAwRAl.jpg",
    "is_available": true,
    "dietary_tags": [
      "seafood",
      "soup"
    ]
  },
  {
    "id": "5260c257-955d-4fd6-9044-bda75c4c3b06",
    "restaurant_id": "parola-seaview-restaurant",
    "category_id": "dcf35cc2-21bc-49f0-a4dc-b0b75a4ac0c5",
    "category_name": "Soups, Noodles & Native Dishes",
    "name": "Sinigang na Baboy",
    "description": "Tender pork ribs simmered in sour tamarind broth loaded with garden kangkong, taro root, eggplant, and string beans.",
    "price": 340,
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYo5JcyksRbq4HGY8_KLL1PTvs_yS0DUym6a5CPN7fWlsh9yw_kGest6U&s=10",
    "is_available": true,
    "dietary_tags": [
      "pork",
      "soup"
    ]
  },
  {
    "id": "66ee019a-3c9b-4396-b772-ad9670cade24",
    "restaurant_id": "parola-seaview-restaurant",
    "category_id": "dcf35cc2-21bc-49f0-a4dc-b0b75a4ac0c5",
    "category_name": "Soups, Noodles & Native Dishes",
    "name": "Special Bulalo Soup with Bone Marrow",
    "description": "Slow-boiled beef shank soup with rich melted bone marrow, sweet corn on the cob, pechay, and whole peppercorns.",
    "price": 430,
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi0CBbkVlHJ124l82AVoB4b2qdYbJ_-Yyi28hM--zI6g&s=10",
    "is_available": true,
    "dietary_tags": [
      "beef",
      "soup"
    ]
  },
  {
    "id": "2cbb4365-6f24-4047-b236-1dcaad71d571",
    "restaurant_id": "parola-seaview-restaurant",
    "category_id": "dcf35cc2-21bc-49f0-a4dc-b0b75a4ac0c5",
    "category_name": "Soups, Noodles & Native Dishes",
    "name": "Native Tinolang Manok",
    "description": "Free-range native chicken soup infused with fresh ginger broth, green papaya slices, dahon ng sili, and lemongrass.",
    "price": 310,
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu8-32NmLQG5KS6zz-5TwSsSX-QFdNlG5rRqc4t7MpTQ&s=10",
    "is_available": true,
    "dietary_tags": [
      "chicken",
      "soup"
    ]
  },
  {
    "id": "d07f9849-f483-4b3c-9455-a8cf63ddb130",
    "restaurant_id": "parola-seaview-restaurant",
    "category_id": "dcf35cc2-21bc-49f0-a4dc-b0b75a4ac0c5",
    "category_name": "Soups, Noodles & Native Dishes",
    "name": "Seafood Bam-i (Cebuano Pancit)",
    "description": "Stir-fried medley of egg noodles (canton) and glass vermicelli (sotanghon) with shrimp, squid, pork strips, and vegetables.",
    "price": 250,
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLsJYobXBAI8p9kc1NAy-IRnSA7rS65Bi174tPWEhTbg&s=10",
    "is_available": true,
    "dietary_tags": [
      "seafood",
      "noodles"
    ]
  },
  {
    "id": "a05a9853-512e-4431-8df8-634ead010fef",
    "restaurant_id": "parola-seaview-restaurant",
    "category_id": "dcf35cc2-21bc-49f0-a4dc-b0b75a4ac0c5",
    "category_name": "Soups, Noodles & Native Dishes",
    "name": "Special Pancit Canton Guisado",
    "description": "Savory stir-fried flour noodles topped with shrimp, chicken liver, tender pork, snow peas, carrots, and cabbage.",
    "price": 240,
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu_Q2YSY1IUYdvIKtez-RDpLL_DK_IwBMKeOrl5YtOeA&s=10",
    "is_available": true,
    "dietary_tags": [
      "noodles"
    ]
  },
  {
    "id": "e665bd11-18a3-4d0a-94de-b79acba786c2",
    "restaurant_id": "parola-seaview-restaurant",
    "category_id": "dcf35cc2-21bc-49f0-a4dc-b0b75a4ac0c5",
    "category_name": "Soups, Noodles & Native Dishes",
    "name": "Chopsuey Guisado with Seafood",
    "description": "Crisp garden vegetables including broccoli, cauliflower, carrots, young corn, and bell peppers sautéed with fresh shrimp and squid.",
    "price": 230,
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgZjroHA2g6Y5qnqzj-yUjPyAohQ7t81va7fG3ZFNAJeKXsYrF-UK6b4k&s=10",
    "is_available": true,
    "dietary_tags": [
      "vegetables"
    ]
  },
  {
    "id": "346c9460-b105-47d4-bd45-dc80aafc0560",
    "restaurant_id": "parola-seaview-restaurant",
    "category_id": "d66da36b-dd99-4c24-afea-0edb0d53d352",
    "category_name": "Parola Seafood Bilao & Group Sets",
    "name": "Parola Grand Seafood Bilao (Good for 4-6)",
    "description": "Signature seaside feast platter with Baked Scallops, Grilled Squid, Garlic Butter Shrimp, Crispy Calamares, Tuna Kinilaw, and Garlic Rice.",
    "price": 1350,
    "image_url": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80",
    "is_available": true,
    "dietary_tags": [
      "seafood",
      "platter"
    ]
  },
  {
    "id": "bfa88b88-78f0-42f3-9a4c-ff72d2cc412b",
    "restaurant_id": "parola-seaview-restaurant",
    "category_id": "d66da36b-dd99-4c24-afea-0edb0d53d352",
    "category_name": "Parola Seafood Bilao & Group Sets",
    "name": "Barkada Sunset Fiesta Set (Good for 4-5)",
    "description": "Crispy Pata, Pork Sisig, Buttered Chicken, Sinigang na Isda, Garlic Rice Platter, and 1 Pitcher of House Iced Tea.",
    "price": 1650,
    "image_url": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
    "is_available": true,
    "dietary_tags": [
      "platter"
    ]
  },
  {
    "id": "88ac34f0-609b-49ce-9485-8c0de6c896db",
    "restaurant_id": "parola-seaview-restaurant",
    "category_id": "d66da36b-dd99-4c24-afea-0edb0d53d352",
    "category_name": "Parola Seafood Bilao & Group Sets",
    "name": "Family Seaview Boodle Platter (Good for 6-8)",
    "description": "Boodle fight banquet on banana leaves with Inihaw na Pusit, Grilled Tuna Belly, Pork BBQ skewers, Lechon Kawali, Salted Eggs, Ensaladang Talong, and Unlimited Garlic Rice.",
    "price": 2150,
    "image_url": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    "is_available": true,
    "dietary_tags": [
      "platter",
      "grilled"
    ]
  },
  {
    "id": "1d955e21-3e5b-4ed8-b023-9c71d52c139e",
    "restaurant_id": "parola-seaview-restaurant",
    "category_id": "7475bafb-7505-4d38-97e4-d9c34056aa41",
    "category_name": "Rice & Side Extras",
    "name": "Garlic Butter Rice Platter (Big Bowl)",
    "description": "Fragrant jasmine rice stir-fried with lots of golden toasted garlic crisps and creamy butter.",
    "price": 160,
    "image_url": "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80",
    "is_available": true,
    "dietary_tags": [
      "rice"
    ]
  },
  {
    "id": "25bbb9f9-d1fb-4ffa-9a5e-3eb897eb0d3e",
    "restaurant_id": "parola-seaview-restaurant",
    "category_id": "7475bafb-7505-4d38-97e4-d9c34056aa41",
    "category_name": "Rice & Side Extras",
    "name": "Seafood Fried Rice Platter",
    "description": "Wok-tossed fried rice with chopped shrimp, squid bits, scrambled egg, and green peas.",
    "price": 240,
    "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80",
    "is_available": true,
    "dietary_tags": [
      "seafood",
      "rice"
    ]
  },
  {
    "id": "dadb6618-212c-487c-ac21-4e9dd5e2f677",
    "restaurant_id": "parola-seaview-restaurant",
    "category_id": "7475bafb-7505-4d38-97e4-d9c34056aa41",
    "category_name": "Rice & Side Extras",
    "name": "Steamed White Jasmine Rice Platter",
    "description": "Platter of steaming fluffy white jasmine rice, good for 4-5 persons.",
    "price": 120,
    "image_url": "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=600&q=80",
    "is_available": true,
    "dietary_tags": [
      "rice",
      "vegetarian"
    ]
  },
  {
    "id": "7531455d-a146-4744-b327-2a65ea940ad1",
    "restaurant_id": "parola-seaview-restaurant",
    "category_id": "7475bafb-7505-4d38-97e4-d9c34056aa41",
    "category_name": "Rice & Side Extras",
    "name": "Ensaladang Talong with Salted Egg & Tomatoes",
    "description": "Charred grilled eggplant with diced fresh tomatoes, red onions, and cured salted duck eggs in calamansi vinaigrette.",
    "price": 150,
    "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    "is_available": true,
    "dietary_tags": [
      "vegetables"
    ]
  },
  {
    "id": "0231667d-522a-431a-b941-62fdcd268834",
    "restaurant_id": "parola-seaview-restaurant",
    "category_id": "d984b38a-b6e5-4ce2-bf7b-cda91a5f1d7e",
    "category_name": "Desserts, Shakes & Drinks",
    "name": "Parola Halo-Halo Supreme with Ice Cream",
    "description": "Classic crushed ice dessert loaded with ube halaya, sweetened bananas, nata de coco, leche flan, pinipig, and a scoop of creamy ube ice cream.",
    "price": 145,
    "image_url": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80",
    "is_available": true,
    "dietary_tags": [
      "dessert"
    ]
  },
  {
    "id": "b99237cf-c6f8-48bf-982e-4653faf30ed5",
    "restaurant_id": "parola-seaview-restaurant",
    "category_id": "d984b38a-b6e5-4ce2-bf7b-cda91a5f1d7e",
    "category_name": "Desserts, Shakes & Drinks",
    "name": "Fresh Ripe Mango Shake",
    "description": "Refreshing blended shake made with sweet ripe Cebu mangoes and chilled milk.",
    "price": 125,
    "image_url": "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80",
    "is_available": true,
    "dietary_tags": [
      "beverage"
    ]
  },
  {
    "id": "64b698f1-50e7-41ef-b2fd-b895c2860bc2",
    "restaurant_id": "parola-seaview-restaurant",
    "category_id": "d984b38a-b6e5-4ce2-bf7b-cda91a5f1d7e",
    "category_name": "Desserts, Shakes & Drinks",
    "name": "Fresh Young Coconut (Buko)",
    "description": "Fresh whole young coconut served chilled with natural sweet coconut water and soft meat.",
    "price": 95,
    "image_url": "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?auto=format&fit=crop&w=600&q=80",
    "is_available": true,
    "dietary_tags": [
      "beverage"
    ]
  },
  {
    "id": "e91584cc-3bcc-45a8-9aeb-5228e58d60f3",
    "restaurant_id": "parola-seaview-restaurant",
    "category_id": "d984b38a-b6e5-4ce2-bf7b-cda91a5f1d7e",
    "category_name": "Desserts, Shakes & Drinks",
    "name": "Buko Pandan Shake",
    "description": "Creamy blended young coconut shake flavored with fragrant pandan leaves and jelly pearls.",
    "price": 120,
    "image_url": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    "is_available": true,
    "dietary_tags": [
      "beverage"
    ]
  },
  {
    "id": "9230a51b-c774-40ce-8ea0-5676f3580379",
    "restaurant_id": "parola-seaview-restaurant",
    "category_id": "d984b38a-b6e5-4ce2-bf7b-cda91a5f1d7e",
    "category_name": "Desserts, Shakes & Drinks",
    "name": "Traditional Creamy Leche Flan",
    "description": "Rich and silky steamed caramel egg custard made with pure egg yolks and condensed milk.",
    "price": 95,
    "image_url": "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80",
    "is_available": true,
    "dietary_tags": [
      "dessert"
    ]
  },
  {
    "id": "33cbe467-8cd6-48b0-9b52-c5dff7f9eaa5",
    "restaurant_id": "parola-seaview-restaurant",
    "category_id": "d984b38a-b6e5-4ce2-bf7b-cda91a5f1d7e",
    "category_name": "Desserts, Shakes & Drinks",
    "name": "House Iced Tea Pitcher (1.5L)",
    "description": "Freshly brewed sweet calamansi iced tea served ice-cold in a family sharing pitcher.",
    "price": 160,
    "image_url": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
    "is_available": true,
    "dietary_tags": [
      "beverage"
    ]
  },
  {
    "id": "04cdb7ed-7494-4c67-9ecc-8ec370032bc4",
    "restaurant_id": "parola-seaview-restaurant",
    "category_id": "d984b38a-b6e5-4ce2-bf7b-cda91a5f1d7e",
    "category_name": "Desserts, Shakes & Drinks",
    "name": "San Miguel Pale Pilsen / Light (330ml)",
    "description": "Chilled iconic Filipino beer bottle, perfect companion for sunset seaside seafood dining.",
    "price": 85,
    "image_url": "https://images.unsplash.com/photo-1608270119335-59427b03b174?auto=format&fit=crop&w=600&q=80",
    "is_available": true,
    "dietary_tags": [
      "beverage",
      "alcohol"
    ]
  }
];

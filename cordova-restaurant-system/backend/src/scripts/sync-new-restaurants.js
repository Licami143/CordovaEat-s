require('dotenv').config();
const { query } = require('../config/db');

async function run() {
  const restaurants = [
    {
      id: 'aaaa0007-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      name: 'Barracks Grill and Resto Bar',
      slug: 'barracks-grill-and-resto-bar',
      description: 'casual nightspot and dining place.',
      barangay: 'Gabi',
      address: 'Gabi, Cordova, Cebu',
      lat: 10.2490, lng: 123.9518,
      cover: 'https://lh3.googleusercontent.com/grass-cs/ACvplmP1_ZIZux8LEYKASSCkThb2Q5Xfp8toCwBgS6gR0yYblz4-nHIdDYzdpQMjKUn7jXu5G9wYNFod4dWcCTSvjT9sCay87OKunPdMMUupTd3j7StpHg43j3LIzG2a_KFUd1xr1AFL=s294-w294-h220-n-k-no',
    },
    {
      id: 'aaaa0008-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      name: 'BRIC Food Park',
      slug: 'bric-food-park',
      description: 'a vibrant, open-air al fresco dining destination.',
      barangay: 'San Miguel',
      address: 'San Miguel, Cordova, Cebu',
      lat: 10.2402, lng: 123.9492,
      cover: '',
    },
  ];

  for (const r of restaurants) {
    await query(
      `INSERT INTO restaurants (
         id, owner_id, name, slug, description, address, barangay, latitude, longitude,
         phone, price_range, services_offered, status, verified_at, avg_rating, review_count, cover_image_url, is_active
       ) VALUES (
         $1, '22222222-2222-2222-a222-222222222221', $2, $3, $4, $5, $6, $7, $8,
         NULL, 'budget', ARRAY['dine_in','takeout']::service_type[], 'verified', NOW(), 0, 0, $9, TRUE
       ) ON CONFLICT (id) DO UPDATE SET
         name = EXCLUDED.name,
         slug = EXCLUDED.slug,
         description = EXCLUDED.description,
         address = EXCLUDED.address,
         barangay = EXCLUDED.barangay,
         cover_image_url = EXCLUDED.cover_image_url,
         is_active = TRUE`,
      [r.id, r.name, r.slug, r.description, r.address, r.barangay, r.lat, r.lng, r.cover || '']
    );
    console.log(`✅ Synced: ${r.name}`);
  }

  process.exit(0);
}

run().catch((err) => { console.error(err); process.exit(1); });

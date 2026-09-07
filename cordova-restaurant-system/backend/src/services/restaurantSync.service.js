const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

const RESTAURANTS_TS_PATH = path.resolve(__dirname, '../../../frontend/src/data/restaurants.ts');

function inferCategory(name = '', description = '', cuisines = []) {
  const text = `${name} ${description} ${Array.isArray(cuisines) ? cuisines.join(' ') : ''}`.toLowerCase();
  if (text.includes('cafe') || text.includes('café') || text.includes('coffee') || text.includes('macchiato')) return 'Cafe';
  if (text.includes('fast food') || text.includes('burger') || text.includes('fries')) return 'Fast Food';
  if (text.includes('street food') || text.includes('food park') || text.includes('tambayan')) return 'Street Food';
  if (text.includes('resto bar') || text.includes('bar and grill') || text.includes('restobar')) return 'Resto Bar';
  if (text.includes('pizza') || text.includes('pasta')) return 'Pizza';
  return 'Restaurant';
}

function syncToRestaurantTs(restaurant) {
  try {
    if (!fs.existsSync(RESTAURANTS_TS_PATH)) {
      logger.warn(`restaurants.ts not found at ${RESTAURANTS_TS_PATH}`);
      return false;
    }

    let content = fs.readFileSync(RESTAURANTS_TS_PATH, 'utf8');
    const slug = restaurant.slug || restaurant.id;
    const name = restaurant.name;
    const category = inferCategory(name, restaurant.description, restaurant.cuisines);
    const coverImage = restaurant.cover_image_url || restaurant.coverImageUrl || '';
    const barangay = restaurant.barangay || 'Cordova';
    const description = (restaurant.description || `Welcome to ${name} in Cordova, Cebu.`).replace(/'/g, "\\'");
    const address = (restaurant.address || '').replace(/'/g, "\\'");
    const phone = (restaurant.phone || '').replace(/'/g, "\\'");

    const entrySnippet = `  '${slug}': {\n    name: '${name.replace(/'/g, "\\'")}',\n    category: '${category}',\n    coverImage: '${coverImage}',\n    barangay: '${barangay.replace(/'/g, "\\'")}',\n    description: '${description}',\n    address: '${address}',\n    phone: '${phone}',\n  },\n`;

    // If slug already in customizations, update it
    const keyRegex = new RegExp(`['"]${slug}['"]\\s*:\\s*{[\\s\\S]*?},?`, 'm');
    if (keyRegex.test(content)) {
      content = content.replace(keyRegex, entrySnippet.trim());
      logger.info(`Updated existing entry for ${name} in restaurants.ts`);
    } else {
      // Insert right before the closing of RESTAURANT_CUSTOMIZATIONS
      const targetAnchor = '};\n\n\nexport function normalizeKey';
      const fallbackAnchor = '};\n\nexport function normalizeKey';
      const simpleAnchor = '};';

      if (content.includes(targetAnchor)) {
        content = content.replace(targetAnchor, `\n  // ${name}\n${entrySnippet}` + targetAnchor);
      } else if (content.includes(fallbackAnchor)) {
        content = content.replace(fallbackAnchor, `\n  // ${name}\n${entrySnippet}` + fallbackAnchor);
      } else {
        const lastIndex = content.lastIndexOf('};');
        if (lastIndex !== -1) {
          content = content.slice(0, lastIndex) + `\n  // ${name}\n${entrySnippet}` + content.slice(lastIndex);
        }
      }
      logger.info(`Added new entry for ${name} to restaurants.ts`);
    }

    fs.writeFileSync(RESTAURANTS_TS_PATH, content, 'utf8');
    return true;
  } catch (err) {
    logger.error('Failed to sync restaurant to restaurants.ts', { error: err.message });
    return false;
  }
}

module.exports = { syncToRestaurantTs, inferCategory };

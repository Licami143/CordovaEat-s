const asyncHandler = require('../utils/asyncHandler');
const searchModel = require('../models/search.model');
const rankingService = require('../services/rankingService');

/**
 * POST /api/search
 * Body: { keyword, cuisine, priceRange, maxDistanceKm, dietaryTags, userLat, userLng, page, limit }
 */
const searchAndRank = asyncHandler(async (req, res) => {
  const {
    keyword,
    cuisine,
    priceRange,
    maxDistanceKm,
    dietaryTags,
    userLat,
    userLng,
  } = req.body || {};

  const queryParams = {
    keyword: keyword ? String(keyword).trim() : '',
    cuisine: cuisine ? String(cuisine).trim() : undefined,
    priceRange,
    maxDistanceKm: maxDistanceKm != null ? Number(maxDistanceKm) : undefined,
    dietaryTags: Array.isArray(dietaryTags) ? dietaryTags : [],
    userLat: userLat != null ? Number(userLat) : undefined,
    userLng: userLng != null ? Number(userLng) : undefined,
  };

  // 1. Fetch active candidates
  const candidates = await searchModel.getSearchCandidates();
  const candidateIds = candidates.map((c) => c.id);

  // 2. Fetch menu items
  const menuItemsMap = await searchModel.getMenuItemsForRestaurants(candidateIds);

  // 3. Rank with AI relevance + subscription boost + sponsored slots
  const ranked = rankingService.rankRestaurants(candidates, queryParams, menuItemsMap);

  res.json({
    success: true,
    data: ranked,
    meta: {
      totalCount: ranked.length,
      sponsoredCount: ranked.filter((r) => r.isSponsored).length,
      query: queryParams,
    },
  });
});

module.exports = {
  searchAndRank,
};

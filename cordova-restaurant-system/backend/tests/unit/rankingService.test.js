const {
  scoreKeywordMatch,
  scorePriceFit,
  scoreDistance,
  scoreRating,
  scoreAvailability,
  getSubscriptionMultiplier,
  rankRestaurants,
  FEATURED_MIN_RELEVANCE_THRESHOLD,
  MAX_SPONSORED_SLOTS,
} = require('../../src/services/rankingService');

describe('Ranking Service — Scoring Functions and Ranking Engine', () => {
  describe('scoreKeywordMatch', () => {
    const sampleRestaurant = {
      name: 'Lantaw Floating Native Restaurant',
      description: 'Seafood and Filipino native dining by the water',
      cuisines: ['Seafood', 'Filipino'],
      dietary_options: ['Halal'],
    };

    const sampleMenuItems = [
      { name: 'Grilled Bangus', description: 'Fresh milkfish grilled to perfection', dietary_tags: ['Pescatarian'] },
      { name: 'Sinigang na Hipon', description: 'Sour tamarind shrimp soup', dietary_tags: ['Seafood'] },
    ];

    it('returns 1.0 baseline when no keyword is provided', () => {
      expect(scoreKeywordMatch(sampleRestaurant, '')).toBe(1.0);
      expect(scoreKeywordMatch(sampleRestaurant, null)).toBe(1.0);
    });

    it('gives high score for matching restaurant name', () => {
      const score = scoreKeywordMatch(sampleRestaurant, 'Lantaw Floating');
      expect(score).toBeGreaterThan(0.8);
    });

    it('matches keywords in menu items (e.g. Bangus, Sinigang)', () => {
      const score = scoreKeywordMatch(sampleRestaurant, 'Bangus', sampleMenuItems);
      expect(score).toBeGreaterThanOrEqual(0.5);
    });

    it('returns low score for non-matching keyword', () => {
      const score = scoreKeywordMatch(sampleRestaurant, 'Italian Pizza Pasta', sampleMenuItems);
      expect(score).toBeLessThan(0.3);
    });
  });

  describe('scorePriceFit', () => {
    it('returns 1.0 when price match is exact', () => {
      expect(scorePriceFit({ price_range: 'budget' }, 'budget')).toBe(1.0);
    });

    it('penalizes price tiers that differ from requested tier', () => {
      const closeScore = scorePriceFit({ price_range: 'moderate' }, 'budget');
      const farScore = scorePriceFit({ price_range: 'premium' }, 'budget');
      expect(closeScore).toBe(0.65);
      expect(farScore).toBe(0.1);
    });

    it('handles numeric [min, max] array price range', () => {
      expect(scorePriceFit({ price_range: 'budget' }, [0, 300])).toBe(1.0);
      expect(scorePriceFit({ price_range: 'premium' }, [0, 200])).toBe(0.2);
    });
  });

  describe('scoreDistance', () => {
    const restaurant = { latitude: 10.2500, longitude: 123.9500 };

    it('returns 1.0 when distance is 0', () => {
      expect(scoreDistance(restaurant, 10.2500, 123.9500, 10)).toBe(1.0);
    });

    it('returns 0.0 when distance is greater than maxDistanceKm', () => {
      // Point ~100km away
      expect(scoreDistance(restaurant, 11.2500, 123.9500, 10)).toBe(0.0);
    });

    it('returns 0.6 neutral score when user coordinates are missing', () => {
      expect(scoreDistance(restaurant, null, null, 10)).toBe(0.6);
    });
  });

  describe('scoreRating', () => {
    it('normalizes 5-star rating to 1.0', () => {
      expect(scoreRating({ avg_rating: 5.0 })).toBe(1.0);
    });

    it('normalizes 4.0 rating to 0.8', () => {
      expect(scoreRating({ avg_rating: 4.0 })).toBe(0.8);
    });

    it('handles 0 or missing rating safely', () => {
      expect(scoreRating({})).toBe(0.0);
    });
  });

  describe('scoreAvailability', () => {
    it('returns 1.0 for open and active restaurants', () => {
      expect(scoreAvailability({ is_open: true, is_active: true })).toBe(1.0);
    });

    it('returns 0.0 for closed restaurants', () => {
      expect(scoreAvailability({ is_open: false, is_active: true })).toBe(0.0);
    });
  });

  describe('getSubscriptionMultiplier', () => {
    it('returns 1.0 for none tier', () => {
      expect(getSubscriptionMultiplier({ subscription_tier: 'none' })).toBe(1.0);
    });

    it('returns 1.1 for basic tier', () => {
      expect(getSubscriptionMultiplier({ subscription_tier: 'basic' })).toBe(1.1);
    });

    it('returns 1.3 for premium tier', () => {
      expect(getSubscriptionMultiplier({ subscription_tier: 'premium' })).toBe(1.3);
    });

    it('returns 1.5 for featured tier', () => {
      expect(getSubscriptionMultiplier({ subscription_tier: 'featured' })).toBe(1.5);
    });

    it('reverts to 1.0 if subscription is expired', () => {
      const expiredDate = new Date(Date.now() - 86400000).toISOString();
      expect(
        getSubscriptionMultiplier({
          subscription_tier: 'featured',
          subscription_expires_at: expiredDate,
        })
      ).toBe(1.0);
    });
  });

  describe('rankRestaurants & Sponsored Slots Allocation', () => {
    const restaurants = [
      {
        id: 'rest-1',
        name: 'Cordova Seafood House',
        description: 'Fresh seafood grill',
        cuisines: ['Seafood'],
        price_range: 'moderate',
        avg_rating: 4.8,
        latitude: 10.25,
        longitude: 123.95,
        is_open: true,
        subscription_tier: 'none',
      },
      {
        id: 'rest-2',
        name: 'Featured Island Cafe',
        description: 'Seafood and drinks',
        cuisines: ['Seafood', 'Cafe'],
        price_range: 'moderate',
        avg_rating: 4.5,
        latitude: 10.25,
        longitude: 123.95,
        is_open: true,
        subscription_tier: 'featured',
      },
      {
        id: 'rest-3',
        name: 'Another Featured Bistro',
        description: 'Seafood specialty',
        cuisines: ['Seafood'],
        price_range: 'moderate',
        avg_rating: 4.6,
        latitude: 10.25,
        longitude: 123.95,
        is_open: true,
        subscription_tier: 'featured',
      },
      {
        id: 'rest-4',
        name: 'Irrelevant Featured Steakhouse',
        description: 'Steak and beef only',
        cuisines: ['Steakhouse'],
        price_range: 'expensive',
        avg_rating: 4.0,
        latitude: 10.25,
        longitude: 123.95,
        is_open: true,
        subscription_tier: 'featured',
      },
    ];

    it('reserves at most 2 sponsored slots at the top for relevant featured restaurants', () => {
      const results = rankRestaurants(restaurants, { keyword: 'seafood' });
      expect(results.length).toBeGreaterThan(0);

      const sponsoredResults = results.filter((r) => r.isSponsored);
      expect(sponsoredResults.length).toBeLessThanOrEqual(MAX_SPONSORED_SLOTS);
      expect(results[0].isSponsored).toBe(true);
      expect(results[1].isSponsored).toBe(true);
    });

    it('does NOT feature an irrelevant restaurant even if it has featured subscription tier', () => {
      const results = rankRestaurants(restaurants, { keyword: 'seafood', cuisine: 'Seafood' });
      const irrelevantResult = results.find((r) => r.id === 'rest-4');
      // rest-4 is steakhouse with no seafood, so filtered or low relevance
      if (irrelevantResult) {
        expect(irrelevantResult.isSponsored).toBe(false);
      }
    });

    it('multiplies relevance_score by subscription_boost for final_score', () => {
      const results = rankRestaurants(restaurants, { keyword: 'seafood' });
      for (const item of results) {
        const expectedFinal = Number((item.relevance_score * item.subscription_boost).toFixed(4));
        expect(item.final_score).toBeCloseTo(expectedFinal, 2);
      }
    });
  });
});

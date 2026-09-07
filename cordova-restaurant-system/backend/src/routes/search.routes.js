const router = require('express').Router();
const searchController = require('../controllers/search.controller');
const { optionalAuth } = require('../middleware/auth');

// POST /api/search — Public endpoint for AI ranked search with subscription boost
router.post('/', optionalAuth, searchController.searchAndRank);

module.exports = router;

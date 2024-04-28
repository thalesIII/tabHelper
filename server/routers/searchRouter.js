const express = require('express');
const searchController = require('../controllers/searchController');

const router = express.Router();

router.post('/api',
    searchController.searchUltimateGuitar,
    searchController.extractLinks,
    async (req, res, next) => {
        res.status(200).json(res.locals.links);
    }
)

module.exports = router;
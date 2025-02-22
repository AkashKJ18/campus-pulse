const express = require('express');
const router = express.Router();
const Permission = require('../models/permission.js');
const authenticateToken = require('./authorize-token.js');
const cacheMiddleware = require('../middleware/cache.js');

router.get('/list', authenticateToken, cacheMiddleware('permissions, 3600'), async (req, res) => {
    try {
        const permissions = await Permission.find();
        res.send(permissions);
    } catch (error) {
        res.status(500).send(error)
    }
});

module.exports = router;

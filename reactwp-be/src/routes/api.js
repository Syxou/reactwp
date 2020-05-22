const express = require('express');
const router = express.Router();

const pages = require('../components/api/pages')

/**
 * /api...
 */
router.get('/', function (req, res, next) {
    res.json({
        get_app_post: {
            all_get: '/api/page/all',
            byid_get: '/api/page/:id',
            page_data: '/api/page/:id/data',
        }
    });
});

router.use('/page', pages)

module.exports = router;

const express = require('express');
const router = express.Router();
const knex = require('../knex/knex')
const Pages = require('../models/pages')


router.get('/', function (req, res, next) {
    Pages.query()
        .then(pages => {
            res.json(pages)
        })

})

router.get('/:id', function (req, res, next) {
    const id = parseInt(req.params.id)
    Pages.query()
        .then(pages => {
            res.json(pages.filter(pages => pages.id === id))
        })
    console.log(id)
})


module.exports = router
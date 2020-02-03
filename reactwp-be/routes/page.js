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

router.post('/changes/', function (req, res) {
    var page = req.body;
    console.log(page)
    Pages.query()
        .update({ title: page.title })
        .where('id', page.id)
        .catch(err => {
            consol.log(err)
        })
    Pages.query()
        .then(pages => {
            res.json(pages.filter(pages => parseInt(pages.id) === parseInt(page.id)))
        })
})


module.exports = router
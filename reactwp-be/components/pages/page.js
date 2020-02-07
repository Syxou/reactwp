const express = require('express');
const router = express.Router();
const knex = require('../../knex/knex')
const Pages = require('./pages')

var slugify = require('slugify')


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


/**
 * add post (page) to db. 
 * body - ajax object page
 */

router.post('/add', function (req, res) {
    const page = req.body
    console.log(page)
    Pages.query()
        .insert({
            title: page.title,
            state: page.state,
            slug: page.slug,
            date_modifate: new Date()
        }).then(() => {
            res.sendStatus(200)
        })
        .catch(err => {
            console.log(err)
        })
})

router.post('/trash', function (req, res) {
    const page = req.body
    console.log(page)
    Pages.query()
        .update({ state: 'publish' })
        .where('id', page.id)
        .then(() => {
            res.sendStatus(200)
        })
        .catch(err => {
            res.json(err.message)
        })
})

router.post('/delete', function (req, res) {
    const page = req.body
    console.log(page)
    Pages.query()
        .deleteById(page.id)
        .then(() => {
            res.sendStatus(200)
        })
        .catch(err => {
            res.json(err.message)
        })
})

router.post('/changes/', function (req, res) {
    const page = req.body;
    console.log(page)
    Pages.query()
        .update({ title: page.title })
        .where('id', page.id)
        .catch(err => {
            console.log(err)
        })
    Pages.query()
        .then(pages => {
            res.json(pages.filter(pages => parseInt(pages.id) === parseInt(page.id)))
        })
})

module.exports = router
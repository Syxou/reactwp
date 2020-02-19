const express = require('express');
const router = express.Router();
const knex = require('../../knex/knex')
const Pages = require('./pages')
const PostData = require('../postData/model')

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
        })
        .then(() => {
            PostData.query()
                .insert({
                    post_content: JSON.stringify(content),
                    post_id: page.id,
                    post_type: 'content',
                    state: 'draft'
                })
                .catch(err => {
                    console.log(err)
                })
        })
        .then(() => {
            res.sendStatus(200)
        })
        .catch(err => {
            console.log(err)
        })
})

router.post('/trash', function (req, res) {
    const page = req.body
    if (req.body.state === 'trash') {
        Pages.query()
            .deleteById(page.id)
            .then(() => {
                res.sendStatus(200)
            })
            .catch(err => {
                res.json(err.message)
            })
    } else
        Pages.query()
            .update({ state: 'trash' })
            .where('id', page.id)
            .then(() => {
                res.sendStatus(200)
            })
            .catch(err => {
                res.json(err.message)
            })
    console.log(page)
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
    const page = req.body.page;
    const content = req.body.content;

    Pages.query()
        .update({ title: page.title })
        .where('id', page.id)
        .catch(err => {
            console.log(err)
        })

    PostData.query()
        .where('post_id', page.id)
        .where('post_type', 'content')
        .update({ post_content: JSON.stringify(content) })
        .catch(err => {
            console.log(err)
        })

    Pages.query()
        .then(pages => {
            res.json(pages.filter(pages => parseInt(pages.id) === parseInt(page.id)))
        })
})

module.exports = router
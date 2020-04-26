const express = require('express');
const router = express.Router();
// const knex = require('../../knex/knex')
const Post = require('../../models/post')
const PostData = require('../postData/model')

// var slugify = require('slugify')

router.get('/', function (req, res) {
    Post.query()
        .then(Post => {
            res.json(Post)
        })
})

router.get('/:id', function (req, res) {
    const id = parseInt(req.params.id)
    Post.query()
        .then(Post => {
            res.json(Post.filter(Post => Post.id === id))
        })

})

router.get('/fields/:id', (req, res) => {
    console.log('aaa')
    const id = parseInt(req.body)
    console.log(id)
    const post = Post.query().findById(id);
    // console.log(post)
    // const schema = await post
    //     .$relatedQuery('schema')
    // console.log(schema)
})


/**
 * add post (page) to db. 
 * body - ajax object page
 */

router.post('/add', function (req, res) {
    const page = req.body
    console.log(page)
    Post.query()
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
        Post.query()
            .deleteById(page.id)
            .then(() => {
                res.sendStatus(200)
            })
            .catch(err => {
                res.json(err.message)
            })
    } else
        Post.query()
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
    Post.query()
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

    Post.query()
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

    Post.query()
        .then(Post => {
            res.json(Post.filter(Post => parseInt(Post.id) === parseInt(page.id)))
        })
})

module.exports = router
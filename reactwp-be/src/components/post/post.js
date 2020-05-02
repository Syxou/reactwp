const express = require('express');
const router = express.Router();
const Post = require('../../models/post');
const Fields = require('../../models/fields');
const PostData = require('../postData/model');

// var slugify = require('slugify')

/**
 * * path: /admin/pages/
 */

router.get('/', async function (req, res) {
    var type = req.query.type
    console.log(type)
    await Post.query()
        .where('type', type)
        .then(Post => {
            res.json(Post)
        })
})

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const post = await Post.query().findById(id);
    const fields = await post.$relatedQuery('fields').where('post_id', '=', id)
    res.json({ fields: fields, post: post })
});

router.get('/fields/:id', (req, res) => {
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

router.post('/fields/update/:id', async (req, res) => {
    const fields = req.body.fields;
    const id = parseInt(req.params.id)
    const post = await Post.query().findById(id);
    if (fields.length > 1) {
        await fields.forEach(field => {
            post.$relatedQuery('fields')
                .update({
                    data: field.data
                })
                .where('id', field.id)
                .then((res) => {
                    console.log('res', res)
                })
                .catch((err) => {
                    console.log('err', err)
                })
        });
    } else {
        await post.$relatedQuery('fields')
            .update({
                data: fields.data
            })
            .where('id', fields.id)
            .then((res) => {
                console.log('res', res)
            })
            .catch((err) => {
                console.log('err', err)
            })
    }
})

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

router.post('/changes', function (req, res) {
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
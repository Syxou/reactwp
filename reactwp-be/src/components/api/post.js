const express = require('express')
const router = express.Router()
const Post = require('../../models/post')
const Type = require('../../models/post_type')


// /api/post?type=post`
router.get('/', async (req, res, next) => {
    try {
        var type = req.query.type
        if (type) {
            let posts = []
            const post = await Post.query().where('type', type)
            if (post && post.length) {

                await post.forEach(pos => {
                    Post.relatedQuery('fields')
                        .for(post).where('post_id', pos.id)
                        .then(res => {
                            posts.push({ ...pos, fields: res.data })
                        })
                })
                console.log(posts)
            }
            console.log(post)
            res.json(posts)
        } else {
            await Post.query()
                .then(Post => {
                    res.json(Post)
                })
        }
    } catch (error) {
        console.log(error)
        next()
    }
})

// /api/post/id/:id`
router.get('/id/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const post = await Post.query().findById(id)
        if (post && post.length) {
            const fields = await post.$relatedQuery('fields').where('post_id', id)
            objectFields = new Object;
            fields &&
                fields.forEach((field) => {
                    objectFields = { [field.slug]: { ...field }, ...objectFields }
                })
            res.json({
                fields: Object.keys(objectFields).length ? objectFields : null,
                post: post
            })
        } else
            res.sendStatus(404)
    } catch (error) {
        console.log(error)
        next()
    }
})

// /api/post/slug/:slug`
router.get('/slug/:slug', async (req, res, next) => {
    try {
        const slug = req.params.slug
        const post = await await Post.query().where('slug', slug)

        if (post && post.length) {
            const fields = await post[0].$relatedQuery('fields').where('post_id', post[0].id)
            objectFields = new Object;
            fields &&
                fields.forEach((field) => {
                    objectFields = { [field.slug]: { ...field }, ...objectFields }
                })
            res.json({
                fields: Object.keys(objectFields).length ? objectFields : null,
                post: post
            })
        }
        else res.sendStatus(404)

    } catch (error) {
        console.log(error)
        next()
    }
})

module.exports = router;
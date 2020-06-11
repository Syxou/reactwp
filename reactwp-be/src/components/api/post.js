const express = require('express')
const router = express.Router()
const Post = require('../../models/post')
const Type = require('../../models/post_type')


// /api/post?type=type`
router.get('/', async (req, res, next) => {
    try {
        var type = req.query.type
        console.log(type)
        if (type) {
            await Post.query()
                .where('type', type)
                .then(Post => {
                    res.json(Post)
                })
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

module.exports = router;
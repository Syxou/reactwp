const express = require('express');
const router = express.Router();

const Post = require('../../models/post')

router.get('/all', async (req, res, next) => {
    try {
        const posts = await Post.query()
            .where('type', 'page')
        res.json(posts)
    } catch (error) {
        console.log(error)
        next()
    }
})
router.get('/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        const posts = await Post.query()
            .where('type', 'page')
            .where('id', id)
        res.json(posts)
    } catch (error) {
        console.log(error)
        next()
    }
})

getPostByid = (type, id) => {

}

router.get('/:id/data', async (req, res, next) => {
    const id = req.params.id
    try {
        const post = await Post.query().findById(id).where('type', 'page')

        const fields = await post.$relatedQuery('fields').where('post_id', id)

        objectFields = new Object;

        fields.forEach((field) => {
            objectFields = { [field.slug]: { ...field }, ...objectFields }
        })
        res.json({ fields: objectFields, post: post })
    } catch (error) {
        console.log(error)
        next()
    }
})

module.exports = router
const express = require('express')
const router = express.Router()
const Fields = require('../../models/fields')
const Pages = require('../../models/post')
var slugify = require('slug-generator')

router.get('/', (req, res) => {
    Fields.query()
        .where('slug', 'like', 'cf_%')
        // .withGraphFetched('pages')
        .then(post => {
            console.log(post)
            res.json(post)
        })
})
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    console.log(id)
    PostData.query()
        .where('post_type', 'like', 'cf_%')
        .where('data_id', '=', id)
        .then(post => {
            console.log(post[0])
            res.json(post[0])
        })
})

router.post('/add', async (req, res, next) => {
    const body = req.body,
        postId = body.id,
        postContent = JSON.stringify(body.content),
        dataType = "rcf",
        postType = `cf_${slugify(body.cfName, '_')}`
    // console.log(PostDataValidation('post_type', postType))

    // var name = PostData.query()
    //     .where('post_type', postType)
    //     .then(data => {
    //         res.status(401).send({ error: true, message: 'already exists' })
    //         next();
    //     })
    //     .catch()
    await PostData.query()
        .insert({
            post_id: postId,
            post_content: postContent.toString(),
            data_type: dataType,
            post_type: postType,
            post_date: new Date()
        })
        .then((data) => {
            res.status(200).send(data)
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})
router.post('/update', async (req, res) => {
    const body = req.body,
        dataId = body.dataId,
        postId = body.id,
        postContent = JSON.stringify(body.content),
        dataType = "rcf",
        postType = `cf_${slugify(body.cfName, '_')}`

    const updateRcf = await PostData.query()
        .where("data_id", dataId)
        .patch({
            post_id: postId,
            post_content: postContent,
            data_type: dataType,
            post_type: postType,
        })
        .then(data => {
            console.log(data)
            res.status(300).send({ error: false, message: "Custom fields have been updated." })
        })
        .catch(err => {
            console.log(err)
            res.status(401).send({ error: true, message: 'Something went wrong' })
        })
})

module.exports = router
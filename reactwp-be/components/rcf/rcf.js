const express = require('express')
const router = express.Router()
const PostData = require('../postData/model')
const Pages = require('../pages/pages')
var slugify = require('slug-generator')

router.get('/', (req, res) => {
    PostData.query()
        .where('post_type', 'like', 'cf_%')
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

/**
 * * post_id      : post/page  id
 * // data_id      : rcf id
 * * post_content : json for rcf
 * * data_type    : rcf 
 * * post_type    : cf_<name rcf>
 * * post_date    : new date()
 */

const PostDataValidation = (by, what) => {
    var flag = true
    PostData.query()
        .where(by, what)
        .then((data) => {
            console.log(data)
            flag = false
        })
        .catch()
    return flag
}

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
            res.status(300).send({ error: false, message: "Custom Fields were update" })
        })
        .catch(err => {
            console.log(err)
            res.status(401).send({ error: true, message: err })
        })
})

module.exports = router
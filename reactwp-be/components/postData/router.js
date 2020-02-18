const express = require('express');
const router = express.Router();
const knex = require('../../knex/knex')
const PostData = require('./model')



/**
 * need page/post id *
 *      datatype
 *      data
 */
router.post('/add', function (req, res) {
    const postData = req.body;
    console.log(postData)
    PostData.query()
        .insert(
            {
                post_id: postData.postId,
                post_content: postData.postContent,
                data_type: postData.contentType,
                post_date: new Date()
            }
        )
        .then(function () {
            res.sendStatus(200)
        })
        .catch(function (err) {
            res.json(err)
        })
})
router.post()


module.exports = router
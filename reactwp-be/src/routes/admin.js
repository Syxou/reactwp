const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
const { getTokenFromBearer } = require('../components/users/auth/auth');
const post = require('../components/post/post');
const users = require('../components/users/User');
const posts = require('../components/posts/posts');
const postData = require('../components/postData/router');
const fields = require('../components/fields/fields');
const schema = require('../components/schema/schema');
const media = require('../components/media/media')
const global = require('../components/global/global')
const menu = require('../components/menu/menu')

router.use('/', (req, res, next) => {
    if (req.originalUrl === "/admin/users/signin/") {
    }
    else {
        var token = getTokenFromBearer(req)
        if (!token) {
            console.log(401)
            return res.status(401).json({ error: true, message: "Must pass token" });
        }
        jwt.verify(token, 'shhhhh', function (err, user) {
            if (err) {
                res.status(401).json({ message: "Bad token" })
                throw err
            }
        })
    }
    setTimeout(() => next(), '1000')

})

router.get('/', function (req, res) {
    res.send('now then admin');
});

router.use('/api/fields/schema', schema)
router.use('/api/media', media)
router.use('/api/rcf', fields)
router.use('/api/post', post)    //* ist a new
router.use('/pages', post)  //!deprecated 
router.use('/users', users)
router.use('/posts', posts)
router.use('/postdata', postData)
router.use('/api/global', global)
router.use('/api/menu', menu)


module.exports = router;

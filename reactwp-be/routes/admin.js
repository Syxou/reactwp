const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
const { getTokenFromBearer } = require('../components/users/auth/auth')
const pagesRoute = require('../components/pages/page');
const users = require('../components/users/user')
const posts = require('../components/posts/posts')
const postData = require('../components/postData/router')
const rcf = require('../components/rcf/rcf')

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
    next();
})

router.get('/', function (req, res) {
    res.send('now then admin');
});
router.use('/api/rcf', rcf)
router.use('/pages', pagesRoute)
router.use('/users', users)
router.use('/posts', posts)
router.use('/postdata', postData)

module.exports = router;
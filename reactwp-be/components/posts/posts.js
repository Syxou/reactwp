const express = require('express');
const router = express.Router();
const knex = require('../../knex/knex')
const Post = require('./model')


router.get('/', function (req, res, next) {
    Post.query()
        .then(users => {
            res.json(users)
        })
})

router.post('/add/', function (req, res, next) {
    const user = req.body;
    console.log(user)
    Post.query()
        .insert({
            name: user.name,
            type: user.type,
            email: user.email,
            data_registred: new Date()
        })
        .then(() => {
            res.sendStatus(200)
        })
        .catch(err => {
            console.log(err)
        })
})


module.exports = router
const express = require('express');
const router = express.Router();
const knex = require('../../knex/knex')
const User = require('./model')


router.get('/', function (req, res, next) {
    User.query()
        .then(users => {
            res.json(users)
        })
})

module.exports = router
const express = require('express');
const router = express.Router();
const knex = require('../../knex/knex')
const User = require('./model')
const bcrypt = require('bcrypt');




router.get('/', function (req, res, next) {
    User.query()
        .then(users => {
            res.json(users)
            console.log(users)
        })
})

router.post('/add/', function (req, res, nexts) {
    const user = req.body;
    console.log(user)
    User.query()
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


// Signup Route
router.post('/signup/', function (req, res, next) {
    var body = req.body;
    var hash = bcrypt.hashSync(body.password.trim(), 10);

    var user = new Users({
        name: body.name.trim(),
        username: body.username.trim(),
        email: body.email.trim(),
        password: hash,
        admin: false,
        isEmailVerified: false
    })

    user.save(function (err, user) {
        if (err) throw err; s
        var token = generatetoken(user);
        res.json({
            user: user,
            token: token
        })
    })
})



module.exports = router
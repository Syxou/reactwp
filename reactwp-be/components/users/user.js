const express = require('express');
const router = express.Router();
const knex = require('../../knex/knex')
const User = require('./model')
const bcrypt = require('bcrypt');

const generateToken = require('./auth/auth')

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

    var user = {
        _id: body.name.id,
        name: body.name.trim(),
        username: body.username.trim(),
        email: body.email.trim(),
        password: hash,
        admin: false,
        isEmailVerified: false
    }

    User.save(function (err, user) {
        if (err) throw err;
        var token = generatetoken(user);
        res.json({
            user: user,
            token: token
        })
    })
})


router.post('/signin', async function (req, res) {
    const body = req.body
    console.log(body)
    var user = await User
        .query()
        .where('username', body.username)
    console.log(user[0])

    await bcrypt.compare(body.password, user[0].password, function (err, valid) {
        console.log('asdasd')
        if (!valid) {
            return res.status(404).json({
                errror: true,
                message: "Username or Passwoerd is Wrong"
            })
        }
        var token = generateToken(user[0]);
        userClean = {
            name: user[0].name.trim(),
            username: user[0].username.trim(),
            email: user[0].email.trim(),
            admin: false,
        }
        res.json({
            user: userClean,
            token: token
        })
    })
})

module.exports = router
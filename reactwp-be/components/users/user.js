const express = require('express');
const router = express.Router();
const User = require('./model')
const bcrypt = require('bcrypt');
const { generateToken } = require('./auth/auth')

router.get('/', function (req, res) {
    User.query()
        .then(users => {
            console.log(users)
            res.json(users)
        })
})

router.get('/:id', function (req, res) {
    const id = parseInt(req.params.id)
    User.query()
        .findById(id)
        .then(user => {
            let userClear = {
                id: user.id,
                name: user.name,
                username: user.username,
                admin: user.admin,
                email: user.email,
                state: user.state,
                image: '',
                verified: user.verified,
                date_create: user.date_create,
            }
            res.json(userClear)
        })
        .catch(() => {
            res.sendStatus(404)
        })
})

router.post('/add', (req, res) => {
    const body = req.body
    console.log(body)
    User.query()
        .insert({
            name: body.name,
            username: body.username,
            password: bcrypt.hashSync(body.password, 10),
            admin: body.admin,
            verified: false,
            email: body.email,
            date_create: new Date(),
        })
        .then(req => {
            return res.sendStatus(201).json({ id: req.user.id })
        })
        .catch(err => {
            return res.sendStatus(404).json(err.message)
        })
})

router.post('/delete', (req, res) => {
    const id = parseInt(req.body.id)
    console.log('delete');
    User.query()
        .deleteById(id)
        .then((req) => {
            console.log(req)
            if (req === 1) {
                return res.sendStatus(200)
            }
            res.sendStatus(404)
        })
        .catch((err) => {
            res.sendStatus(404).json(err.message)
        })
})

router.post('/signin', async function (req, res) {
    const body = req.body
    console.log(body)
    var user = []
    const userQuery = await User.query()
        .where('username', body.username)
        .then((res, err) => {
            console.log('user', res[0])
            user = res;
            console.log(err)
        })

    console.log(user)
    bcrypt.compare(body.password, user[0].password, function (err, valid) {
        if (!valid) {
            return res.status(401).json({
                errror: true,
                message: "Username or Passwoerd is Wrong"
            })
        }
        console.log(err)
        let token = generateToken(user[0]);
        console.log(token)
        userClean = {
            name: user[0].name.trim(),
            username: user[0].username.trim(),
            email: user[0].email.trim(),
            admin: user[0].admin,
        }
        console.log(userClean)

        res.status(200)
            .json({
                user: userClean,
                token: token
            })
    })
})

module.exports = router
var jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const knex = require('../../../knex/knex')
const User = require('../model')

module.exports = generateToken = (user) => {
    var id = user.id
    console.log(user)
    var u = {
        name: user.name,
        username: user.username,
        admin: user.admin,
        _id: user.id.toString()
        // image: user.image
    };

    return token = jwt.sign(u, process.env.JWT_SEKRET,
        { expiresIn: 60 * 60 * 24 });
}



// exports.generateToken = generateToken;

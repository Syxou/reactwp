var jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const knex = require('../../../knex/knex')
const User = require('../model')

function generateToken(user) {
    var u = {
        name: user.name,
        username: user.username,
        admin: user.admin,
        _id: user._id.toString(),
        image: user.image
    };

    return token = jwt.sign(u, process.env.JWT_SEKRET,
        { expiresIn: 60 * 60 * 24 });
}


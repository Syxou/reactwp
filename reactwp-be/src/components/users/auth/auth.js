var jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const knex = require('../../../knex/knex')
const User = require('../../../models/user')

module.exports.generateToken = generateToken = (user) => {
    var u = {
        name: user.name,
        username: user.username,
        admin: user.admin,
        _id: user.id.toString()
        // image: user.image
    };
    return token = jwt.sign(u, 'shhhhh', {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
    });
}

module.exports.checkToken = checkToken = (token) => {
    jwt.verify(token, 'shhhhh', function (err, decoded) {
        console.log(decoded.foo) // bar
    });
}

 module.exports.getTokenFromBearer =  getTokenFromBearer = (req) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return "No Authorization Header"
    }
    try {
        const token = authorization.split("Bearer ")[1];
        return token;
    } catch {
        return "Invalid Token Format"
    }
}
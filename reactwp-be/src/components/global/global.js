const express = require('express');
const router = express.Router();

const Global = require('../../models/global')


router.get('/all', async (req, res, next) => {
    try {

        const global = await Global.query();
        res.json(global)

    } catch (error) {
        console.log(error)
        res.status('500')
        next()
    }
})


module.exports = router

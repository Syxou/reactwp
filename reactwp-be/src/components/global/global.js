const express = require('express');
const router = express.Router();

const Global = require('../../models/global')


router.get('/all', async (req, res, next) => {
    try {
        let globalSettings = {}
        const global = await Global.query()
        global.forEach((g) => {
            globalSettings = {
                ...globalSettings, [g.option_name]: { option_value: g.option_value }
            }
        })
        res.json(globalSettings)
    } catch (error) {
        console.log(error)
        res.status('500')
        next()
    }
})

router.post('/save', async (req, res, next) => {
    const data = Object.entries(req.body)
    try {
        data.forEach(async d => {
            const update = await Global.query()
                .patch({ option_value: d[1] })
                .where('option_name', '=', d[0])
                .where('option_value', '!=', d[1])
            console.log(update)
        })
        res.send({ error: false, message: "Updated! 🔥" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: true, message: "Error 500 ⛈" })
        next()
    }
})

module.exports = router

const express = require('express');
const router = express.Router();
const path = require('path');
var appDir = path.dirname(require.main.filename || process.mainModule.filename);
var sizeOf = require('image-size');
const fs = require('fs')
const Media = require('../../models/media')


router.get('/all', async (req, res) => {
    const media = await Media.query();

    res.json(media)
})

router.post('/remove/:id', async (req, res) => {
    const id = parseInt(req.params.id)

    try {
        const page = await Media.query().findById(id)
        fs.unlinkSync(path.join(appDir, '/uploads', page.name))
        const remove = await Media.query().deleteById(id);
        console.log(remove, page)

    } catch (error) {
        console.log(error)
    }

    res.status(200)
})

router.post('/upload', async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    console.log(appDir + '/uploads')

    try {
        const target_file = req.files.Files;
        const host = req.get('host');
        const fileUrl = path.join(appDir, '/uploads', target_file.name);

        if (!fs.existsSync(appDir + '/uploads')) {
            fs.mkdirSync(appDir + '/uploads');
        }

        target_file.mv(fileUrl, (err) => {
            if (err) throw err;
        })

        try {
            var dimensions = sizeOf(fileUrl);
        } catch (error) {
            console.log(error)
            dimensions = {
                height: 0,
                width: 0
            }
        }
        let d = new Date()

        Media.query().insert({
            name: target_file.name,
            url: path.join(host, '/static', target_file.name),
            file_type: target_file.mimetype,
            size: target_file.size,
            date: [d.getMonth() + 1,
            d.getDate(),
            d.getFullYear()].join('-') + ' ' +
                [d.getHours(),
                d.getMinutes(),
                d.getSeconds()].join(':'),
            width: dimensions.width,
            height: dimensions.height
        })
            .then(media => {
                res.json(media)
            })
            .catch(err => {
                console.log(err)
            })

    } catch (error) {
        console.log(error)
        res.status(401)
    }


});

module.exports = router

const express = require('express');
const router = express.Router();
const path = require('path');
var appDir = path.dirname(require.main.filename || process.mainModule.filename);
var sizeOf = require('image-size');

const Media = require('../../models/media')

router.post('/upload', async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const target_file = req.files.Files;
    const host = req.get('host');
    const fileUrl = path.join(appDir, '/uploads', target_file.name);

    target_file.mv(fileUrl, (err) => {
        if (err) throw err;
    })

    var dimensions = sizeOf(fileUrl);
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



});

module.exports = router
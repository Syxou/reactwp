const express = require('express');
const router = express.Router();

const Schema = require('../../models/schema')
const Fields = require('../../models/fields')

router.get('/', async (req, res) => {
    const schema = await Schema.query()
    res.json(schema)
})

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const schema = await Schema.query().findById(id)

    const related = await schema.$relatedQuery('fields').select('id', 'type', 'name', 'slug').where('fields_schema_id', '=', id).groupBy('id');

    const pages = await schema.$relatedQuery('posts')
        .catch(() => res.sendStatus(400))

    const resut = { pages: pages, fields: related, ...schema }

    res.json(resut)
})

router.post('/add', async (req, res) => {
    field
})

module.exports = router
const express = require('express');
const router = express.Router();

const Schema = require('../../models/schema')
const Fields = require('../../models/fields')

router.get('/', async (req, res) => {
    await Schema.query()
        .then(schema => {
            res.json(schema)
        })
        .catch(error => {
            console.log(error)
        })
})

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const schema = await Schema.query().findById(id)

    const field = await Fields.query().findById(1)

    const related = await schema.$relatedQuery('fields').select('id', 'type', 'name', 'slug').where('fields_schema_id', '=', id).groupBy('id');

    const resut = { fields: related, ...schema }

    res.json(resut)
})

module.exports = router
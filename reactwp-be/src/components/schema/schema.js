const express = require('express');
const router = express.Router();

const Schema = require('../../models/schema')
const Fields = require('../../models/fields')
const PostShcema = require('../../models/post_schema')

/**
            "id": 2,
            "data": "About",
            "type": "text",
            "name": "About title home",
            "slug": "cf_about-title-home",
            "post_id": 1,
            "fields_schema_id": 1
 */

router.get('/', async (req, res) => {
    const schema = await Schema.query()
    res.json(schema)
})

router.get('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id)

    try {
        const schema = await Schema.query().findById(id)
        const related = await schema.$relatedQuery('fields').where('fields_schema_id', '=', id).groupBy('id');
        const pages = await schema.$relatedQuery('posts')
        const resut = { pages: pages, fields: related, ...schema }
        console.log(resut)
        res.json(resut)
    } catch (error) {
        console.log(error)
        next();
    }
})



router.post('/:id/add/pages', async (req, res, next) => {
    const id = parseInt(req.params.id)
    const body = req.body
    console.log(id, body.pages)
    try {
        const postShcema = await PostShcema.query().where('schema_id', id)

        postShcema.forEach(item => {
            body.pages.forEach(page => {
                console.log(page, item.post_id)
                if (page !== item.post_id) {
                    PostShcema.query().insert({ post_id: page, schema_id: id })
                        .then(result => console.log(result))
                        .catch(err => console.log(err))
                }
            })
        })
        console.log(postShcema)
    } catch (error) {
        console.log(error)
        next()
    }

    res.json({
        error: false,
        message: `Posts/Pages added`
    });
})

router.post('/:id/add/field', async (req, res) => {
    const body = req.body
    const id = parseInt(req.params.id)
    const schema = await Schema.query().findById(id)
    const fields = await schema.$relatedQuery('fields')
        .select('id', 'type', 'name', 'slug')
        .where('fields_schema_id', '=', id)
        .where('slug', body.slug)
        .groupBy('id')
    if (fields.length) {
        return res.json({
            error: true,
            message: `Slug in this field '${body.name}', has duplicates in another field`
        });
    }
    const posts = await schema.$relatedQuery('posts')

    posts.forEach(post => {
        schema.$relatedQuery('fields')
            .insert({
                data: '',
                type: body.type,
                name: body.name,
                slug: body.slug,
                post_id: post.id,
                fields_schema_id: id,
            })
            .then(result => { console.log(result) })
            .catch(error => { console.log(error) })
    })
    res.json({
        error: false,
        message: `This field '${body.name}', was added`
    });
})

module.exports = router
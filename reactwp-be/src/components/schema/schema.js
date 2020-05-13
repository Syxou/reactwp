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
    var removerItems = [];
    try {
        const postShcema = await PostShcema.query().where('schema_id', id)

        if (postShcema.length > 0)
            body.pages.forEach(page => {
                addPost(page, id)
            })
        else
            body.pages.forEach(page => {
                addPost(page, id)
            })
        console.log(postShcema)
        postShcema.forEach(schema => {
            checkRemoved(body.pages, schema.post_id, id)
        });

    } catch (error) {
        console.log(error)
        next()
    }

    res.json({
        error: false,
        message: `Posts/Pages added`
    });
})
addPost = async (post, schema) => {
    try {
        const postEqual = await PostShcema.query().where("post_id", '=', post).where('schema_id', schema)
        if (postEqual.length === 0)
            await PostShcema.query().insert({ post_id: post, schema_id: schema })
                .then(result => console.log(result))
                .catch(err => console.log(err))

    } catch (error) {
        console.log(error)
    }
}

checkRemoved = (newPosts, oldPost, schemaID) => {
    if (newPosts.indexOf(oldPost) === -1) {
        newPosts.pop(oldPost);
        remoevPost(oldPost, schemaID)
        console.log('remove post: ' + oldPost);
    } else if (newPosts.indexOf(oldPost) > -1) {
        console.log(oldPost + ' already exists');
    }
}

remoevPost = async (post, schema) => {
    await PostShcema.query()
        .delete()
        .where('schema_id', schema)
        .where('post_id', post)
}

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
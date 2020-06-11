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
        const related = await schema.$relatedQuery('fields').where('fields_schema_id', '=', id).groupByRaw('slug');
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
    console.log('/:id/add/pages')
    const id = parseInt(req.params.id)
    const body = req.body
    var removerItems = [];
    try {
        //**added 
        const postShcema = await PostShcema.query().where('schema_id', id)

        body.pages.forEach(page => {
            addPost(page, id)
        })

        console.log('postShcema.length  < 0')
        // body.pages.forEach(page => {
        //     addPost(page, id)
        // })
        console.log(postShcema)
        //**removed 
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
addPost = async (postID, schemaID) => {
    try {
        const postEqual = await PostShcema.query().where("post_id", '=', postID).where('schema_id', schemaID)
        if (postEqual.length === 0) {
            await PostShcema.query().insert({ post_id: postID, schema_id: schemaID })
                .then(result => console.log(result))
                .catch(err => console.log(err))
            await addFiedlsToPost(postID, schemaID)
        }
    } catch (error) {
        console.log(error)
    }
}
addFiedlsToPost = async (postID, schemaID) => {
    const schema = await Schema.query().findById(schemaID)
    const fields = await schema.$relatedQuery('fields').groupByRaw('slug')
    await fields.forEach(field => {
        schema.$relatedQuery('fields')
            .insert({
                data: '',
                type: field.type,
                name: field.name,
                slug: field.slug,
                post_id: postID,
                fields_schema_id: schemaID,
            }).where('slug', 'field.slug').where('post_id', '!=', postID)
            .then(result => { console.log(result) })
            .catch(error => { console.log(error) })
    })
    return true
}

removeFieldsFromPost = async (postID, schemaID) => {
    const fields = await Fields.query().delete().where('post_id', postID).where('fields_schema_id', schemaID)

}

checkRemoved = (newPosts, oldPost, schemaID) => {
    if (newPosts.indexOf(oldPost) === -1) {
        newPosts.pop(oldPost);
        remoevPost(oldPost, schemaID)
        removeFieldsFromPost(oldPost, schemaID)
        console.log('remove post by id: ' + oldPost);
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
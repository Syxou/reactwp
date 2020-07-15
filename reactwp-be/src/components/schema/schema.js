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

router.post('/add', async (req, res, next) => {
    const data = req.body
    const schemaOld = await Schema.query()
    console.log(data, schemaOld)
    await schemaOld.forEach(s => {
        if (data.slug === s.slug) {
            res.json({ error: true, message: 'Already exist this schema.' })
            return next()
        }
    })
    const schema = await Schema.query().insert({
        name: data.name,
        desc: data.desc,
        slug: data.slug
    })
    res.json({ error: false, message: "Schema has been created.", schema })
})

router.delete('/delete', async (req, res, next) => {
    const id = req.body.id
    const schemaDeleted = await Schema.query().deleteById(id)
    schemaDeleted
        ? res.json({ error: false, message: "Schema has been deleted." })
        : res.json({ error: true, message: "Schema does not exist." })
    next()
})


router.get('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id)

    try {
        const schema = await Schema.query().findById(id)
        const related = await Fields.query().select('*', 'slug').where('fields_schema_id', '=', id);
        const pages = await schema.$relatedQuery('posts')
        let check = []
        let newArray = []
        related.forEach(element => {
            if (!check.includes(element.slug)) {
                check.push(element.slug)
                newArray.push(element)
            }
        })
        console.log('newResult: ', newArray)

        const result = { pages: pages, fields: newArray, ...schema }
        res.json(result)
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
    const fields = await schema.$relatedQuery('fields').groupByRaw("`slug`");
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
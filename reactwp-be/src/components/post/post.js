const express = require('express');
const router = express.Router();
const Post = require('../../models/post');
const Fields = require('../../models/fields');
const PostData = require('../postData/model');
const PostType = require('../../models/post_type')
// var slugify = require('slugify')

/**
 * * newPath /api/post/   new
 * ! path: /admin/pages/  deprecated 
 */

router.get('/', async function (req, res, next) {
    try {
        var type = req.query.type
        console.log(type)
        if (type) {
            await Post.query()
                .where('type', type)
                .then(Post => {
                    res.json(Post)
                })
        } else {
            await Post.query()
                .then(Post => {
                    res.json(Post)
                })
        }
    } catch (error) {
        console.log(error)
        next()
    }

})

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const post = await Post.query().findById(id);
    const fields = await post.$relatedQuery('fields').where('post_id', id)
    console.log(fields, post)
    res.json({ fields: fields, post: post })
});

router.get('/fields/:id', async (req, res) => {
    const id = parseInt(req.body)
    console.log(id)
    const post = await Post.query().findById(id);
    // console.log(post)
    // const schema = await psost
    //     .$relatedQuery('schema')
    // console.log(schema)
})


/**
 * add post (page) to db. 
 */

router.post('/fields/update/:id', async (req, res) => {
    const fields = req.body.fields;
    const id = parseInt(req.params.id)
    const post = await Post.query().findById(id);
    if (fields.length > 1) {
        await fields.forEach(field => {
            post.$relatedQuery('fields')
                .update({
                    data: field.data
                })
                .where('id', field.id)
                .then((res) => {
                    console.log('res', res)
                })
                .catch((err) => {
                    console.log('err', err)
                })
        });
    } else {
        await post.$relatedQuery('fields')
            .update({
                data: fields.data
            })
            .where('id', fields.id)
            .then((res) => {
                console.log('res', res)
            })
            .catch((err) => {
                console.log('err', err)
            })
    }
})

router.post('/add', async function (req, res) {
    const page = req.body
    console.log(page)
    Post.query()
        .insert({
            title: page.title,
            state: page.state,
            slug: page.slug,
            date_modifate: new Date()
        })
        .then(() => {
            PostData.query()
                .insert({
                    post_content: JSON.stringify(content),
                    post_id: page.id,
                    post_type: 'content',
                    state: 'draft'
                })
                .catch(err => {
                    console.log(err)
                })
        })
        .then(() => {
            res.sendStatus(200)
        })
        .catch(err => {
            console.log(err)
        })
})

router.post('/trash', async function (req, res) {
    const page = req.body
    if (req.body.state === 'trash') {
        Post.query()
            .deleteById(page.id)
            .then(() => {
                res.sendStatus(200)
            })
            .catch(err => {
                res.json(err.message)
            })
    } else
        Post.query()
            .update({ state: 'trash' })
            .where('id', page.id)
            .then(() => {
                res.sendStatus(200)
            })
            .catch(err => {
                res.json(err.message)
            })
    console.log(page)
})

router.post('/delete', async function (req, res) {
    const page = req.body
    console.log(page)
    Post.query()
        .deleteById(page.id)
        .then(() => {
            res.sendStatus(200)
        })
        .catch(err => {
            res.json(err.message)
        })
})

router.post('/changes', async function (req, res) {
    const page = req.body.page;
    const content = req.body.content;

    Post.query()
        .update({ title: page.title })
        .where('id', page.id)
        .catch(err => {
            console.log(err)
        })

    PostData.query()
        .where('post_id', page.id)
        .where('post_type', 'content')
        .update({ post_content: JSON.stringify(content) })
        .catch(err => {
            console.log(err)
        })

    Post.query()
        .then(Post => {
            res.json(Post.filter(Post => parseInt(Post.id) === parseInt(page.id)))
        })
})


router.get('/type/all', async (req, res, next) => {
    try {
        const postTypeAll = await PostType.query()
        res.json(postTypeAll)
    } catch (error) {
        console.log(error)
        next();
    }
})

router.get('/type/all', async (req, res, next) => {
    try {
        const postTypeAll = await PostType.query()
        res.json(postTypeAll)
    } catch (error) {
        console.log(error)
        next();
    }
})


/**  
**  {
**     "type": "page",
**     "icon": "file"
**  }
 */
router.post('/type/add', async (req, res, next) => {
    try {
        const body = req.body
        const checkType = await PostType.query().where({ type: body.type })

        if (checkType.length === 0) {
            const newType = await PostType.query().insert({
                type: body.type,
                icon: body.icon,
            })
            res.status(200).send({ error: false, message: 'This type has been added' })
        } else {
            res.status(409).send({ error: true, message: 'This type already exist' })
            next();
        }
    } catch (error) {
        console.log(error)
        next()
    }
})

router.delete('/type/remove/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const postTypeAll = await PostType.query().deleteById(id);
        res.json(postTypeAll)
    } catch (error) {
        console.log(error)
        next();
    }
})


module.exports = router
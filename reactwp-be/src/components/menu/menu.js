const express = require('express')
const router = express.Router()
const Post = require('../../models/post');
const Fields = require('../../models/fields')

router.get('/all', (req, res, next) => {
    Fields.query()
        .where('slug', 'like', 'sys_menu')
        .then(menus => {
            const newMenus = []
            menus && menus.forEach(menu => {
                newMenus.push({
                    id: menu.id,
                    data: JSON.parse(menu.data),
                    type: menu.type,
                    slug: menu.slug,
                    post_id: menu.post_id
                })
            })
            res.send(newMenus)
        })
        .catch(err => {
            console.log(err)
            next()
        })
})

/**
 *  /admin/api/menu/?name=Primary_Menu
 */
router.get('/', (req, res) => {
    const type = req.query.type || '%'
    console.log(type)
    Fields.query()
        .where('slug', 'like', 'sys_menu')
        .where('type', 'like', type)
        .then(menu => {
            if (!menu[0]) {
                return res.send({ error: true, message: 'There is no such menu.' })
            }
            const result = {
                id: menu[0].id,
                data: JSON.parse(menu[0].data),
                type: menu[0].type,
                slug: menu[0].slug,
                post_id: menu[0].post_id
            }
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
            res.sendDate({ error: true, message: 'There is no such menu.' })
        })
})

router.get('/types', (req, res, next) => {
    Fields.query()
        .select('type', 'id')
        .where('slug', 'like', 'sys_menu')
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            console.log(err)
            next()
        })
})

router.post('/add', async (req, res) => {
    const body = req.body
    console.log(body)
    const menu = await Post.query()
        .select('id')
        .where('type', 'like', 'sys_menu')
    const menuID = menu[0].id

    const newMenu = await Fields.query()
        .insert({
            name: body.name,
            type: body.type,
            slug: body.slug,
        })
    res.send('added')
})


module.exports = router
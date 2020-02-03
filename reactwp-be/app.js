const express = require('express');
var bodyParser = require("body-parser");
const cors = require('cors');
const knex = require('./knex/knex')
const routes = require('./routes/index');
const pagesRoute = require('./routes/page');
const Pages = require('./models/pages')
let app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.options('*', cors());
app.use('/', routes);
app.use('/pages', pagesRoute)
// app.use('/pages/change', pagesRoute)

// app.use('/test', (req, res) => {
//     knex.raw("SELECT VERSION()")
//         .then((version) => console.log((version[0][0])))
//         .catch((err) => { console.log(err); throw err })
//         .finally(() => {
//             knex.destroy();
//         });
// })

app.use('/test', function (req, res, next) {
    res.send(knex.select('*').from('pages'));
})

/*
const {id,name} = req.body;
    const subQuery = knex('client').select('id').where({id})
    subQuery.then(response=>{
    if(response.length>0){
        subQuery.update({name})
        .then(resp=>{
            res.json('update done')
        })
        .catch(err=>{res.json(err)})
    }
    else{
        res.json('update failed')
     }
})
.catch(err=>{res.json(err)})
*/

app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
});

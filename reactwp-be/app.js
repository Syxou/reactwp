const express = require('express');
var bodyParser = require("body-parser");
const cors = require('cors');
const knex = require('./knex/knex');
const routes = require('./routes/index');
const pagesRoute = require('./routes/page');

let app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.options('*', cors());
app.use('/', routes);
app.use('/pages', pagesRoute)

// app.use('/test', (req, res) => {
//     knex.raw("SELECT VERSION()")
//         .then((version) => console.log((version[0][0])))
//         .catch((err) => { console.log(err); throw err })
//         .finally(() => {
//             knex.destroy();
//         });
// })

app.post('/pages/chenge/', function (req, res) {
    var page = req.body.page;
    console.log(page)
})

app.use('/test', function (req, res, next) {
    res.send(knex.select('*').from('pages'));
})

app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
});

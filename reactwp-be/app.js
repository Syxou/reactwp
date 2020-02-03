const express = require('express');
var bodyParser = require("body-parser");
const cors = require('cors');
const knex = require('./knex/knex')
const routes = require('./routes/index');
const pagesRoute = require('./pages/page');
const Pages = require('./pages/pages')
let app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.options('*', cors());
app.use('/', routes);
app.use('/pages', pagesRoute)


app.use('/test', function (req, res, next) {
    res.send(knex.select('*').from('pages'));
})



app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
});

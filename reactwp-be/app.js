const express = require('express');
var bodyParser = require("body-parser");
const cors = require('cors');
const knex = require('./knex/knex')
const routes = require('./routes/index');
const pagesRoute = require('./components/pages/page');
const users = require('./components/users/user')
const posts = require('./components/posts/posts')
let app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.options('*', cors());
app.use('/', routes);
app.use('/pages', pagesRoute)
app.use('/users', users)
app.use('/posts', posts)


app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
});

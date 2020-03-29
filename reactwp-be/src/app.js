const express = require('express');

var bodyParser = require("body-parser");
const cors = require('cors');
const knex = require('./knex/knex')
const routes = require('./routes/index');
const admin = require('./routes/admin');

let app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.options('*', cors());
app.use('/', routes);
app.use('/admin', admin)


app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
});

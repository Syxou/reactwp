const express = require('express');
const fileUpload = require('express-fileupload');
var bodyParser = require("body-parser");
const cors = require('cors');
const knex = require('./knex/knex')
const routes = require('./routes/index');
const admin = require('./routes/admin');
const path = require('path');

let app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.options('*', cors());

app.use(fileUpload({
    useTempFiles: true,
}))

app.use('/', routes);
app.use('/admin', admin)
app.use('/static', express.static(__dirname + '/uploads'))

app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
});

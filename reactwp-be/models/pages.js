const { Model } = require('objection');
const knex = require('../knex/knex')

Model.knex(knex)

class Pages extends Model {
    static get tableName() {
        return 'pages';
    }
}


module.exports = Pages;
const { Model } = require('objection');
const knex = require('../../knex/knex')

Model.knex(knex)

class postData extends Model {
    static get tableName() {
        return 'post_data';
    }
}

module.exports = postData;
const { Model } = require('objection');
const knex = require('../knex/knex');

Model.knex(knex);

class Fields extends Model {

    static get taleName() {
        return 'fields';
    }

}

module.exports = Fields;
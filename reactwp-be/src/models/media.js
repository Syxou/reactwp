const { Model } = require('objection');
const knex = require('../knex/knex');


Model.knex(knex);

class Media extends Model {

    static get tableName() {
        return 'media';
    }


}

module.exports = Media;

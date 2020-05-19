const { Model } = require('objection');
const knex = require('../knex/knex');

Model.knex(knex);


class Global extends Model {
    static tableName = 'global';
}


module.exports = Global;
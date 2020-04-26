const { Model } = require('objection');
const knex = require('../knex/knex')
const Fields = require('../models/fields')

Model.knex(knex);

/**
 *             TABLE fields_schema
 *  id___type___name___slug___desk
 * 
 */

class Schema extends Model {
    static get tableName() {
        return 'fields_schema'
    }

    static relationMappings = {
        fields: {
            relation: Model.HasManyRelation,
            modelClass: Fields,
            join: {
                from: 'fields_schema.id',
                to: 'fields.fields_schema_id',
            }
        }
    };
}


module.exports = Schema;
const { Model, ref } = require('objection');
const knex = require('../knex/knex');
const Schema = require('./schema')
const Post = require('./post')

Model.knex(knex);

class Fields extends Model {

    static get tableName() {
        return 'fields';
    }

    static relationMappings = {
        schema: {
            relation: Model.BelongsToOneRelation,
            modelClass: Schema,
            join: {
                from: 'fields.fields_schema_id',
                to: 'fields_schema.id'
            }
        },
        post: {
            relation: Model.BelongsToOneRelation,
            modelClass: Post,
            join: {
                from: 'fields.post_id',
                to: 'post.id'
            }
        }
    };

}

module.exports = Fields;
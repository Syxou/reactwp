const { Model, ref } = require('objection');
const knex = require('../knex/knex');
const Schema = require('./schema');
const Fields = require('./fields');

Model.knex(knex);

/**
 *              TABLE post
 * id   title   state   slug    date_modifate   uset_id post_type
 */

class Post extends Model {

    static get tableName() {
        return 'post'
    }

    static relationMappings = {
        schema: {
            relation: Model.ManyTomanyRelation,
            modelClass: Schema,
            join: {
                from: 'post.id',
                through: {
                    from: 'post_schema.posts_id',
                    to: 'post_schema.schema_id'
                },
                to: 'fields_schema.id'
            },
        },
        fields: {
            relation: Model.BelongsToOneRelation,
            modelClass: Fields,
            join: {
                from: 'post.id',
                to: 'fields.post_id',
            }
        }
    }
}

module.exports = Post;
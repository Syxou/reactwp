const { Model, ref } = require('objection');
const knex = require('../knex/knex')
const Schema = require('./schema')

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
            }
        }
    }
}

module.exports = Post;
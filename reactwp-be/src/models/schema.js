const { Model, ref } = require('objection');
const knex = require('../knex/knex')


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

    static get relationMappings() {
        const Fields = require('../models/fields')
        const Post = require('../models/post')
        const PostSchema = require('../models/post_schema')

        return {
            fields: {
                relation: Model.HasManyRelation,
                modelClass: Fields,
                join: {
                    from: 'fields_schema.id',
                    to: 'fields.fields_schema_id',
                }
            },
            PostSchema: {
                relation: Model.HasManyRelation,
                modelClass: PostSchema,
                join: {
                    from: 'fields_schema.id',
                    to: 'post_schema.schema_id'
                }
            },
            posts: {
                relation: Model.ManyToManyRelation,
                modelClass: Post,
                join: {
                    from: 'fields_schema.id',
                    through: {
                        from: 'post_schema.schema_id',
                        to: 'post_schema.post_id',
                    },
                    to: 'post.id',
                },
            },
        }
    };
}


module.exports = Schema;
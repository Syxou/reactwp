const { Model, ref } = require('objection');
const knex = require('../knex/knex');
const Schema = require('./schema');
const Post = require('./post');

Model.knex(knex);


class PostSchema extends Model {

    static tableName = 'post_schema';

    static relationMappings = {
        fields: {
            relation: Model.ManyToManyRelation,
            modeClass: Schema,
            join: {
                from: ""
            }
        }
    }

}


module.exports = PostSchema;
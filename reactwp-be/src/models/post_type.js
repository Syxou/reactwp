const { Model } = require('objection');
const knex = require('../knex/knex');
('./post');

Model.knex(knex);


class PostType extends Model {
    static tableName = 'post_type';
}


module.exports = PostType;
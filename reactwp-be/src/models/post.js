const { Model } = require('objection');
const knex = require('../knex/knex')

Model.knex(knex);

class Post extends Model {
    static get tableName() {
        return 'post'
    }
}


// createSchema()
// .then(() => knex.destroy())
// .catch(err => {
//     console.error(err);
//     return knex.destroy();
// });

module.exports = Post;
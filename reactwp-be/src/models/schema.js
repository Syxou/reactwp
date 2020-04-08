const { Model } = require('objection');
const knex = require('../knex/knex')

Model.knex(knex);

class Schema extends Model {
    static get tableName() {
        return 'fields_schema'
    }

}




// createSchema()
// .then(() => knex.destroy())
// .catch(err => {
//     console.error(err);
//     return knex.destroy();
// });

module.exports = Schema;
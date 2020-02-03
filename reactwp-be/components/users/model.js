const { Model } = require('objection');
const knex = require('../../knex/knex')

Model.knex(knex);

class User extends Model {
    static get tableName() {
        return 'users'
    }
}

async function createSchema() {
    if (await knex.schema.hasTable('users')) return;

    await knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name');
        table.string('type');
        table.string('email');
        table.string('data_registred');
    })
}

// createSchema()
//     .then(() => knex.destroy())
//     .catch(err => {
//         console.error(err);
//         return knex.destroy();
//     });

module.exports = User;
const { Model } = require('objection');
const knex = require('../../knex/knex')

Model.knex(knex);

class User extends Model {
    static get tableName() {
        return 'posts'
    }
}

async function createSchema() {
    if (await knex.schema.hasTable('posts')) return;
    await knex.schema.createTable('posts', table => {
        table.increments('id').primary();
        table.bigInteger('autor');
        table.datetime('date');
        table.text('content');
        table.string('title');
        table.string('state');
        table.string('type');
    })
}

// createSchema()
    // .then(() => knex.destroy())
    // .catch(err => {
    //     console.error(err);
    //     return knex.destroy();
    // });

module.exports = User;
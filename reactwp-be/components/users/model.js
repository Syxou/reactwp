const { Model } = require('objection');
const knex = require('../../knex/knex')

Model.knex(knex);

class User extends Model {

    // constructor(name, username, email, password, admin, verified) {
    //     this.name = name
    //     this.username = username
    //     this.email = email
    //     this.password = password
    //     this.admin = admin
    //     this.verified = verified
    // }

    static get tableName() {
        return 'users'
    }
}

function save(name, username, email, password, admin, verified) {
    User.query()
        .insert({
            name: name,
            username: username,
            email: email,
            password: password,
            admin: admin,
            verified: verified,
            data_registred: new Date()
        })
        .then(() => {
            res.sendStatus(200)
        })
        .catch(err => {
            console.log(err)
        })
}

// async function createSchema() {
//     if (await knex.schema.hasTable('users')) return;

//     await knex.schema.createTable('users', table => {
//         table.increments('id').primary();
//         table.string('name');
//         table.string('type');
//         table.string('email');
//         table.string('data_registred');
//         // table.dropTimestamps()
//     })
// }

// createSchema()
//     .then(() => knex.destroy())
//     .catch(err => {
//         console.error(err);
//         return knex.destroy();
//     });

module.exports = User;
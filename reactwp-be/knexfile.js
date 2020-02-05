// Update with your config settings.



// module.exports = {
//     development: {
//         client: 'mysql',
//         connection: {
//             host: 'localhost',
//             user: 'root',
//             password: '',
//             database: 'reactwp'
//         },
//         migrations: {
//             directory: '/migrations'
//         },
//         seeds: {
//             directory: '/seeds'
//         }
//     }
// }


module.exports = {

    development: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            database: 'reactwp',
            user: 'root',
            password: ''
        }
    },

    staging: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            database: 'reactwp',
            user: 'root',
            password: ''
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },

    production: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            database: 'reactwp',
            user: 'root',
            password: ''
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }

};

module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'reactwp'
        },
        migrations: {
            directory: './db/migrations'
        },
        seeds: {
            directory: './db/seeds'
        }
    }
}


exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable('post_schema', table => {
            table
                .increments('id')
                .primary();
        })
    ])

};

exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTableIfExists('post_schema')
    ])

};

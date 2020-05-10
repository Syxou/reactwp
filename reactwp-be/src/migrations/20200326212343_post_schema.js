
exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable('post_schema', table => {
            table
                .increments('id')
                .primary();
            table
                .integer('post_id')
            table
                .integer('schema_id')
        })
    ])

};

exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTableIfExists('post_schema')
    ])

};

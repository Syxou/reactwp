
exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable('fields_schema', table => {
            table
                .increments('id')
                .primary();
            table
                .string('type');
            table
                .string('name')
                .notNullable();
            table
                .string('slug')
                .notNullable();
            table
                .string('desc')
        })
    ])
};

exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTableIfExists("fields_schema")
    ])
};

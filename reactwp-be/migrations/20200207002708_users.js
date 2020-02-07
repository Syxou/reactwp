
exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable("users", table => {
            table
                .increments("id")
                .unsigned()
                .primary();
            table
                .string("name")
                .notNullable()
            table
                .string("passwodr")
                .notNullable()
            table
                .string("type")
                .notNullable()
            table
                .string("email")
                .notNullable()
            table
                .string("date_create")
                .notNullable()
        })
    ])
};

exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTableIfExists("users")
    ])
};
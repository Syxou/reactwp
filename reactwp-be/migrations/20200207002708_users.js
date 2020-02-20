
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
                .string("username")
                .notNullable()
            table
                .string("password")
                .notNullable()
            table
                .boolean("admin")
                .notNullable()
            table
                .string("email")
                .notNullable()
            table
                .boolean("verified")
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
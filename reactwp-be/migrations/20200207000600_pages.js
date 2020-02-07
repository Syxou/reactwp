
exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable("pages", table => {
            table
                .increments("id")
                .unsigned()
                .primary();
            table
                .string("title")
            table
                .text("state")
                .notNullable()
            table
                .string("slug")
                .notNullable()
            table
                .string("date_modifate")
                .notNullable()
        })
    ])
};

exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTableIfExists("pages")
    ])
};

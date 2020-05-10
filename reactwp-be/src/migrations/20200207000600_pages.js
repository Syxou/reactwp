
exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable("post", table => {
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
                .text('type')
            table
                .string("slug")
                .notNullable()
            table
                .string("date_modifate")
                .notNullable()
            table
                .integer('user_id')
            table
                .string('post_type')
        })
    ])
};

exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTableIfExists("post")
    ])
};

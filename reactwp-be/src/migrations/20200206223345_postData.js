

exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable("post_data", table => {
            table
                .increments("data_id")
                .unsigned()
                .primary();
            table
                .string("post_id")
                .notNullable()
            table
                .text("post_content")
            table
                .string("data_type")
                .notNullable()
            table
                .string("post_type")
                .notNullable()
            table
                .string("post_date")
                .notNullable()
        })
    ])
};

exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTableIfExists("post_data")
    ])
};
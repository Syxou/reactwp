
exports.up = async function (knex) {
    await knex.schema.createTable("post_data", table => {
        table
            .increments("data_id")
            .unsigned()
            .primary();
        table
            .string("post_id")
            .notNullable()
        table
            .string("post_content")
            .notNullable()
        table
            .string("data_type")
            .notNullable()
        table
            .string("post_date")
            .notNullable()
    })
};

exports.down = async function (knex) {
    await knex.shema.dropTable("post_data")
};

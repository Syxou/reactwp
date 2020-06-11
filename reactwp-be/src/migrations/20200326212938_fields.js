
exports.up = function (knex) {
    return Promise.all([
        knex.schema.raw("SET sql_mode='only_full_group_by'")
            .createTable('fields', table => {
                table.increments('id').primary()
                table.text('data')
                table.string('type')
                table.string('name')
                table.string('slug')
                table.integer('post_id')
                table.integer('fields_schema_id')
            })
    ])
};

exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTableIfExists('fields')
    ])
};

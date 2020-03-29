
exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable('fields', table => {
            table
                .increments('id')
                .primary()
            table
                .text('data')
            table
                .string('type')
            table
                .string('name')
            table
                .string('slug')
            table
                .integer('post_id')
        })
    ])
};

exports.down = function (knex) {
    return new Promise.all([
        knex.schema.dropTableIfExists('fields')
    ])
};

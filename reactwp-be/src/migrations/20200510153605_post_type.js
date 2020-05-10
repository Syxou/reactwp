
exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable('post_type', table => {
            table
                .increments('id')
                .primary()
            table
                .string('type')
            table
                .string('icon')
        })
    ])

};

exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTableIfExists('post_type')
    ])

};

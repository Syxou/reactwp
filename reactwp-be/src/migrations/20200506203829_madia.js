
exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable('media', table => {
            table
                .increments('id')
                .primary()
            table
                .text('name')
            table
                .string('url')
            table
                .text('alt')
            table
                .text('caption')
            table
                .text('file_type')
            table
                .text('desc')
            table
                .string('size')
            table
                .string('date')
            table
                .string('width')
            table
                .string('height')
        })
    ])
};

exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTableIfExists('media')
    ])
};

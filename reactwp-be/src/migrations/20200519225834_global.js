
exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable('global', table => {
            table
                .increments('id')
                .primary()
            table
                .string('option_name')
            table
                .string('option_value')
        })
    ])

};

exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTableIfExists('global')
    ])
};

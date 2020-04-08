exports.seed = function (knex) {
  return knex('post_schema').del()
    .then(function () {
      return knex('post_schema').insert([
        {
          id: 1,
          post_id: 1,
          schema_id: 1
        },
        {
          id: 2,
          post_id: 2,
          schema_id: 2
        },
      ]);
    });
};

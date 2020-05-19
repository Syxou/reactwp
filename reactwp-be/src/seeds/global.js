
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('global').del()
    .then(function () {
      // Inserts seed entries
      return knex('global').insert([
        {
          option_name: 'siteurl',
          option_value: 'http://localhost:3000/',

        },
        {
          option_name: 'home',
          option_value: 'http://localhost:3000/',

        },
        {
          option_name: 'admin_home',
          option_value: 'http://localhost:3000/admin',

        },
        {
          option_name: 'sitename',
          option_value: 'reactWP',
        },
        {
          option_name: 'sitedescription',
          option_value: 'new reactWP',
        },
      ]);
    });
};

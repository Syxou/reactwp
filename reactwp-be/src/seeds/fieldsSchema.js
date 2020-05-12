exports.seed = function (knex) {
  return knex('fields_schema').del()
    .then(function () {
      return knex('fields_schema').insert([
        {
          id: 1,
          name: "Home",
          type: "home_page",
          slug: "home"
        },
        {
          id: 2,
          type: 'page',
          name: 'About title home',
          slug: 'cf_about_title_home',
        },
      ]);
    });
};

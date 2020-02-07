
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('pages').del()
    .then(function () {
      // Inserts seed entries
      return knex('pages').insert([
        {
          title: 'Home',
          state: 'publish',
          slug: 'home',
          date_modifate: new Date()
        },
        {
          title: 'Blog',
          state: 'draft',
          slug: 'blog',
          date_modifate: new Date()
        },
        {
          title: 'About',
          state: 'trash',
          slug: 'about',
          date_modifate: new Date()
        }
      ]);
    });
};

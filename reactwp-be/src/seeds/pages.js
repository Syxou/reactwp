
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('post').del()
    .then(function () {
      // Inserts seed entries
      return knex('post').insert([
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

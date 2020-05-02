
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
          type: 'page',
          date_modifate: new Date()
        },
        {
          title: 'Blog',
          state: 'draft',
          slug: 'blog',
          type: 'page',
          date_modifate: new Date()
        },
        {
          title: 'About',
          state: 'trash',
          slug: 'about',
          type: 'page',
          date_modifate: new Date()
        },
        {
          title: 'post1',
          state: 'publish',
          slug: 'post1',
          type: 'post',
          date_modifate: new Date()
        }
      ]);
    });
};

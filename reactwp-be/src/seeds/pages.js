
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('post').del()
    .then(function () {
      // Inserts seed entries
      return knex('post').insert([
        {
          id: 2,
          title: 'Home',
          state: 'publish',
          slug: 'home',
          type: 'page',
          date_modified: new Date()
        },
        {
          id: 3,
          title: 'Blog',
          state: 'draft',
          slug: 'blog',
          type: 'page',
          date_modified: new Date()
        },
        {
          id: 4,
          title: 'post1',
          state: 'publish',
          slug: 'post1',
          type: 'projects',
          date_modified: new Date()
        },
        {
          id: 1,
          title: 'menu',
          state: 'publish',
          slug: 'menu',
          type: 'sys_menu',
          date_modified: new Date()
        }
      ]);
    });
};

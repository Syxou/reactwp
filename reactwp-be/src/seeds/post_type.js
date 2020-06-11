
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('post_type').del()
    .then(function () {
      // Inserts seed entries
      return knex('post_type').insert([
        { id: 1, type: 'page', icon: 'file' },
        { id: 2, type: 'projects', icon: 'project' },
        { id: 3, type: 'blog', icon: 'align-left' }
      ]);
    });
};

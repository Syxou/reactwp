var faker = require('faker');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('post_data').del()
    .then(function () {
      // Inserts seed entries
      return knex('post_data').insert([
        { post_id: 1, post_content: faker.lorem.paragraphs(), data_type: 'html', post_type: 'content', post_date: faker.date.past() },
        { post_id: 1, post_content: faker.image.imageUrl(), data_type: 'attachment', post_type: 'cf_top_image', post_date: faker.date.past() },
        { post_id: 3, post_content: faker.lorem.paragraph(), data_type: 'html', post_type: 'content', post_date: faker.date.past() }
      ]);
    });
};

var faker = require('faker');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('post_data').del()
    .then(function () {
      // Inserts seed entries
      return knex('post_data').insert([
        {
          post_id: 1,
          post_content: '{"blocks":[{"key":"31n32","text":"This Home page????","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":15,"style":"fontsize-48"},{"offset":0,"length":15,"style":"BOLD"}],"entityRanges":[],"data":{"text-align":"center"}},{"key":"dilsq","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"31nsd","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
          data_type: 'html',
          post_type: 'content',
          post_date: faker.date.past(),
        },
        { post_id: 2, post_content: faker.image.imageUrl(), data_type: 'attachment', post_type: 'content', post_date: faker.date.past() },
        { post_id: 3, post_content: faker.lorem.paragraph(), data_type: 'html', post_type: 'content', post_date: faker.date.past() },
      ]);
    });
};

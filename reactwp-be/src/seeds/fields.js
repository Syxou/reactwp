var faker = require('faker');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('fields').del()
    .then(function () {
      // Inserts seed entries
      return knex('fields').insert([
        {
          id: 1,
          data: '{"blocks":[{"key":"31n32","text":"This Home page????","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":15,"style":"fontsize-48"},{"offset":0,"length":15,"style":"BOLD"}],"entityRanges":[],"data":{"text-align":"center"}},{"key":"dilsq","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"31nsd","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
          type: 'wyswyg',
          name: 'About Home',
          slug: 'cf_about-home',
          post_id: 1,
          fields_schema_id: 1
        },
        {
          id: 2,
          data: 'About',
          type: 'text',
          name: 'About title home',
          slug: 'cf_about-title-home',
          post_id: 1,
          fields_schema_id: 1
        },
      ]);
    });
};

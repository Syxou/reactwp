var faker = require('faker');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          name: faker.name.firstName(),
          passwodr: faker.internet.password(),
          type: 'admin',
          email: faker.internet.email(),
          date_create: faker.date.past(),
        },
      ]);
    });
};

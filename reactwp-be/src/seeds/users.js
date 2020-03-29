var faker = require('faker');
const bcrypt = require('bcrypt');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          name: faker.name.firstName() + " " + faker.name.lastName(),
          username: "syxou",
          password: bcrypt.hashSync("!Sun12345", 10),
          avatar: "",
          admin: true,
          verified: true,
          email: faker.internet.email(),
          date_create: faker.date.past(),
        },
        {
          name: faker.name.firstName() + " " + faker.name.lastName(),
          username: faker.finance.accountName(),
          password: bcrypt.hashSync(faker.internet.password(), 10),
          admin: faker.random.boolean(),
          avatar: faker.image.avatar(),
          verified: faker.random.boolean(),
          email: faker.internet.email(),
          date_create: faker.date.past(),
        },
        {
          name: faker.name.firstName() + " " + faker.name.lastName(),
          username: faker.finance.accountName(),
          password: bcrypt.hashSync(faker.internet.password(), 10),
          admin: faker.random.boolean(),
          avatar: faker.image.avatar(),
          verified: faker.random.boolean(),
          email: faker.internet.email(),
          date_create: faker.date.past(),
        },
      ]);
    });
};


# Reactwp This my training project. 

It's a web software for creating and changing web sites. You can add pages, create custom posts, create fields for posts. And change it.


### Tech

Reactwp uses a number of open source projects to work properly:

* [React.js](https://reactjs.org/) - A JavaScript library for building user interfaces
* [knex.js](http://knexjs.org/) - "batteries included" SQL query builder
* [objection.js](https://vincit.github.io/objection.js/) - An SQL-friendly ORM for Node.js
* [node.js](https://nodejs.org/) - evented I/O for the backend
* [Express](https://expressjs.com/) - fast node.js network app framework [@tjholowaychuk]
* [ant.design](https://3x.ant.design/) - @3.x A design system with values of Nature and Determinacy for better user experience of enterprise applications
* [jwt](https://jwt.io/) - JSON Web Tokens



### Installation

Reactwp requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the front-end.

```sh
$ cd reactwp
$ cd reactwp-fe
$ npm i
$ npm start
```
Create a database and create a first records
1. Start you mysql server
2. Create a new database named `reactwp`
3. ```sh
    $ cd reactwp-be
    $ touch knexfile.js
5. add code below in file, replacing the user and password to the database

```js
module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            database: 'reactwp',
            user: 'root',
            password: 'root'
        },
        migrations: {
            directory: 'src/migrations'
        },
        seeds: {
            directory: 'src/seeds'
        }
    },
};
```


Install the dependencies, devDependencies, and start the back-end.
```sh
$ cd reactwp
$ cd reactwp-be
$ npm i
$ knex migrate:latest
$ knex seed:run
$ npm run dev
```

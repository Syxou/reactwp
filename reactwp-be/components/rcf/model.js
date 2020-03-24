const { Model } = require('objection');
const knex = require('../../knex/knex');

Model.knex(knex);

class Acf extends Model {

    static get taleName() {
        return 'acf';
    }

}

module.exports = Acf;
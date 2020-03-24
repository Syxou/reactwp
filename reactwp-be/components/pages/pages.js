const { Model } = require('objection');
const knex = require('../../knex/knex')

Model.knex(knex)

class Pages extends Model {
    static get tableName() {
        return 'pages';
    }

    static get relationMappings() {
        return {
            afc: {
                relation: Model.HasManyRelation,
                modelClass: Acf,
                join: {
                    from: ''
                }
            }
        }
    }
}

module.exports = Pages;
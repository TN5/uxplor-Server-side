var knex = require('../db/knex');

module.exports = {
  getOne: function(id) {
    return knex('user').where('id', id).first();
  },
  getUserByEmail: function(email) {
    return knex('user').where('email', email).first();
  }
}

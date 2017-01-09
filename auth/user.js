var knex = require('../db/knex');

module.exports = {
  getOne: function(id) {
    return knex('user').where('id', id).first();
  },
  getUserByEmail: function(email) {
    return knex('user').where('email', email).first();
  },
  create: function(user) {
    return knex('user').insert(user, 'id').then(function(ids) {
      return ids[0];
    });
  }
  // ,
  // deleteUserById: function(id) {
  //   return knex('user').where('id',id).del();
  // }
}

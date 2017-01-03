exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM "user"; ALTER SEQUENCE user_id_seq RESTART WITH 3;')
    .then(function () {
      const users = [{
        id: 1,
        name: 'guest',
        email: 'guest@gmail.com',
        password: 'guest',
      }, {
        id: 2,
        name: 'admin',
        email: 'admin@gmail.com',
        password: 'admin',
      }];
      return knex('user').insert(users);
    });
};

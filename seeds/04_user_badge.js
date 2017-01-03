exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM "user_badge"; ALTER SEQUENCE user_badge_id_seq RESTART WITH 3;')
    .then(function () {
      var user_badges = [{
        id: 1,
        user_id: 1,
        badge_id: 1
      }, {
        id: 2,
        user_id: 2,
        badge_id: 3
      }];
      return knex('user_badge').insert(user_badges);
    });
};

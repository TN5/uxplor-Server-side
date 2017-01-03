exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM "feedback"; ALTER SEQUENCE feedback_id_seq RESTART WITH 2;')
    .then(function () {
      var feedback = [{
        id: 1,
        rating: 5,
      }];
      return knex('feedback').insert(feedback);
    });
};

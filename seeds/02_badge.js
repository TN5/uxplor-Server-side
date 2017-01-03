exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM "badge"; ALTER SEQUENCE badge_id_seq RESTART WITH 5;')
    .then(function () {
      const badges = [{
        id: 1,
        badge_name: 'CJ',
        type: 'location',
        image_url: 'images/cj.png',
      }, {
        id: 2,
        badge_name: 'Berto',
        type: 'location',
        image_url: 'images/berto.png',
      }, {
        id: 3,
        badge_name: 'Kyle',
        type: 'location',
        image_url: 'images/kyle.png',
      }, {
        id: 4,
        badge_name: 'Mairin',
        type: 'location',
        image_url: 'images/mairin.png',
      }];
      return knex('badge').insert(badges);
    });
};

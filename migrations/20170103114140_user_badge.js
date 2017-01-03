exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_badge', function(table) {
    table.increments();
    table.integer('user_id').unsigned().references('user.id');
    table.integer('badge_id').unsigned().references('badge.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user_badge');
};

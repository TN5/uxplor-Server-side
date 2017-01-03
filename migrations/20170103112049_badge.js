exports.up = function(knex, Promise) {
  return knex.schema.createTable('badge', function(table) {
    table.increments();
    table.text('badge_name').notNullable();
    table.text('type').notNullable();
    table.text('image_url').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('badge');
};

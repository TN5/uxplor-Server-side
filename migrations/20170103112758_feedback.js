exports.up = function(knex, Promise) {
  return knex.schema.createTable('feedback', function(table) {
    table.increments();
    table.integer('rating').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('feedback');
};

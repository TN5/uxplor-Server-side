exports.up = function(knex, Promise) {
  return knex.schema.table('user', function(table) {
    table.boolean('is_active').notNullable().defaultTo(true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('user', function(table) {
    table.dropColumn('is_active');
  });
};

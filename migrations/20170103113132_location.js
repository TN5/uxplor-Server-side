exports.up = function(knex, Promise) {
  return knex.schema.createTable('location_feedback', function(table) {
    table.increments();
    table.text('name').notNullable();
    table.text('google_id').notNullable();
    table.boolean('flagged').notNullable().defaultTo(false);
    table.text('flag_type').notNullable();
    table.integer('user_id').unsigned().references('user.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('location_feedback');
};

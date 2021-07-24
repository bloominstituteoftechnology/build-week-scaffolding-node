exports.up = async (knex) => {
  await knex.schema
    .createTable('users', table => {
      table.increments('user_id')
      table.string('username', 200).notNullable().unique()
      table.string('password', 200).notNullable()
    })

    .createTable('items', table => {
      table.increments('item_id')
      table.string('name').notNullable()
      table.string('location').notNullable()
      table.integer('price').notNullable()
      table.string('description').notNullable()
    })

    .createTable('user_items', table => {
      table.increments('user-items_id')
      table.integer('item_id')
        .unsigned()
        .notNullable()
        .references('item_id')
        .inTable('items')
        .onDelete('CASCADE')
      table.integer('user_id')
        .unsigned()
        .notNullable()
        .references('user_id')
        .inTable('users')
        .onDelete('CASCADE')
    })
}

exports.down = async (knex) => {
  await knex.schema
  .dropTableIfExists('user_items')
  .dropTableIfExists('items')
  .dropTableIfExists('users')
}

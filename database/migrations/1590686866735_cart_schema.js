'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CartSchema extends Schema {
  up () {
    this.create('carts', (table) => {
      table.increments()
      table.timestamps()
      table.integer('customer_id').unsigned()
      table.foreign('customer_id').references('customers.id').onDelete('cascade')
      table.integer('game_id').unsigned()
      table.foreign('game_id').references('games.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('carts')
  }
}

module.exports = CartSchema

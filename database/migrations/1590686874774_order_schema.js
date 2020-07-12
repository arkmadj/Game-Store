'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      table.timestamps()
      table.integer('customer_id').unsigned()
      table.foreign('customer_id').references('customers.id').onDelete('cascade')
      table.integer('game_id').unsigned()
      table.foreign('game_id').references('games.id').onDelete('cascade')
      table.integer('delivery_id').unsigned()
      table.foreign('delivery_id').references('addresses.id').onDelete('cascade')
      table.integer('billing_id').unsigned()
      table.foreign('billing_id').references('addresses.id').onDelete('cascade')
      table.string('order_no')
      table.string('status')
      table.float('cost').unsigned()
      table.float('shipping_cost').unsigned()
      table.float('total_cost').unsigned()
      table.boolean('voucher_used').defaultTo(false)
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrderSchema

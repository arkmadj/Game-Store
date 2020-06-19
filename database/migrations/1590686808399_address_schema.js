'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddressSchema extends Schema {
  up () {
    this.create('addresses', (table) => {
      table.increments()
      table.timestamps()
      table.string('street')
      table.string('state')
      table.string('country')
      table.integer('customer_id').unsigned()
      table.foreign('customer_id').references('customers.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('addresses')
  }
}

module.exports = AddressSchema

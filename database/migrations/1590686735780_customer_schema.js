'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CustomerSchema extends Schema {
  up () {
    this.create('customers', (table) => {
      table.increments()
      table.timestamps()
      table.string('name')
      table.string('password')
      table.string('email')
      table.string('phone_no')
    })
  }

  down () {
    this.drop('customers')
  }
}

module.exports = CustomerSchema

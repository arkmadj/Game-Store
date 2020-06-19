'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PaymentSchema extends Schema {
  up () {
    this.create('payments', (table) => {
      table.increments()
      table.timestamps()
      table.string('name')
      table.string('type')
      table.text('description')
      table.string('img_src')
    })
  }

  down () {
    this.drop('payments')
  }
}

module.exports = PaymentSchema

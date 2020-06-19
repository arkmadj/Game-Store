'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdminSchema extends Schema {
  up () {
    this.create('admins', (table) => {
      table.increments()
      table.timestamps()
      table.string('name')
      table.string('password')
      table.string('email')
    })
  }

  down () {
    this.drop('admins')
  }
}

module.exports = AdminSchema

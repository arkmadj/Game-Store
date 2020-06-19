'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CharacterSchema extends Schema {
  up () {
    this.create('characters', (table) => {
      table.increments()
      table.timestamps()
      table.string('name')
      table.text('description')
      table.text('img_src')
      table.integer('game_id').unsigned()
      table.foreign('game_id').references('games.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('characters')
  }
}

module.exports = CharacterSchema

'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GameSchema extends Schema {
  up () {
    this.create('games', (table) => {
      table.increments()
      table.timestamps()
      table.string('title')
      table.string('platform')
      table.text('main_description')
      table.string('main_img')
      table.string('img_one')
      table.string('img_two')
      table.string('img_three')
      table.string('main_theme')
      table.string('main_theme_description')
      table.string('price')
    })
  }

  down () {
    this.drop('games')
  }
}

module.exports = GameSchema

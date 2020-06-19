'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Cart extends Model {
    order (){
        return this.hasMany('App/Models/Game')
    }
}

module.exports = Cart

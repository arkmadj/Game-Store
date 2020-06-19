'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {
    order (){
        return this.hasMany('App/Models/Game')
    }

    customer(){
        return this.belongsTo('App/Models/Customer')
    }

    billing(){
        return this.hasOne('App/Models/Address')
    }

    delivery(){
        return this.hasOne('App/Models/Address')
    }
}

module.exports = Order

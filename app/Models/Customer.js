'use strict'

const Model = use('Model')

const Hash = use('Hash')

class Customer extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  tokens () {
    return this.hasMany('App/Models/Token')
  }

  address (){
    return this.hasMany('App/Models/Address')
  }

  order (){
    return this.hasMany('App/Models/Order')
  }

  order (){
    return this.hasOne('App/Models/Cart')
  } 

}

module.exports = Customer

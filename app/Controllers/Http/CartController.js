'use strict'

const Cart = use('App/Models/Cart')
// const axios = require('axios')
const Mail = use('Mail')

class CartController {
  async index({response, auth}){
    const customer = auth.current.user
    try{
      const cart = await Cart.query().where('customer_id', customer.id).fetch()
      return response.json({
        status: 'Success',
        message: 'Showing Cart',
        data: cart
      })
    }catch(error){
      return response.json({
        status: 'error',
        message: 'An error occured.',
        data: error
      })      
    }
  }
  async addItem({response, auth, request}){
    const customer = auth.current.user    
    const {game} = request.only(['game'])

    // console.log('Here jere')
    
    try{
      const cart = await Cart.create({
        customer_id: customer.id,
        game_id: game
      })
      
      return response.json({
        status: 'Success',
        message: 'Item addded to Cart.',
        data: cart
      })

    }catch(error){
      response.status(400).json({
        status: 'Error',
        message: 'An Error occured.'
      })
    }
  }

  async removeItem({ auth, response, params}){
    const customer = auth.current.user
    const cart_id = params.id
    // const {cart_id} = request.only(['cart_id'])
    console.log(customer.id + " " + cart_id)

    try{
      await Cart
        .query()
        .where('customer_id', customer.id)
        .where('id', cart_id)
        .delete()

      return response.json({
        status: 'Success',
        message: 'Item removed from Cart.',
        data: null
      })

    }catch(error){
      response.status(400).json({
        status: 'Error',
        message: 'An Error occured.'
      })
    }
  }

  async show({ auth, response, params}){
    const customer = auth.current.user
    try{
      const cart = await Cart.find(params.id)

      return response.json({
        status: 'Success',
        message: 'Item removed from Cart.',
        data: cart
      })
    }catch(error){
      response.status(400).json({
        status: 'Error',
        message: 'An Error occured.'
      })
    }
  }

  async checkout({auth, response, request}){
    const customer = auth.current.user
    const {message, email} = request.only(['message', 'email'])
    if(await Mail.raw(message, (message) => {
      message.to(email)
      message.subject('Order Confirmation')
    })){
      try{
        console.log("Trying to delete...")
        await Cart.query()
          .where('customer_id', customer.id)
          .delete()

        return response.json({
          status: 'Success',
          message: 'Checkout successful.',
          data: null
        })

      }catch(error){
        response.status(400).json({
          status: 'Error',
          message: 'An Error occured.'
        })
      }
    }
  }
}

module.exports = CartController

'use strict'
const Database = use('Database')

const Order = use('App/Models/Order')

class OrderController {
  async index({response}){
    try{
      console.log('Here Orders')
      const orders = await Order.all()
      return response.json({
        status: 'Success',
        message: 'Showing all Orders.',
        data: orders
      })

    }catch(error){
      return response.json({
        status: 'error',
        message: 'An error occured.',
        data: error
      })      
    }
  }

  async getAllData({response}){
    try{
      const allData = await Database.table('orders')
        .leftOuterJoin('customers', 'orders.customer_id', 'customers.id')
        .leftOuterJoin('addresses', 'orders.delivery_id', 'addresses.id')
        .leftOuterJoin('payments', 'orders.payment_id', 'payments.id')
        .leftOuterJoin('games', 'orders.game_id', 'games.id')
      return response.json({
        status: 'Success',
        message: 'Showing all Orders.',
        data: allData
      })

    }catch(error){
      return response.json({
        status: 'error',
        message: 'An error has occured.',
        data: error
      })      
    }
  }

  async customerOrders({response, auth}){
    const customer = auth.current.user
    try{
      const orders = await Order.query().where('customer_id', customer.id).fetch()
      return response.json({
        status: 'Success',
        message: 'Showing Customer Orders',
        data: orders
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
    const item = request.only([
      'game_id', 'delivery_id', 'voucher_used', 'order_no', 'cost',
      'billing_id', 'status', 'shipping_cost', 'total_cost', 'payment_id', 'expected_delivery_date'
    ])
    try{
      console.log(item)
      const order = await Order.create({
        'customer_id': customer.id,
        'game_id': item.game_id,
        'delivery_id': item.delivery_id,
        'billing_id': item.billing_id,
        'order_no': item.order_no,
        'cost': item.cost,
        'status': item.status,
        'shipping_cost': item.shipping_cost,
        'total_cost': item.total_cost,
        'voucher_used': item.voucher_used,
        'payment_id': item.payment_id,
        'expected_delivery_date': item.expected_delivery_date
      })
      
      return response.json({
        status: 'Success',
        message: 'Item addded to Order.',
        data: order
      })

    }catch(error){
      response.status(400).json({
        status: 'Error',
        message: error
      })
    }
  }

  async removeItem({ auth, response, params}){
    const customer = auth.current.user
    try{
      await Order
        .query()
        .where('customer_id', customer.id)
        .where('order_id', params.id)
        .delete()

      return response.json({
        status: 'Success',
        message: 'Item removed from Order.',
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
      const order = await Order.find(params.id).where('customer_id', customer.id)

      return response.json({
        status: 'Success',
        message: 'Showing order.',
        data: order
      })
    }catch(error){
      response.status(400).json({
        status: 'Error',
        message: 'An Error occured.'
      })
    }
  }

  async updateStatus({response, request}){
    const orderData = request.only(['order_id', 'status'])
    try{
      const order = await Order
        .query()
        .where('id', orderData.order_id)
        .update({
          status: orderData.status
        })
        
        return response.json({
          status: 'Success',
          message: 'Showing order.',
          data: order
        })

    }catch(error){
      response.status(400).json({
        status: 'Error',
        message: 'An Error occured.'
      })
    }
  }

  // let confirmationMessage = 

}

module.exports = OrderController

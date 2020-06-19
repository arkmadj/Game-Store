'use strict'

const Payment = use('App/Models/Payment')

class PaymentController {
  async getPayment({params, response}){
    try{
      const payment = await Payment.find(params.id)
      return response.json({
        status: 'success',
        data: payment
      })
    }catch(error){
      return response.status(400).json({
        status: 'Error',
        message: 'There was a problem fetching payment'
      })
    }
  }
  async index({response}){
    try{
      console.log('Here')
      const payment = await Payment.all()
      return response.json({
        status: 'Success',
        message: 'Showing all Payments.',
        data: payment
      })

    }catch(error){
      return response.json({
        status: 'error',
        message: 'An error occured.',
        data: error
      })      
    }
  }

  async addItem({response, request}){
    const paymentData = request.only(['name', 'type', 'description', 'img_src'])
    try{
      const payment = await Payment.create(paymentData)
      
      return response.json({
        status: 'Success',
        message: 'Item addded to Payments.',
        data: payment
      })

    }catch(error){
      response.status(400).json({
        status: 'Error',
        message: 'An Error occured.',
        data: error
      })
    }
  }
}

module.exports = PaymentController

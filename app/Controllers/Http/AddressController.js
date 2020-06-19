'use strict'

const Address = use('App/Models/Address')

class AddressController {
  
  async add({request, auth, response}){
    const customer = auth.current.user
    const addressData = request.only(['street', 'state', 'country'])
    
    try{
      const address = await Address.create({
        customer_id: customer.id,
        street: addressData.street,
        state: addressData.state,
        country: addressData.country        
      })

      return response.json({
        status: 'Success',
        message: 'Address Created',
        data: address
      })
    }catch(error){
      return response.json({
        status: 'Error',
        message: 'An error occurred.'
      })
    }
  }

  async getCustomerAddress({response, auth}){
    const customer = auth.current.user

    try{
      const address = await Address.query().where('customer_id', customer.id).fetch()
      return response.json({
        status: 'Success',
        message: 'Showing Cart',
        data: address
      })
    }catch(error){
      return response.json({
        status: 'error',
        message: 'An error Occured.',
        data: error
      })
    }
  }

  async getAddress({response, params}){
    try{
      const address = await Address.find(params.id)
      return response.json({
        status: 'Success',
        data: address
      })
    }catch(error){
      return response.status(400).json({
        status: 'Error',
        message: 'There was an error fetching address.'
      })
    }
  }

  async remove({params, auth, response}){
    const customer = auth.current.user
    try{
      await Address
        .query()
        .where('customer_id', customer.id)
        .where('id', params.id)
        .delete()

      return response.json({
        status: 'Success',
        message: 'Address removed.',
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

module.exports = AddressController

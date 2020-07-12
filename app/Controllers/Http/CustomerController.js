'use strict'

const Customer = use('App/Models/Customer')

class CustomerController {

  async index({response}){
    try{
      console.log('Here')
      const customer = await Customer.query().where('role', null).fetch()
      return response.json({
        status: 'Success',
        message: 'Showing all Customers.',
        data: customer
      })

    }catch(error){
      return response.json({
        status: 'error',
        message: 'An error occured.',
        data: error
      })      
    }
  }


  // Admin
  async adminLogin({
    request,
    auth,
    response
  }) {
    const {email, password} = request.only(['email', 'password'])

    try{
        const token = await auth.attempt(
          email,
          password
        )
        return response.json({
          status: 'Success',
          data: token          
        })
        
    }catch(error){
        response.status(400).json({
          status: 'Error',
          message: 'Invalid email or password.',
        })
    }
  }

  async adminRegister({
    request,
    response,
    auth
  }) {
    const customerData = request.only(['name', 'email', 'password', 'phone_no', 'role'])

    try{
        const customer = await Customer.create(customerData)
        const token = await auth.generate(customer)

        return response.json({
          status: 'Success',
          data: token
        })
    }catch(error){
      return response.status(400).json({
        status: 'error',
        message: 'There was a problem creating user, please try again later.'
      })
      

    }
  }

  // Customer

  async login({
    request,
    auth,
    response
  }) {
    const {email, password} = request.only(['email', 'password'])

    try{
        const token = await auth.attempt(
          email,
          password
        )
        return response.json({
          status: 'Success',
          data: token          
        })
        
    }catch(error){
        response.status(400).json({
          status: 'Error',
          message: 'Invalid email or password.',
        })
    }
  }

  async register({
    request,
    response,
    auth
  }) {
    const customerData = request.only(['name', 'email', 'password', 'phone_no'])

    try{
        const customer = await Customer.create(customerData)
        const token = await auth.generate(customer)

        return response.json({
          status: 'Success',
          data: token
        })
    }catch(error){
      return response.status(400).json({
        status: 'error',
        message: 'There was a problem creating user, please try again later.'
      })
      

    }
  }

  async show({
    params,
    response
  }) {
    const customer = await Customer.find(params.id)
    const res = {
      name: customer.name,
      email: customer.email,  
      phone_no: customer.phone_no
    }
    return response.json(res)
  }

  async curr({auth, response}){
    const customer = await Customer.query().where('id', auth.current.user.id).firstOrFail()

    return response.json({
      status: 'Success',
      data: customer
    })
  }

  async updateProfile({request, auth, response}){
    try{
      const customer = auth.current.user
      customer.name = request.only('name')
      await customer.save()

      return response.json({
        status: 'Success',
        message: 'Profile Updated',
        data: user
      })

    }catch(error){
      return response.status(400).json({
        status: 'Error',
        message: 'There was problem updating profile, please try again later'
      })

    }
  }

  async me ({ auth, response }) {
    try{
      const user = await Customer.query()
      .where('id', auth.current.user.id)
      .firstOrFail()

      // console.log(user)

      return response.json({
        status: 'success',
        data: user
      })
    }catch(error){
      return response.status(400).json({
        status: 'Error',
        message: 'There was problem fetching user profile, please try again later'
      })
    }
  }
}

module.exports = CustomerController

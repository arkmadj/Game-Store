'use strict'

const User = use('App/Models/User')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with customers
 */
class UserController {

  async login({
    request,
    auth,
    response
  }) {
    const {
      email,
      password
    } = request.only(['email', 'password']);

    const token = await auth.attempt(email, password)
    return response.json(token)
  }

  async register({
    request,
    response
  }) {
    const {
      username,
      password,
      email
    } = request.only(['username', 'email', 'password'])

    await User.create({username, email, password})

    return response.send({message: 'User has been created', data: {
      username,
      password,
      email
    }})

  }

  async show({
    params,
    response
  }) {
    const user = await User.find(params.id)
    const res = {
      name: user.username,
      email: user.email,
    }
    return response.json(res)
  }
}

module.exports = UserController

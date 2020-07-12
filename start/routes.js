'use strict'

const { RouteResource } = require('@adonisjs/framework/src/Route/Manager')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  // Route.post('login', 'UserController.login')
  // Route.post('register', 'UserController.register')
  // Route.get('getuser/:id', 'UserController.show')

  // Admin
  Route.post('admin/login', 'CustomerController.adminLogin')
  Route.post('admin/register', 'CustomerController.adminRegister')
  Route.get('admin/admins', 'CustomerController.AdminIndex')

  // Customer
  Route.post('login', 'CustomerController.login')
  Route.post('register', 'CustomerController.register')  
  Route.get('getcustomers', 'CustomerController.index')
  Route.get('getuser/:id', 'CustomerController.show')  
  Route.get('userprofs', 'CustomerController.me').middleware('auth:jwt')
  
  // Address
  Route.post('addaddress', 'AddressController.add').middleware('auth:jwt')
  Route.get('getcustomeraddress', 'AddressController.getCustomerAddress').middleware('auth:jwt')
  Route.delete('removeaddress/:id', 'AddressController.remove').middleware('auth:jwt')  
  Route.get('getaddress/:id', 'AddressController.getAddress')

  // Cart
  Route.post('addtocart', 'CartController.addItem').middleware('auth:jwt')
  Route.delete('removefromcart/:id', 'CartController.removeItem').middleware('auth:jwt')
  Route.get('cart', 'CartController.index').middleware('auth:jwt')
  Route.get('cart/:id', 'CartController.show').middleware('auth:jwt')
  Route.post('checkout', 'CartController.checkout').middleware('auth:jwt')
  Route.delete('cart/delete/:id', 'CartController.removeItem').middleware(['auth:jwt'])

  // Order  
  Route.get('order/getalldata', 'OrderController.getAllData')
  Route.get('getallorders', 'OrderController.index')
  Route.get('getorders', 'OrderController.customerOrders').middleware('auth:jwt')
  Route.get('order/:id', 'OrderController.show').middleware('auth:jwt')
  Route.post('order/add', 'OrderController.addItem').middleware('auth:jwt')
  Route.get('order/status', 'Orderontroller.updateStatus').middleware('auth:jwt')
  Route.delete('order/delete/:id', 'OrderController.removeItem').middleware(['auth:jwt'])

  // Payment
  Route.get('getpayments', 'PaymentController.index')
  Route.post('addpayment', 'PaymentController.addItem').middleware('auth:jwt')
  Route.get('getpayment/:id', 'PaymentController.getPayment')
  
  // Game
  Route.post('addgame', 'GameController.addGame')
  Route.get('game', 'GameController.index')
  Route.get('game/:id', 'GameController.show')

  // Game Character
  Route.post('addcharacter', 'CharacterController.add')  
  Route.get('character', 'CharacterController.index')
  Route.get('character/:id', 'CharacterController.show')
}).prefix('api')


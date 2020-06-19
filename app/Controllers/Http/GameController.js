'use strict'

const Game = use('App/Models/Game')


class GameController {
  async addGame({request, response}){
    const gameData = request.only(['name', 'platform', 'main_description','main_img','img_one', 'img_two', 'img_three', 'main_theme', 'main_theme_description', 'price'])

    try{
      const game = await Game.create(gameData)
      return response.json({
        status: 'Success',
        message: 'Game Created',
        data: game
      })
    }catch(error){
      return response.json({
        status: 'error',
        message: 'An error occured.'
      })
    }
  }

  async index({response}){
    try{
      const games = await Game.all()
      return response.json({
        status: 'Success',
        message: 'Showing all games',
        data: games
      })

    }catch(error){
      return response.json({
        status: 'error',
        message: 'An error occured.'
      })      
    }
  }

  async show({response, params}){
    try{
      const game = await Game.find(params.id)
      return response.json({
        status: 'Success',
        message: 'Game Found',
        data: game
      })
    }catch(error){
      return response.json({
        status: 'error',
        message: 'An error occured.'
      }) 
    }
  }
}

module.exports = GameController

'use strict'

const Character = use ('App/Models/Character')


class CharacterController {
  
  async add({request, response}){
    const characterData = request.only(['name', 'description','img_src', 'game_id'])

    try{
      const character = await Character.create(characterData)

      return response.json({
        status: 'Success',
        message: 'Game character Created',
        data: character
      })
    }catch(error){
      return response.json({
        status: 'Error',
        message: 'An error occurred.',
        data: error
      })
    }
  }

  async index({response}){
    try{
      const characters = await Character.all()
      return response.json({
        status: 'Success',
        message: 'Showing all Characters',
        data: characters
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
      const character = await Character.find(params.id)
      return response.json({
        status: 'Success',
        message: 'Character Found',
        data: character
      })
    }catch(error){
      return response.json({
        status: 'error',
        message: 'An error occured.'
      }) 
    }
  }
}

module.exports = CharacterController

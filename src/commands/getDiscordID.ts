import { Message } from 'discord.js'
import { Bot } from '../interfaces'

module.exports.run = async (_bot: Bot, message: Message, _args: any) => {
  message.channel.send(`Discord ID: ${message.author.id}`)
}

module.exports.command = {
  name: 'did'
}

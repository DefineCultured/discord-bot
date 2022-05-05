import { Message } from 'discord.js'
import { evaluate } from 'mathjs'

import { IBot } from '../interfaces'

module.exports.run = async (_bot: IBot, message: Message, args: any) => {
  if (!args.length) return message.channel.send('Missing expression')

  try {
    const result = evaluate(args.join(' '))
    message.channel.send(result)
  } catch (err) {
    console.error(err)
    throw err
  }
}

module.exports.command = {
  name: 'calc'
}

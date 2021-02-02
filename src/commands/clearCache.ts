import { Message } from 'discord.js'
import { IBot } from '../interfaces'

import cache from '../utils/cache'

module.exports.run = async (_bot: IBot, message: Message, _args: any) => {
  try {
    cache.del('emails')

    message.channel.send(`Cache cleared.`)
  } catch (err) {
    console.error(err)
    throw err
  }
}

module.exports.command = {
  name: 'clearcache',
  alias: 'cc'
}

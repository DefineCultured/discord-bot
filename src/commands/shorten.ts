import { Message } from 'discord.js'
import config from '../../config.json'

import { IBot } from '../interfaces'
import UrlAPI from '../utils/UrlAPI'

import { codeBlock } from '../utils/helpers'

module.exports.run = async (_bot: IBot, message: Message, args: any) => {
  if (!config.permittedUsers.includes(message.author.id)) return message.channel.send('Not authorized')
  if (!args.length) return message.channel.send('Missing URL')

  try {
    const [url, keyword] = args
    const { data } = await UrlAPI.shorten(url, keyword)

    if (data.status === 'fail') {
      return message.channel.send(data.message)
    }

    const shorturl = codeBlock('js', data.shorturl, true)

    return message.channel.send(`Created shorturl ${shorturl}`)
  } catch (e) {
    console.error(e)
    if (e.response.data.status === 'fail') {
      return message.channel.send(e.response.data.message)
    }
    return message.channel.send('Something went wrong..')
  }
}

module.exports.command = {
  name: 'shorten'
}

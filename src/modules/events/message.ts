import config from '../../../config.json'
import Discord, { Message } from 'discord.js'
import 'dotenv/config'
import { Bot } from '../../interfaces'

const { SERVER_ID, BOT_CHANNEL_ID } = process.env

const bot: Bot = new Discord.Client({ disableMentions: 'everyone' })
bot.commands = new Discord.Collection()

module.exports = (bot: Bot, message: Message) => {
  if (message.author.bot) return
  // if (message.channel.type === 'dm') return
  // if (message.guild.id !== SERVER_ID) return
  // if (message.channel.id !== BOT_CHANNEL_ID) return

  const prefix = config.prefix
  const messageArray = message.content.split(' ')
  const cmd = messageArray[0].toLowerCase()
  const args = message.content.slice(prefix.length).split(/ +/).slice(1)

  if (message.content.startsWith(config.prefix)) {
    const commandfile = bot.commands.get(cmd.slice(prefix.length))
    if (commandfile) {
      commandfile.run(bot, message, args)
    }
  }
}

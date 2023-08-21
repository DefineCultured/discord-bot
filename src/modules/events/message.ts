import { prefix, permittedGuilds, permittedChannels } from '../../../config'
import Discord, { Message } from 'discord.js'
import 'dotenv/config'
import { IBot } from '../../interfaces'

const bot: IBot = new Discord.Client({ disableMentions: 'everyone' })
bot.commands = new Discord.Collection()

module.exports = (bot: IBot, message: Message) => {
  if (message.author.bot) return
  if (message.channel.type === 'dm') return
  if (!permittedGuilds.includes(message.guild.id)) return
  if (!permittedChannels.includes(message.channel.id)) return

  const messageArray = message.content.split(' ')
  const cmd = messageArray[0].toLowerCase()
  const args = message.content.slice(prefix.length).split(/ +/).slice(1)

  if (message.content.startsWith(prefix)) {
    const commandfile = bot.commands.get(cmd.slice(prefix.length))
    if (commandfile) {
      commandfile.run(bot, message, args)
    }
  }
}

import { Bot } from '../../interfaces'

module.exports = (bot: Bot) => {
  console.log(`${bot.user.username} is online!`)
  bot.user.setActivity('definecultured.com')
}

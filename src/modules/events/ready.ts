import { IBot } from '../../interfaces'

module.exports = (bot: IBot) => {
  console.log(`${bot.user.username} is online!`)
  bot.user.setActivity('definecultured.com')
}

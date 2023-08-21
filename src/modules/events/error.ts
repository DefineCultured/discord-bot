import { ErrorEvent } from 'discord.js'
import { IBot } from '../../interfaces'

module.exports = (_bot: IBot, error: ErrorEvent) => {
  console.error(error)
  throw error
}

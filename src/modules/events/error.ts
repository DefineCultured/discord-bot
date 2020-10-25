import { ErrorEvent } from 'discord.js'
import { Bot } from '../../interfaces'

module.exports = (_bot: Bot, error: ErrorEvent) => {
  console.error(error)
  throw error
}

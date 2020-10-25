import fs from 'fs'
import * as Discord from 'discord.js'
import 'dotenv/config'
import { Bot } from './interfaces'

const bot: Bot = new Discord.Client({ disableMentions: 'everyone' })

bot.commands = new Discord.Collection()

// Load commands
const generalCommands = fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.ts'))

for (const file of generalCommands) {
  const props = require(__dirname + `/commands/${file}`)
  console.log(`${file} loaded!`)
  bot['commands'].set(props.command.name, props)
  if (props.command.alias) {
    bot['commands'].set(props.command.alias, props)
  }
}

// Event listener
fs.readdir(__dirname + '/modules/events', (err, files) => {
  if (err) return console.error(err)
  files.forEach(file => {
    if (!file.endsWith('.ts')) return

    const event = require(__dirname + `/modules/events/${file}`)
    const eventName = file.split('.')[0]

    bot.on(eventName, event.bind(null, bot))
  })
})

bot.login(process.env.BOT_TOKEN)

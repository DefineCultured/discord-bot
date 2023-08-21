import fs from 'fs'
import * as Discord from 'discord.js'
import 'dotenv/config'

import { IBot } from './interfaces'

const bot: IBot = new Discord.Client({ disableMentions: 'everyone' })
bot.commands = new Discord.Collection()

// Load commands
const fileRegex = new RegExp(/\.(js|ts)$/)
const generalCommands = fs.readdirSync(__dirname + '/commands').filter(file => fileRegex.test(file))

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
    if (!fileRegex.test(file)) return

    const event = require(__dirname + `/modules/events/${file}`)
    const eventName = file.split('.')[0]

    bot.on(eventName, event.bind(null, bot))
  })
})

bot.login(process.env.BOT_TOKEN)

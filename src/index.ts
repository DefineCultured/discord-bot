import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { Client, Collection, GatewayIntentBits } from "discord.js"
import "dotenv/config"

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
})
client.commands = new Collection()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const commandsPath = path.join(__dirname, "commands")
const fileExtension = __filename.endsWith(".js") ? ".js" : ".ts"
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter(file => file.endsWith(fileExtension))

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file)
  const command = await import(`file://${filePath}`)

  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command)
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    )
  }
}

const eventsPath = path.join(__dirname, "events")
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter(file => file.endsWith(fileExtension))

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file)
  const event = await import(`file://${filePath}`)
  const eventHandler = event.default

  if (eventHandler.once) {
    client.once(eventHandler.name, (...args) => eventHandler.execute(...args))
  } else {
    client.on(eventHandler.name, (...args) => eventHandler.execute(...args))
  }
}

client.login(process.env.BOT_TOKEN)

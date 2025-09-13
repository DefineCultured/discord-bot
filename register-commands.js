import fs from "node:fs"
import path from "node:path"
import { REST, Routes } from "discord.js"

const BOT_ID = "769760341022081045"
const GUILD_ID = undefined

const commands = []
const commandsPath = path.join(__dirname, "src", "commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".ts"))

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file)
  const command = require(filePath)

  if ("data" in command && "execute" in command) {
    commands.push(command.data.toJSON())
  } else {
    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
  }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.BOT_TOKEN)

// and deploy your commands!
;(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`)
    if (!GUILD_ID) {
      console.error("GUILD_ID is not set")
      return
    }

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(Routes.applicationGuildCommands(BOT_ID, GUILD_ID), {
      body: commands
    })

    console.log(`Successfully reloaded ${data.length} application (/) commands.`)
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error)
  }
})()

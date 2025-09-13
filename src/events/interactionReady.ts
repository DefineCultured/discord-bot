import { type BaseInteraction, Events, MessageFlags } from "discord.js"
import { config } from "../config"

export default {
  name: Events.InteractionCreate,
  async execute(interaction: BaseInteraction) {
    if (!interaction.isChatInputCommand()) return
    if (!interaction.inGuild()) return
    if (!config.permittedGuilds.includes(interaction.guild?.id ?? "")) return
    if (!config.permittedChannels.includes(interaction.channel?.id ?? ""))
      return
    if (!config.permittedUsers.includes(interaction.user.id)) return

    const command = interaction.client.commands.get(interaction.commandName)

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`)
      return
    }

    try {
      await command.execute(interaction)
    } catch (error) {
      console.error(error)
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "There was an error while executing this command!",
          flags: MessageFlags.Ephemeral
        })
      } else {
        await interaction.reply({
          content: "There was an error while executing this command!",
          flags: MessageFlags.Ephemeral
        })
      }
    }
  }
}

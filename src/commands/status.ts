import {
  type ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder
} from "discord.js"
import { version } from "../../package.json"

export const data = new SlashCommandBuilder()
  .setName("status")
  .setDescription("Show help embed.")

export const execute = async (interaction: ChatInputCommandInteraction) => {
  const statusEmbed = new EmbedBuilder()
    .setColor("#000000")
    .setAuthor({
      name: "Define Cultured",
      iconURL: "https://i.imgur.com/mVKllA1.jpg",
      url: "https://definecultured.com/"
    })
    .setThumbnail("https://i.imgur.com/mVKllA1.jpg")
    .addFields(
      {
        name: "Bot Latency",
        value: `${Date.now() - interaction.createdTimestamp}ms`
      },
      {
        name: "API Latency",
        value: `${Math.round(interaction.client.ws.ping)}ms`
      }
    )
    .setTimestamp()
    .setFooter({ text: `Define Cultured Bot v${version}` })

  await interaction.reply({ embeds: [statusEmbed] })
}

import {
  type ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder
} from "discord.js"
import { version } from "../../package.json"

export const data = new SlashCommandBuilder()
  .setName("help")
  .setDescription("Show help embed.")

export const execute = async (interaction: ChatInputCommandInteraction) => {
  await interaction.reply({ embeds: [helpEmbed] })
}

const helpEmbed = new EmbedBuilder()
  .setColor("#00FF00")
  .setAuthor({
    name: "Define Cultured",
    iconURL: "https://i.imgur.com/mVKllA1.jpg",
    url: "https://definecultured.com/"
  })
  .setThumbnail("https://i.imgur.com/mVKllA1.jpg")
  .addFields(
    { name: "!help", value: "Show this help embed." },
    {
      name: "!status",
      value: "Show bot status, latency, and other information."
    },
    {
      name: "!shorten <url> <keyword?>",
      value: "Shorten URL. Keyword is optional."
    }
  )
  .setTimestamp()
  .setFooter({ text: `Define Cultured Bot v${version}` })

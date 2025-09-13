import {
  type ChatInputCommandInteraction,
  SlashCommandBuilder
} from "discord.js"

import { codeBlock, isValidURL } from "../utils/helpers"
import UrlAPI from "../utils/UrlAPI"

export const data = new SlashCommandBuilder()
  .setName("shorten")
  .setDescription("Shorten a URL")
  .addStringOption(option =>
    option.setName("url").setDescription("The URL to shorten").setRequired(true)
  )
  .addStringOption(option =>
    option
      .setName("keyword")
      .setDescription("The keyword to use for the short URL")
      .setRequired(false)
  )

export const execute = async (interaction: ChatInputCommandInteraction) => {
  const url = interaction.options.getString("url")!
  const keyword = interaction.options.getString("keyword")

  if (!isValidURL(url)) {
    return interaction.reply({ content: "Invalid URL" })
  }

  const { data } = await UrlAPI.shorten(url, keyword)

  if (data.status === "fail") {
    return interaction.reply({ content: data.message })
  }

  const shorturl = codeBlock("js", data.shorturl, true)

  await interaction.reply({ content: `Created shorturl ${shorturl}` })
}

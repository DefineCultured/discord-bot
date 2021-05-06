import _ from 'lodash'
import { Message, MessageEmbed } from 'discord.js'

import config from '../../config.json'
import { IBot } from '../interfaces'
import { get } from '../utils/CryptoAPI'

import { withCommas } from '../utils/helpers'

module.exports.run = async (_bot: IBot, message: Message, args: any) => {
  if (!args.length) return message.channel.send('Missing symbol')

  try {
    const symbol = args[0].toString().toUpperCase().trim()
    const response = await get(symbol)

    if (!response.data) return message.channel.send(`No data found for ${symbol}`)

    const requestedSymbol = response.data.data[symbol]

    const stockEmbed = new MessageEmbed()
      .setColor('#00FF00')
      .setAuthor('Define Cultured', 'https://i.imgur.com/mVKllA1.jpg', 'https://definecultured.com/')
      .addField('Coin:', `${requestedSymbol.name}`, true)
      .addField('Symbol', `${requestedSymbol.symbol}`, true)
      .addField('Price', `$${withCommas(requestedSymbol.quote.USD.price.toFixed(2))}`, true)
      .addField('24h Change', `${Number(requestedSymbol.quote.USD.percent_change_24h).toFixed(2)}%`, true)
      .addField('7d Change', `${Number(requestedSymbol.quote.USD.percent_change_7d).toFixed(2)}%`, true)
      .setTimestamp()
      .setFooter(`Define Cultured Bot v${config.version}`)

    message.channel.send(stockEmbed)
  } catch (e) {
    console.error(e)
    return message.channel.send('Something went wrong..')
  }
}

module.exports.command = {
  name: 'crypto',
  alias: 'c'
}

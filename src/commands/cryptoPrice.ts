import { Message, MessageEmbed } from 'discord.js'

import { version } from '../../package.json'
import { IBot } from '../interfaces'
import CryptoAPI from '../utils/CryptoAPI'

import { prettyPrice } from '../utils/helpers'

module.exports.run = async (_bot: IBot, message: Message, args: any) => {
  if (!args.length) return message.channel.send('Missing symbol')

  try {
    const symbol = args[0].toString().toUpperCase().trim()
    const response = await CryptoAPI.get(symbol)

    if (!response.data) return message.channel.send(`No data found for ${symbol}`)

    const requestedSymbol = response.data.data[symbol]

    const stockEmbed = new MessageEmbed()
      .setColor('#00FF00')
      .setAuthor('Define Cultured', 'https://i.imgur.com/mVKllA1.jpg', 'https://definecultured.com/')
      .addField('Coin:', `${requestedSymbol.name}`, true)
      .addField('Symbol', `${requestedSymbol.symbol}`, true)
      .addField('Current Price', `$${prettyPrice(requestedSymbol.quote.USD.price)}`, true)
      .addField('1h Change', `${Number(requestedSymbol.quote.USD.percent_change_1h).toFixed(2)}%`, true)
      .addField('24h Change', `${Number(requestedSymbol.quote.USD.percent_change_24h).toFixed(2)}%`, true)
      .addField('7d Change', `${Number(requestedSymbol.quote.USD.percent_change_7d).toFixed(2)}%`, true)
      .setTimestamp()
      .setFooter(`Define Cultured Bot v${version}`)

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

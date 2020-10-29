import { PrismaClient } from '@prisma/client'
import NodeCache from 'node-cache'

import { Message } from 'discord.js'
import { Bot } from '../interfaces'

const cache = new NodeCache({ stdTTL: 1800 })

module.exports.run = async (_bot: Bot, message: Message, _args: any) => {
  const prisma = new PrismaClient()

  try {
    let emails: any
    const value = await cache.get('emails')

    if (value === undefined) {
      emails = await prisma.subscriptionEmail.count()
      cache.set('emails', emails)
    } else {
      emails = value
    }

    const actual = emails - 5
    message.channel.send(`${actual} emails on record.`)
  } catch (err) {
    console.error(err)
    throw err
  } finally {
    prisma.$disconnect()
  }
}

module.exports.command = {
  name: 'emails',
  alias: 'e'
}

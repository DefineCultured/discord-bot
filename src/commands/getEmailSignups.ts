import { PrismaClient } from '@prisma/client'
import { Message } from 'discord.js'

import { IBot } from '../interfaces'
import cache from '../utils/cache'

module.exports.run = async (_bot: IBot, message: Message, _args: any) => {
  const prisma = new PrismaClient()

  try {
    let emails: any
    const value = await cache.get('emails')

    if (value === undefined) {
      emails = await prisma.subscriptionEmail.count()
      await cache.set('emails', emails)
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

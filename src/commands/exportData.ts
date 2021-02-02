import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import { Message, MessageAttachment } from 'discord.js'

import { IBot } from '../interfaces'

const createCsvWriter = require('csv-writer').createObjectCsvWriter

const fileName = `export-${new Date().getTime()}`
const csvWriter = createCsvWriter({
  path: `src/exported_data/${fileName}.csv`,
  header: [
    { id: 'id', title: 'id' },
    { id: 'firstName', title: 'firstName' },
    { id: 'lastName', title: 'lastName' },
    { id: 'email', title: 'email' },
    { id: 'createdAt', title: 'createdAt' }
  ]
})

module.exports.run = async (_bot: IBot, message: Message, _args: any) => {
  const prisma = new PrismaClient()

  message.channel.startTyping()

  try {
    const data = await prisma.subscriptionEmail.findMany()
    await csvWriter.writeRecords(data).then(async () => {
      const attachment = new MessageAttachment(`src/exported_data/${fileName}.csv`)
      await message.channel.send(attachment)
      fs.unlink(`src/exported_data/${fileName}.csv`, err => {
        if (err) {
          console.error(err)
          throw err
        }
      })
    })
  } catch (err) {
    console.error(err)
    throw err
  } finally {
    prisma.$disconnect()
  }

  message.channel.stopTyping()
}

module.exports.command = {
  name: 'export'
}

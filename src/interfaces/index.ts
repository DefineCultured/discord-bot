import { Client } from 'discord.js'

export interface Bot extends Client {
  [key: string]: any;
}

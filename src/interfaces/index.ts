import { Client } from 'discord.js'

export interface IBot extends Client {
  [key: string]: any;
}

export interface ICache {
  [key: string]: any;
}

export interface IStock {
  [key: string]: any;
}

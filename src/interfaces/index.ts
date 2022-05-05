import { Client } from 'discord.js'

export type StrNum = string | number

export interface IBot extends Client {
  [key: string]: any;
}

export interface ICache {
  [key: string]: any;
}

export interface IStock {
  [key: string]: any;
}

export interface ICrypto {
  [key: string]: any;
}

export interface IURL {
  [key: string]: any;
}

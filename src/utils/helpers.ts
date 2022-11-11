import { StrNum } from '../interfaces'

export function withCommas(value: number): string {
  const parts = value.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

export function capitalize(value: string): string {
  return value[0].toUpperCase() + value.slice(1)
}

export function prettyPrice(value: StrNum): string {
  const underOne: boolean = String(value).startsWith('0.0')
  const fixedSum = Number(value).toFixed(underOne ? 4 : 2)
  return withCommas(Number(fixedSum))
}

export function codeBlock(language: string, code: string, inline = false): string {
  if (inline) {
    return `\`${code}\``
  }
  return `\`\`\`${language}\n${code}\`\`\``
}

export const URLRegex = /^[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&//=]*)$/

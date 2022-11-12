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

export function isValidURL(url: string): boolean {
  const urlPattern = new RegExp(
    '^(https?:\\/\\/)?' + // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  )
  return !!urlPattern.test(url)
}

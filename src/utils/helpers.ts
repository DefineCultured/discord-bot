import { StrNum } from '../interfaces'

export function withCommas(value: number): string {
  let parts = value.toString().split('.')
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

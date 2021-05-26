import { StrNum } from '../interfaces'

export function withCommas(number: number): string {
  let parts = number.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

export function capitalize(string: string): string {
  return string[0].toUpperCase() + string.slice(1)
}

export function prettyPrice(value: StrNum): string {
  const fixedSum = Number(value).toFixed(2)
  const commaSeperated = withCommas(Number(fixedSum))
  return commaSeperated
}

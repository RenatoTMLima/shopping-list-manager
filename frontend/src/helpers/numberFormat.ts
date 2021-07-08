export const numberFormat = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }).format(value)
}

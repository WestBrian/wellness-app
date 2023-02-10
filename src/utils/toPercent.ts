export const toPercent = (n: number, minimumFractionDigits = 0) => {
  return n.toLocaleString(undefined, {
    style: 'percent',
    minimumFractionDigits: minimumFractionDigits,
  })
}

export const determineTrend = (data: number[]) => {
  const diff: { [x: string]: number[] } = {
    increasing: [],
    decreasing: [],
    equals: [],
  }

  data.map((item, index, array) => {
    if (index > 0) {
      const difference = item - array[index - 1]

      if (difference === 0) diff.equals.push(difference)
      else if (difference > 0) diff.increasing.push(difference)
      else diff.decreasing.push(difference)
    }

    return item
  })

  if (diff.increasing.length > diff.decreasing.length + diff.equals.length)
    return 1
  if (diff.decreasing.length > diff.increasing.length + diff.equals.length)
    return -1
  if (diff.equals.length > diff.increasing.length + diff.decreasing.length)
    return 0

  return 0
}

import {Col} from '../col'

export function getMargin(margin, context) {
  const unitSize = context.lazuliLayout
    ? context.lazuliLayout.unitSize || 1
    : 1

  const defaultMargin = context.lazuliLayout
    ? context.lazuliLayout.defaultMargin || 1
    : 10

  return unitSize * (margin || defaultMargin)
}

export function areRowChildrenDynamic(children) {
  let isDynamic = true

  for (const child of children) {
    if (child && child.type === Col && child.props.xs) {
      isDynamic = false
      break
    }
  }

  return isDynamic
}

export function mapOverRowChildren(children, columns, iterator) {
  let currentX = 0
  let currentY = 0

  return children.map((child, index) => {
    const isColumn = child && child.type === Col

    const newChild = isColumn
      ? iterator(child, index, currentX, currentY)
      : child

    if (isColumn && child.props.xs) {
      currentX += child.props.xs

      if (currentX >= columns) {
        // wrap to next row, so reset X to 0
        currentX = 0
        currentY++
      }
    }

    return newChild
  })
}

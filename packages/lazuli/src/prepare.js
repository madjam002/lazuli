import invariant from 'invariant'
import normalize from 'react-style-normalizer'
import {Registry} from './registry'

function process(style) {
  if (typeof style === 'number') {
    return Registry.getByID(style)
  }

  const computedStyle = normalize(style)
  return computedStyle
}

export function prepare(styles) {
  if (!styles) {
    return undefined
  }

  invariant(
    styles !== true,
    'get(): style may be false but not true',
  )

  if (!Array.isArray(styles)) {
    return process(styles)
  }

  const result = {}
  styles.forEach(style => {
    const computedStyle = prepare(style)

    if (computedStyle) {
      Object.assign(result, computedStyle)
    }
  })

  return result
}

import invariant from 'invariant'
import normalize from 'react-style-normalizer'
import {Registry} from './registry'

export class StyleSheet {

  static create(config) {
    const result = {}

    for (const key in config) {
      if (process.env.NODE_ENV !== 'production') {
        invariant(
          typeof config[key] === 'object',
          'StyleSheet.create(): must be called with named styles.',
        )
      }

      const style = config[key]
      const computedStyle = normalize(style)

      result[key] = Registry.register(computedStyle)
    }

    return result
  }

}

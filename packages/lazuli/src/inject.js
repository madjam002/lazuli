import {prepare} from './prepare'

export function inject() {
  const ReactElement = require('react/lib/ReactElement')

  const {
    createElement,
  } = ReactElement

  ReactElement.createElement = function (type, config, ...children) {
    if (
      typeof type === 'string' &&
      config && config.style &&
      (
        Array.isArray(config.style) ||
        (typeof config.style === 'object' && !config.style.__lazuliPrepared) ||
        typeof config.style !== 'object'
      )
    ) {
      const newConfig = {
        ...config,
        style: prepare(config.style),
      }

      return createElement(type, newConfig, ...children)
    }

    return createElement(type, config, ...children)
  }
}

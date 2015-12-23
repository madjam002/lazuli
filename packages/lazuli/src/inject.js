import {prepare} from './prepare'

export function inject() {
  const ReactElement = require('react/lib/ReactElement')

  const {
    createElement,
  } = ReactElement

  ReactElement.createElement = function (type, config, ...children) {
    if (config && config.style) {
      const newConfig = {
        ...config,
        style: prepare(config.style),
      }

      return createElement(type, newConfig, ...children)
    }

    return createElement(type, config, ...children)
  }
}

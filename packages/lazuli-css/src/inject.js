import {Registry} from 'lazuli'
import flatten from 'flatten'
import classNames from './class-names'

function stylesToStylesAndClassNames(styleIn) {
  const styles = Array.isArray(styleIn) ? flatten(styleIn) : [styleIn]

  const style = []
  let className = ''
  let shortClassNames = ''
  let isBuildingClassNames = true

  styles.forEach((thisStyle, index) => {
    if (typeof thisStyle === 'number' && isBuildingClassNames) {
      const styleInRegistry = Registry.getByID(thisStyle)

      for (let i = 0; i <= index; i++) {
        if (i === 0) {
          className += classNames.getForStyle(styleInRegistry, thisStyle, i) + ' '
        } else {
          shortClassNames += classNames.getForStyle(styleInRegistry, thisStyle, i) + ' '
        }
      }
    } else {
      isBuildingClassNames = false
      style.push(thisStyle)
    }
  })

  className += shortClassNames

  return { style, className }
}

export function inject() {
  const ReactElement = require('react/lib/ReactElement')

  const {
    createElement,
  } = ReactElement

  ReactElement.createElement = function (type, config, ...children) {
    if (
      typeof type === 'string' &&
      config && config.style
    ) {
      const { style, className } = stylesToStylesAndClassNames(config.style)

      const newConfig = {
        ...config,
        style,
        className,
      }

      return createElement(type, newConfig, ...children)
    }

    return createElement(type, config, ...children)
  }
}

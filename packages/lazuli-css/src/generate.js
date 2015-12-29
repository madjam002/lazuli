import {Registry} from 'lazuli'
import hyphenateStyleName from 'hyphenate-style-name'
import {isUnitlessNumber} from 'react/lib/CSSProperty'
import classNames from './class-names'

const MAX = 10

export function generateCSS() {
  const styles = Registry.getAll()

  const processed = Object.keys(styles).map(styleKey => {
    const style = styles[styleKey]
    let css = ''

    for (const k in style) {
      let value = style[k]

      if (!isUnitlessNumber[k] && typeof value === 'number') {
        value += 'px'
      }

      css += hyphenateStyleName(k) + ':' + value + ';'
    }

    return {
      index: styleKey,
      style,
      css,
    }
  })

  let cssString = ''

  for (const processedStyle of processed) {
    const index = processedStyle.index

    for (let i = 1; i <= MAX; i++) {
      for (let x = 0; x < i; x++) {
        cssString += '.' + classNames.getForStyle(processedStyle.style, index, x)
      }

      if (i < MAX) {
        cssString += ','
      }
    }

    cssString += '{'
    cssString += processedStyle.css
    cssString += '}'
  }

  return cssString
}

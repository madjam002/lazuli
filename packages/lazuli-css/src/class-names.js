const RADIX = 36

const mappings = {}
let cssClassIndex = RADIX

export default {

  getForStyle(style, styleKey, priority) {
    if (!mappings[styleKey]) {
      mappings[styleKey] = {}
    }

    if (!mappings[styleKey][priority]) {
      if (priority === 0) {
        if (process.env.NODE_ENV === 'production') {
          mappings[styleKey][priority] = 'z' + (cssClassIndex++).toString(RADIX)
        } else {
          mappings[styleKey][priority] = style.__lazuliStyleName
            ? style.__lazuliStyleName + '-l' + styleKey
            : 'l' + styleKey
        }
      } else {
        mappings[styleKey][priority] = 'z' + (cssClassIndex++).toString(RADIX)
      }
    }

    return mappings[styleKey][priority]
  },

}

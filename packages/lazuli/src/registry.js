const styles = {}
let uniqueID = 1
const emptyStyle = {}

export class Registry {

  static register(style) {
    const id = ++uniqueID

    if (process.env.NODE_ENV !== 'production') {
      Object.freeze(style)
    }

    styles[id] = style

    return id
  }

  static getByID(id) {
    if (!id) {
      return emptyStyle
    }

    return styles[id] || emptyStyle
  }

  static getAll() {
    return styles
  }

}

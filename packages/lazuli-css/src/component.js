import React from 'react'
import {generateCSS} from './generate'

export class LazuliCSS extends React.Component {
  constructor(props) {
    super(props)

    this.state = { css: '' }
  }

  componentDidMount() {
    this.setState({ css: generateCSS() })
  }

  render() {
    const { css } = this.state

    return (
      <style type="text/css">{css}</style>
    )
  }
}

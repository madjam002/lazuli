import React, {PropTypes} from 'react'
import {StyleType} from 'lazuli'

import {View} from './view'
import {Row} from './row'
import * as util from './util/grid'

function calcWidth(size, columns) {
  if (!size) {
    return undefined
  }

  return `${(100 * size) / columns}%`
}

function renderChildren(reactChildren, margin) {
  const children = React.Children.toArray(reactChildren)
  const childCount = children.length

  return children.map((child, index) => {
    if (child && child.type && (
      child.type === Row ||
      child.type === Col ||
      child.type === View
    )) {
      const newStyle = {}

      if (index !== childCount - 1) {
        newStyle.marginBottom = child.props.marginSelf || margin
      }

      return React.cloneElement(child, {
        style: [newStyle, child.props.style],
      })
    }

    return child
  })
}

export function Col(props, context) {
  const width = calcWidth(props.xs, props.columns)

  const style = {
    flexBasis: width,
    maxWidth: width,
    flex: props.fill ? 1 : props.flex,
    alignItems: props.align,
    justifyContent: props.justify,
    alignSelf: props.alignSelf,
  }

  const margin = util.getMargin(props.margin, context)

  return (
    <View {... props} style={[style, props.style]}>
      {renderChildren(props.children, margin)}
    </View>
  )
}

Col.propTypes = {
  margin: PropTypes.number,
  style: StyleType,
  xs: PropTypes.number,
  flex: PropTypes.number,
  fill: PropTypes.bool,
  align: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'baseline', 'stretch']),
  alignSelf: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'baseline', 'stretch']),
  justify: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'baseline', 'stretch']),
  children: PropTypes.node,

  // Do not use - passed down from Row so the column can calculate its size.
  columns: PropTypes.number,
}

Col.defaultProps = {
  margin: null,
}

Col.contextTypes = {
  lazuliLayout: PropTypes.shape({
    unitSize: PropTypes.number,
    defaultMargin: PropTypes.number,
  }),
}

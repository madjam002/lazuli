import React, {PropTypes} from 'react'
import {StyleSheet, StyleType} from 'lazuli'
import * as util from './util/grid'

import {View} from './view'

function renderChildren(props, context) {
  const children = React.Children.toArray(props.children)
  const childCount = children.length

  const { columns } = props
  const margin = util.getMargin(props.margin, context)

  const isDynamic = util.areRowChildrenDynamic(children)

  return util.mapOverRowChildren(children, columns, (child, index, x, y) => {
    const newStyle = {}
    const calcMargin = margin
    const halfMargin = calcMargin / 2

    if (isDynamic) {
      if (index > 0) {
        // column is after the first one, add some left padding
        newStyle.paddingLeft = halfMargin
      }

      if (index < childCount - 1) {
        // column is before the last one, add some right padding
        newStyle.paddingRight = halfMargin
      }
    } else {
      const endX = x + child.props.xs

      if (x > 0) {
        // column is after the first one on each row, add some left padding
        newStyle.paddingLeft = halfMargin
      }

      if (endX < columns) {
        // column finishes before the end of the row, add some right padding
        newStyle.paddingRight = halfMargin
      }

      if (y > 0) {
        // not the first row, so add some top padding
        newStyle.paddingTop = calcMargin
      }
    }

    return React.cloneElement(child, {
      style: [newStyle, child.props.style],
      columns,
    })
  })
}

export function Row(props, context) {
  return (
    <View {... props} style={[styles.row, props.style]}>
      {renderChildren(props, context)}
    </View>
  )
}

Row.propTypes = {
  style: StyleType,
  align: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'baseline', 'stretch']),
  justify: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'baseline', 'stretch']),
  margin: PropTypes.number,
  children: PropTypes.node,
  columns: PropTypes.number,
}

Row.defaultProps = {
  columns: 12,
  margin: null,
}

Row.contextTypes = {
  lazuliLayout: PropTypes.shape({
    unitSize: PropTypes.number,
    defaultMargin: PropTypes.number,
  }),
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})

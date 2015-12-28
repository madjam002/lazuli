import {PropTypes} from 'react'

export const StyleType = PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.array,
  PropTypes.number,
])

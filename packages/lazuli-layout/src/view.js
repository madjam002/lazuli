import React from 'react'
import {StyleSheet, prepare} from 'lazuli'

export function View(props) {
  return (
    <div {... props} style={prepare([styles.view, props.style])}>
      {props.children}
    </div>
  )
}

const styles = StyleSheet.create({
  view: {
    boxSizing: 'border-box',
    position: 'relative',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    flexShrink: 0,
    alignContent: 'flex-start',

    border: '0 solid black',
    margin: 0,
    padding: 0,
  },
})

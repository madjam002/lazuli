import React from 'react'
import {StyleSheet} from 'lazuli'

import {View} from './view'

export function Row(props) {
  return (
    <View {... props} style={[styles.row, props.style]}>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
})

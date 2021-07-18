import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import NotificationCard from '../components/notification-card'
import { Theme } from '@common/theme'

const NormalNotification = () => {
  return (
    <View style={styles.root}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={styles.list}
        data={[0, 1, 2, 3, 4, 5, 7, 6]}
        renderItem={({ item, index }) => <NotificationCard index={index} />}
        ListFooterComponent={() => <View style={{ paddingBottom: 30 }}></View>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}

export default NormalNotification

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Theme.backgrounds.white,
  },
})

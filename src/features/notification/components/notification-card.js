import { Theme, WidthScreen } from '@src/common/theme'
import React from 'react'
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native'

const NotificationCard = ({ index, styleCard = {}, onDetail, ...props }) => {
  console.log(`index`, index)
  return (
    <View
      style={[
        styles.root,
        index % 2 === 1 ? { backgroundColor: Theme.colors.lineBorder } : {},
      ]}
    >
      <TouchableHighlight
        activeOpacity={0.4}
        style={{ flex: 1 }}
        underlayColor={
          index % 2 === 1 ? Theme.colors.lineBorder : Theme.backgrounds.white
        }
        onPress={() => console.log('go to detail info')}
      >
        <View style={styles.touchable}>
          <View
            style={[
              styles.left,
              // {
              //   backgroundColor:
              //     index % 2 !== 0
              //       ? Theme.colors.activeGray
              //       : Theme.backgrounds.white,
              // },
            ]}
          >
            <ImageBackground
              source={{
                uri:
                  'https://www.thewrap.com/wp-content/uploads/2018/12/Captain-Marvel-Second-Poster-Crop.jpg',
              }}
              style={{
                flex: 1,
                marginVertical: 4,
              }}
              imageStyle={{
                resizeMode: 'contain',
                borderRadius: 10,
              }}
            />
          </View>
          <View
            style={[
              styles.center,
              // {
              //   backgroundColor:
              //     index % 2 !== 0
              //       ? Theme.colors.activeGray
              //       : Theme.backgrounds.white,
              // },
            ]}
          >
            <View style={styles.content}>
              <Text style={styles.name} numberOfLines={2}>
                Siêu ưu đãi sập sàn với các sản phẩm 99%
              </Text>
              {/* <Text style={styles.name}>20.000.000đ</Text> */}
            </View>
            <View
              style={[
                styles.content,
                { flex: 1, justifyContent: 'flex-start' },
              ]}
            >
              <Text style={styles.description} numberOfLines={1}>
                Hôm nay em có gì nào, em có gì nào ?
              </Text>
              {/* <Text style={styles.tiny}>2.7%</Text> */}
            </View>
            <View style={styles.content}>
              <Text style={styles.date}>21/12/2021</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  )
}

export default NotificationCard

const styles = StyleSheet.create({
  root: {
    // width: '100%',
    height: 100,
    flexDirection: 'row',
    paddingHorizontal: 4,
    marginHorizontal: 8,
    paddingVertical: 8,
    // borderWidth: 0.5,
    // borderColor: Theme.colors.lineBorder,
    borderRadius: 15,
  },
  touchable: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
  },
  left: {
    flex: 0.25,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  center: {
    flex: 0.75,
    paddingHorizontal: 4,
    paddingLeft: 16,
    justifyContent: 'space-between',
  },
  content: {
    // flexDirection: 'row',
    justifyContent: 'center',
  },
  name: {
    fontFamily: Theme.fontFamily.QuicksandBold,
    fontSize: 15,
  },
  description: {
    fontFamily: Theme.fontFamily.ComfortaaMedium,
    fontSize: Theme.size.small,
    color: Theme.colors.notGray,
  },
  date: {
    fontFamily: Theme.fontFamily.QuicksandMedium,
    fontSize: Theme.size.small,
    color: Theme.colors.lightGreyColor,
  },
})

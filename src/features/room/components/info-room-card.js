import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight, Image} from 'react-native';
import {Theme, WidthScreen, Source} from '@common/theme';
import ShowLoading from '@src/components/show-loading';
import {TypeLoading} from '@src/constants/loading.type';
import {useWebSockets} from '@src/features/socket-io-client/modules/use-web-socket';

const InfoRoomCard = ({onCard, item, ...props}) => {
  useWebSockets({
    userId: 'abc',
    enabled: !!item.keyRoom,
    room: !!item.keyRoom ? item.keyRoom : null,
  });

  return (
    <View style={styles.root}>
      <TouchableHighlight
        activeOpacity={0.4}
        style={{flex: 1}}
        underlayColor={Theme.backgrounds.white}
        onPress={() => onCard()}>
        <View style={styles.touchable}>
          <View style={[styles.left]}>
            <Image
              source={Source.Logo}
              style={{
                height: 60,
                width: 60,
              }}
              imageStyle={{
                borderRadius: 10,
              }}
            />
          </View>
          <View style={[styles.center]}>
            <View style={styles.infoItemContainer}>
              <Text style={styles.title} numberOfLines={1}>
                Đơn vị tổ chức:{'  '}
              </Text>
              <Text style={styles.value} numberOfLines={1}>
                {item.name}
              </Text>
            </View>
            <View style={styles.infoItemContainer}>
              <Text style={styles.title} numberOfLines={1}>
                Số thứ tự hiện tại:{'  '}
              </Text>
              <Text style={styles.value} numberOfLines={1}>
                {item.currentNumber}
              </Text>
              <ShowLoading
                type={TypeLoading.dot}
                height={10}
                styleRoot={styles.dot}
              />
            </View>
            <View style={styles.infoItemContainer}>
              <Text style={styles.title} numberOfLines={1}>
                Tổng thành viên :{'  '}
              </Text>
              <Text style={styles.value} numberOfLines={1}>
                {item.memberTotal}
              </Text>
              <ShowLoading
                type={TypeLoading.dot}
                height={10}
                styleRoot={styles.dot}
              />
            </View>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default InfoRoomCard;

const styles = StyleSheet.create({
  root: {
    // width: WidthScreen,
    height: 100,
    flexDirection: 'row',
    paddingHorizontal: 4,
    marginBottom: 8,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: Theme.colors.lineBorder,
    borderRadius: 10,
  },
  touchable: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
  },
  left: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  center: {
    flex: 1,
    paddingHorizontal: 4,
    justifyContent: 'space-between',
  },
  infoItemContainer: {
    flexDirection: 'row',
  },
  title: {
    fontFamily: Theme.fontFamily.QuicksandSemiBold,
    fontSize: Theme.size.normal,
  },
  value: {
    fontFamily: Theme.fontFamily.QuicksandBold,
    fontSize: Theme.size.normal,
  },
  dot: {
    justifyContent: 'flex-end',
    opacity: 0.3,
  },
});

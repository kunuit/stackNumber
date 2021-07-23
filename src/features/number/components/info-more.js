import {showToast} from '@src/common/layout/toast.helper';
import {Theme} from '@src/common/theme';
import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {pickerNumberWithCondition} from '@src/modules/utils';

const InfoMore = ({onMore}) => {
  return (
    <View style={styles.root}>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() =>
            showToast({
              message: 'Tính nằng đang phát triển',
              title: 'Thông báo',
              type: 'info',
            })
          }>
          <View>
            <Image
              source={require('@src/assets/images/icons/number-yin-yang.png')}
              style={{width: 50, height: 50, resizeMode: 'contain'}}
            />
          </View>
        </TouchableOpacity>
        <Text style={styles.yinYang}>số phong thuỷ</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() => {
            showToast({
              message: 'Tính nằng đang phát triển',
              title: 'Thông báo',
              type: 'info',
            });
          }}>
          <View>
            <Image
              source={require('@src/assets/images/icons/color-yin-yang.png')}
              style={{width: 50, height: 50, resizeMode: 'contain'}}
            />
          </View>
        </TouchableOpacity>
        <Text style={styles.yinYang}>màu phong thuỷ</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={
            () =>
              showToast({
                message: 'Tính nằng đang phát triển',
                title: 'Thông báo',
                type: 'info',
              })
            // onMore
          }>
          <View style={styles.more}>
            <View style={styles.moreIcon}>
              <Icon name="more-horiz" size={25} />
            </View>
          </View>
        </TouchableOpacity>
        <Text style={styles.yinYang}>thêm nữa</Text>
      </View>
    </View>
  );
};

export default InfoMore;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  more: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreIcon: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.lineBorder,
  },
  yinYang: {
    fontFamily: Theme.fontFamily.QuicksandMedium,
    fontSize: Theme.size.small,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

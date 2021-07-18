import {Source, Theme} from '@src/common/theme';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import ShowLoading from './show-loading';
import {TypeLoading} from '@src/constants/loading.type';

/**
 *
 * @param {style: Object, text: String, ...props: others} param0
 * @returns
 */

const EmptyValue = ({style, text, ...props}) => {
  return (
    <View style={[styles.root, style]}>
      {/* <Image source={Source.Logo} style={styles.png} /> */}
      <ShowLoading type={TypeLoading.stack} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default EmptyValue;

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  png: {
    height: 35,
    width: 35,
  },
  text: {
    opacity: 0.5,
    fontSize: Theme.size.normal,
    marginTop: 10,
    fontFamily: Theme.fontFamily.QuicksandSemiBold,
  },
});

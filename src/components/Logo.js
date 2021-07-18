import React, {memo} from 'react';
import {Image, StyleSheet} from 'react-native';
import {Source} from '@src/common/theme';

const Logo = ({style, ...props}) => (
  <Image source={Source.Logo} style={[styles.image, style]} />
);

const styles = StyleSheet.create({
  image: {
    width: 128,
    height: 128,
    marginTop: 20,
    marginBottom: 20,
  },
});

export default memo(Logo);

import {TypeLoading} from '@src/constants/loading.type';
import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {Source, Theme} from '@src/common/theme';

const ShowLoading = ({
  type,
  styleRoot,
  colorLoading = Theme.colors.secondary,
  height = 30,
  ...props
}) => {
  return (
    <View style={[styles.root, styleRoot]}>
      {type === TypeLoading.normal && (
        <ActivityIndicator
          animating={true}
          color={colorLoading}
          size={21}
          style={{height}}
        />
      )}

      {type === TypeLoading.truck && (
        <LottieView source={Source.Truck} style={{height}} autoPlay loop />
      )}
      {type === TypeLoading.counter && (
        <LottieView source={Source.Counter} style={{height}} autoPlay loop />
      )}
      {type === TypeLoading.stack && (
        <LottieView source={Source.Stack} style={{height}} autoPlay loop />
      )}
      {type === TypeLoading.dot && (
        <LottieView source={Source.Dot} style={{height}} autoPlay loop />
      )}
    </View>
  );
};

export default ShowLoading;

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

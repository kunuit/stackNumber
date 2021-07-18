import {Theme} from '@src/common/theme';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';

const TopContent = () => {
  return (
    <View style={styles.root}>
      <Text style={styles.centerText}>Quét qr code để lấy số thứ tự</Text>
      <View style={styles.lottie}>
        <LottieView
          source={require('@src/assets/images/down.json')}
          style={{
            height: 35,
          }}
          speed={0.4}
          autoPlay
          loop
        />
      </View>
    </View>
  );
};

export default TopContent;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  centerText: {
    color: Theme.colors.secondary,
    fontSize: 20,
    paddingTop: 50,
    fontFamily: Theme.fontFamily.QuicksandSemiBold,
  },
  lottie: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {Theme} from '@src/common/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BottomContent = ({
  isLight,
  onPressLight,
  onPressCamera,
  onNavigateEnterCode,
}) => {
  return (
    <View style={styles.root}>
      <View style={styles.rootCamera}>
        <View style={styles.icon}>
          <TouchableOpacity onPress={onPressLight}>
            <Icon
              name={isLight ? 'lightbulb-on-outline' : 'lightbulb-outline'}
              size={22}
              color={Theme.colors.secondary}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.buttonTouchable}>
          <LottieView
            source={require('@src/assets/images/qr-code.json')}
            style={{
              height: 35,
            }}
            speed={0.4}
            autoPlay
            loop
          />
        </TouchableOpacity>
        <View style={styles.icon}>
          <TouchableOpacity onPress={onPressCamera}>
            <Icon
              name="rotate-3d-variant"
              size={22}
              color={Theme.colors.secondary}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.codeContainer}>
        <TouchableOpacity onPress={onNavigateEnterCode}>
          <View style={styles.btn}>
            <Text style={styles.text}>Nhập code</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomContent;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    marginTop: 60,
    backgroundColor: Theme.backgrounds.white,
  },
  rootCamera: {
    flexDirection: 'row',
    width: '100%',
    // backgroundColor: 'red',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonTouchable: {
    padding: 16,
  },
  icon: {
    backgroundColor: Theme.colors.lightGreyColor,
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  btn: {
    backgroundColor: Theme.colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 15,
  },
  text: {
    fontFamily: Theme.fontFamily.QuicksandSemiBold,
    color: Theme.colors.secondary,
  },
});

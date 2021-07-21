import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {Theme, Source} from '@common/theme';
import {useNavigation} from '@react-navigation/native';
import {Router} from '@src/navigation/router';

const SplashScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.root}>
      <View style={{flex: 0.4}}>
        <LottieView
          source={Source.Splash}
          style={
            {
              // height: 35,
            }
          }
          speed={0.4}
          autoPlay
          loop
        />
      </View>
      <View style={{flex: 0.3, alignItems: 'center', paddingHorizontal: 20}}>
        <Text style={styles.title}>Your number - Your choose!</Text>
      </View>
      <View
        style={{
          flex: 0.3,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 20,
        }}>
        <LottieView
          source={Source.LoadSplash}
          style={{
            height: 100,
          }}
          speed={1.3}
          autoPlay
          loop={false}
          onAnimationFinish={() => navigation.replace(Router.BottomTabBar)}
        />
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Theme.backgrounds.white,
  },
  title: {
    fontFamily: Theme.fontFamily.QuicksandSemiBold,
    fontSize: Theme.size.large,
    color: Theme.colors.primary,
    textAlign: 'center',
  },
});

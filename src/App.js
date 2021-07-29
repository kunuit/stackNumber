/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {Theme} from '@common/theme';
import LottieView from 'lottie-react-native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  BackHandler,
  ToastAndroid,
  Alert,
  Text,
  useColorScheme,
  Animated,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

import {store, persistor} from './state/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './navigation/index';
import {useDispatch} from 'react-redux';
import {fcmService} from './features/notification/modules/push-notification/FCM-service';
import {useSelector} from 'react-redux';
import {typeAuths} from './features/auth/redux/auth.type';
import {TypeNumber} from './features/number/redux/number.type';
import {TypeRoom} from './features/room/redux/room.type';
import {TouchableOpacity} from 'react-native';
import {WidthScreen} from '@common/theme';
import {Platform} from 'react-native';
import {ActionLoading} from './constants/loading.type';

const App = () => {
  const dispatch = useDispatch();
  const {isLogin, token} = useSelector(state => state.auth);
  let currentCount = 0;

  useEffect(() => {
    if (isLogin) {
      dispatch({
        type: typeAuths.initAuth,
        payload: {
          token,
        },
      });

      dispatch({
        type: TypeNumber.getAllMyNumber,
        payload: {
          actionLoading: ActionLoading.fetching,
        },
      });
    }

    const backAction = () => {
      if (Platform.OS === 'ios') return;

      if (currentCount < 1) {
        currentCount += 1;
        ToastAndroid.showWithGravityAndOffset(
          'Back to exit!',
          1300,
          // ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          0,
          50,
        );
      } else {
        BackHandler.exitApp();
      }
      setTimeout(() => {
        currentCount = 0;
      }, 2000);

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      console.log('app unRegister');
      fcmService.unRegister();
      backHandler.remove();
    };
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: Theme.backgrounds.white}}>
      <StatusBar
        animated={true}
        backgroundColor={Theme.backgrounds.white}
        // translucent={true}
        barStyle="dark-content"
        showHideTransition="fade"
        // hidden={true}
      />
      <AppNavigation />

      <Toast ref={ref => Toast.setRef(ref)} />
    </View>
  );
};

export default () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  animatedView: {
    width: WidthScreen,
    backgroundColor: '#0a5386',
    elevation: 2,
    position: 'absolute',
    bottom: 0,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  exitTitleText: {
    textAlign: 'center',
    color: '#ffffff',
    marginRight: 10,
  },
  exitText: {
    color: '#e5933a',
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
});

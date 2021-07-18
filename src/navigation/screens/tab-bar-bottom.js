import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HeightScreen, Theme} from '@src/common/theme';
import Icon from 'react-native-vector-icons/AntDesign';
import TabBarIcon from '../components/tab-bar-icon';
import {Router} from '../router';
import {ScanQrCode} from '@features/scan-qr-code/screens';
import {Number} from '@features/number/screens';
import LottieView from 'lottie-react-native';
import {localNotificationService} from '@features/notification/modules/push-notification/local-notification-service';
import {fcmService} from '@features/notification/modules/push-notification/FCM-service';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {Profile, HomeAuth, Login} from '@features/auth/screens';
import {typeAuths} from '../../features/auth/redux/auth.type';

const Tab = createBottomTabNavigator();

const TabBarBottom = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {isLogin} = useSelector(state => state.auth);

  useEffect(() => {
    localNotificationService.configure(onOpenNotificationLocal);
    localNotificationService.createChanel();

    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);

    function onRegister(token) {
      console.log(`[App] onRegister: `, token);

      dispatch({
        type: typeAuths.changeFields,
        payload: {
          changeFields: {
            firebaseRegisterToken: token,
          },
        },
      });
    }

    function onNotification(notify) {
      console.log(`notify: `, notify);
      const opts = {
        soundName: 'default',
        playSound: true,
      };

      if (notify.type === 'increase number') {
        console.log('change current number');
        return;
      }
      // localNotificationService.showNotification(
      //   '1',
      //   notify.title,
      //   notify.body,
      //   notify,
      //   opts,
      // );
    }

    // // when remote
    function onOpenNotificationLocal(notify) {
      console.log(`onOpenNotify local`, notify);

      console.log(
        `notify.google, notify['google.message_id']`,
        notify.google,
        notify['google.message_id'],
      );
      if (!!notify.item || !!notify['google.message_id']) {
        navigation.navigate(Router.Notification, notify.topic);
      }
    }

    // when local
    function onOpenNotification(notify) {
      console.log(`onOpenNotify `, notify);
      // if (!!notify.item) {
      //   navigation.navigate(Router.Notification, notify.topic)
      // }
    }

    fcmService.getToken();
  }, []);

  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        iconStyle: {
          width: 100,
        },
        style: {
          backgroundColor: Theme.backgrounds.white,
          paddingBottom: 15,
          paddingVertical: 10,
          height: HeightScreen * 0.09,
          borderTopEndRadius: 25,
          borderTopStartRadius: 25,
          position: 'absolute',
          paddingHorizontal: 8,
          shadowOpacity: 0.15,
        },
        showIcon: true,
        showLabel: false,
      }}>
      <Tab.Screen
        name={Router.Number}
        component={Number}
        showIcon={true}
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarIcon name={Router.Number} focused={focused} />
          ),

          // tabBarVisible: false,
        }}
      />
      {/* <Tab.Screen
        name={Router.Explore}
        component={DetailsScreen}
        showIcon={true}
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarIcon name={Router.Explore} focused={focused} />
          ),
        }}
      /> */}
      <Tab.Screen
        name={Router.ScanQrCode}
        component={isLogin ? ScanQrCode : Login}
        showIcon={true}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                backgroundColor: Theme.backgrounds.grayPaper,
                borderRadius: 15,
                height: 50,
                width: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <LottieView
                source={require('@src/assets/images/qr-code.json')}
                style={{
                  height: 35,
                }}
                speed={0.4}
                autoPlay
                loop
              />
            </View>
          ),
          tabBarVisible: false,
        }}
      />
      {/* <Tab.Screen
        name={Router.Heart}
        component={HomeAuth}
        showIcon={true}
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarIcon name={Router.Heart} focused={focused} />
          ),
        }}
      /> */}
      <Tab.Screen
        name={Router.Profile}
        component={isLogin ? Profile : HomeAuth}
        showIcon={true}
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarIcon name={Router.Profile} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabBarBottom;

const styles = StyleSheet.create({});

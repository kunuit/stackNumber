import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import TabBarBottom from './screens/tab-bar-bottom';
import {Router} from './router';
import {
  Login,
  Register,
  HomeAuth,
  ForgotPassword,
} from '@features/auth/screens';

import {Notification} from '@features/notification/screens';

import {QrCodeGeneratorScreen} from '@features/room/screens';

import {MyNumberList} from '@features/number/screens';

import {CreateRoomScreen, ListMyRoom} from '@features/room/screens';

import {EnterCode} from '@features/scan-qr-code/screens';
import {SplashScreen} from '@features/splash/screens';

const Stack = createStackNavigator();

const configTabOther = {
  animation: 'timing',
  config: {
    duration: 300,
  },
};

const AppNavigation = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name={Router.SplashScreen} component={SplashScreen} />

      <Stack.Screen name={Router.BottomTabBar} component={TabBarBottom} />

      {[
        {name: Router.Login, component: Login},
        {name: Router.Register, component: Register},
        {name: Router.ForgotPassword, component: ForgotPassword},
        {name: Router.EnterCode, component: EnterCode},
        // number
        {name: Router.Notification, component: Notification},
        {name: Router.MyNumberList, component: MyNumberList},
        // room
        {name: Router.QrCodeGeneratorScreen, component: QrCodeGeneratorScreen},
        {name: Router.CreateRoomScreen, component: CreateRoomScreen},
        {name: Router.ListMyRoom, component: ListMyRoom},
      ].map(stack => {
        return (
          <Stack.Screen
            key={stack.name}
            name={stack.name}
            component={stack.component}
            options={{
              transitionSpec: {
                open: configTabOther,
                close: configTabOther,
              },
            }}
          />
        );
      })}
    </Stack.Navigator>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({});

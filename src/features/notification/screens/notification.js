import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import NormalNotification from './normal.notification';
import DiscountNotification from './discount.notification';
import {Router} from '@src/navigation/router';
import {Theme, WidthScreen} from '@common/theme';
import {useRoute} from '@react-navigation/native';
import Header from '@src/components/header';

const TabTop = createMaterialTopTabNavigator();

const Notification = () => {
  const {params} = useRoute();
  console.log(`params`, params, params === Router.DiscountNotification);
  return (
    <View style={styles.root}>
      <Header
        title="Thông báo"
        styleRoot={styles.rootHeader}
        isBack={true}
        isRight={false}
      />
      <View style={styles.main}>
        <TabTop.Navigator
          initialRouteName={
            params === Router.DiscountNotification
              ? Router.DiscountNotification
              : Router.NormalNotification
          }
          tabBarOptions={{
            scrollEnabled: true,
            activeTintColor: Theme.colors.primary,
            labelStyle: {
              fontSize: 13,
              fontFamily: Theme.fontFamily.QuicksandBold,
              textTransform: 'none',
            },
            tabStyle: {width: WidthScreen / 2},
            indicatorStyle: {
              borderColor: Theme.colors.primary,
              borderWidth: 1,
              elevation: 0,
            },
          }}>
          <TabTop.Screen
            name={Router.NormalNotification}
            component={NormalNotification}
          />
          <TabTop.Screen
            name={Router.DiscountNotification}
            component={DiscountNotification}
          />
        </TabTop.Navigator>
      </View>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Theme.backgrounds.white,
  },
  main: {
    flex: 1,
    paddingTop: 60,
  },
});

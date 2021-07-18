import {Theme} from '@src/common/theme';
import React from 'react';
import {StyleSheet, Text, View, FlatList, Platform} from 'react-native';
import ButtonLogOut from '../../components/profile.component/ButtonLogOut';
import InfoCard from '../../components/profile.component/info-card';
import InfoProfile from '../../components/profile.component/info-profile';
import {useDispatch} from 'react-redux';
import {typeAuths} from '../../redux/auth.type';

const Profile = () => {
  const dispatch = useDispatch();
  const arrInfoCard = [
    {nameIcon: 'basket-outline', name: 'Quản lý danh sách'},
    {nameIcon: 'newspaper-outline', name: 'Thông tin cá nhân'},
    {nameIcon: 'ios-card-outline', name: 'Phương thức thanh toán'},
    {nameIcon: 'ios-help-circle-outline', name: 'Help'},
    {nameIcon: 'ios-alert-circle-outline', name: 'About'},
  ];

  return (
    <View style={styles.root}>
      <FlatList
        data={arrInfoCard}
        renderItem={({item}) => {
          return <InfoCard nameIcon={item.nameIcon} name={item.name} />;
        }}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={InfoProfile}
        ListFooterComponent={
          <ButtonLogOut onPress={() => dispatch({type: typeAuths.logout})} />
        }
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: Theme.backgrounds.white,
    paddingTop: Platform.OS === 'ios' ? 44 : 0,
  },
});

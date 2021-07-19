import React, {useState} from 'react';
import {StyleSheet, Text, View, FlatList, RefreshControl} from 'react-native';
import Header from '@components/header';
import {Theme, HeightScreen} from '@common/theme';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import InfoRoomCard from '../../components/info-room-card';
import EmptyValue from '@components/empty-value';
import {Router} from '@src/navigation/router';
import {TypeRoom} from '../../redux/room.type';

const ListMyRoom = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {showLoading, rooms} = useSelector(state => state.room);

  const [refreshing, setRefreshing] = useState(false);

  const _onRefresh = () => {
    dispatch({
      type: TypeRoom.getAllMyRoom,
    });
  };

  const _onPickNumber = item => {
    console.log(`item`, item);

    navigation.navigate(Router.QrCodeGeneratorScreen, {
      id: item._id,
    });
  };
  return (
    <View style={styles.root}>
      <Header isBack title="Phòngs" />
      <View style={styles.main}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
          }
          data={[...Object.values(!!rooms ? rooms.list : {})]}
          renderItem={({item, index}) => (
            <InfoRoomCard item={item} onCard={() => _onPickNumber(item)} />
          )}
          ListEmptyComponent={
            <View
              style={{
                paddingTop: HeightScreen / 4,
              }}>
              <EmptyValue text="Bạn khum có phòng lào nhé!" />
            </View>
          }
          ListFooterComponent={() => <View style={{paddingBottom: 30}}></View>}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default ListMyRoom;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Theme.backgrounds.white,
  },
  main: {
    paddingTop: 70,
    flex: 1,
  },
  list: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import Header from '@components/header';
import {Theme, HeightScreen} from '@common/theme';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import InfoRoomCard from '../../components/info-room-card';
import EmptyValue from '@components/empty-value';
import {Router} from '@src/navigation/router';
import {TypeRoom} from '../../redux/room.type';
import {ActionLoading} from '@src/constants/loading.type';
import {NumberCardLoader} from '../../../../components/loader/card.loader';
import Icon from 'react-native-vector-icons/FontAwesome';
import {showToast} from '@src/common/layout/toast.helper';

const ListMyRoom = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {showLoading, rooms, actionLoading, errorIncreaseNumber} = useSelector(
    state => state.room,
  );
  const {pagination} = rooms;

  const [refreshing, setRefreshing] = useState(false);
  const [sort, setSort] = useState(1);

  useEffect(() => {
    if (errorIncreaseNumber) {
      showToast({
        title: 'Tăng số thứ tự',
        message: errorIncreaseNumber,
        type: 'error',
      });
      dispatch({
        type: TypeRoom.changeFields,
        payload: {
          changeFields: {
            errorIncreaseNumber: null,
          },
        },
      });
    }
  }, [errorIncreaseNumber]);

  const _onRefresh = () => {
    dispatch({
      type: TypeRoom.getAllMyRoom,
      payload: {
        actionLoading: ActionLoading.fetching,
      },
    });
    setSort(1);
  };

  const _onSort = () => {
    dispatch({
      type: TypeRoom.getAllMyRoom,
      payload: {
        actionLoading: ActionLoading.fetching,
        sort: sort === -1 ? 1 : -1,
      },
    });
    setSort(sort === -1 ? 1 : -1);
  };

  const _onPickNumber = item => {
    console.log(`item`, item);

    navigation.navigate(Router.DashboardRoomScreen, {
      id: item._id,
    });
  };
  return (
    <View style={styles.root}>
      <Header isBack title="Phòngs" />
      <View style={styles.main}>
        <View style={styles.barContainer}>
          <Text>search</Text>
          <TouchableOpacity onPress={_onSort}>
            <View style={styles.sortContainer}>
              <Icon name="sort" />
              <Text style={styles.barText}>Sort </Text>
            </View>
          </TouchableOpacity>
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
          }
          data={[
            ...Object.values(
              showLoading && actionLoading === ActionLoading.fetching
                ? {}
                : !!rooms
                ? rooms.list
                : {},
            ),
            ...new Array(
              showLoading && actionLoading === ActionLoading.fetching
                ? 8
                : showLoading && actionLoading === ActionLoading.loadMore
                ? 4
                : 0,
            ).fill({
              type: ActionLoading.loading,
            }),
          ]}
          renderItem={({item, index}) => {
            if (item.type === ActionLoading.loading) {
              return <NumberCardLoader />;
            }
            if (item.type !== ActionLoading.loading)
              return (
                <InfoRoomCard item={item} onCard={() => _onPickNumber(item)} />
              );
          }}
          ListEmptyComponent={
            <View
              style={{
                paddingTop: HeightScreen / 4,
              }}>
              <EmptyValue text="Bạn khum có phòng lào nhé!" />
            </View>
          }
          keyExtractor={(item, index) => index.toString()}
          onEndReached={() => {
            if (pagination.total / pagination.limit > pagination.current) {
              dispatch({
                type: TypeRoom.getAllMyRoom,
                payload: {
                  actionLoading: ActionLoading.loadMore,
                  sort,
                },
              });
            }
          }}
          onEndReachedThreshold={0.001}
          ListFooterComponent={() => <View style={{paddingBottom: 30}}></View>}
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
    paddingTop: 65,
    flex: 1,
  },
  list: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  barContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    paddingHorizontal: 18,
    borderBottomWidth: 1.5,
    borderBottomColor: Theme.colors.lineBorder,
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  barText: {
    paddingLeft: 4,
    fontFamily: Theme.fontFamily.QuicksandMedium,
    fontSize: Theme.size.normal,
  },
});

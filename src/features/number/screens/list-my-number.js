import Header from '@src/components/header';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import InfoNumberCard from '../components/info-number-card';
import {Theme, HeightScreen} from '@common/theme';
import {useSelector, useDispatch} from 'react-redux';
import {TypeNumber} from '../redux/number.type';
import {useNavigation} from '@react-navigation/native';
import EmptyValue from '@src/components/empty-value';
import {ActionLoading} from '@src/constants/loading.type';
import {NumberCardLoader} from '../../../components/loader/card.loader';
import Icon from 'react-native-vector-icons/FontAwesome';

const MyNumberList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {showLoading, myNumbers, actionLoading} = useSelector(
    state => state.number,
  );

  const {pagination} = myNumbers;

  const [refreshing, setRefreshing] = useState(false);
  const [sort, setSort] = useState(1);

  const _onRefresh = () => {
    dispatch({
      type: TypeNumber.getAllMyNumber,
      payload: {
        actionLoading: ActionLoading.fetching,
      },
    });
    setSort(1);
  };

  const _onPickNumber = item => {
    console.log(`item`, item);
    dispatch({
      type: TypeNumber.changeFields,
      payload: {
        changeFields: {
          pickerNumber: item,
        },
      },
    });
    navigation.goBack();
  };

  const _onSort = () => {
    dispatch({
      type: TypeNumber.getAllMyNumber,
      payload: {
        actionLoading: ActionLoading.fetching,
        sort: sort === -1 ? 1 : -1,
      },
    });
    setSort(sort === -1 ? 1 : -1);
  };

  return (
    <View style={styles.root}>
      <Header isBack title="Sốs" />
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
                : !!myNumbers
                ? myNumbers.list
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
            } else
              return (
                <InfoNumberCard
                  item={item}
                  onCard={() => _onPickNumber(item)}
                />
              );
          }}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <View
              style={{
                paddingTop: HeightScreen / 4,
              }}>
              <EmptyValue text="Bạn khum có số lào nhé!" />
            </View>
          }
          onEndReached={() => {
            if (pagination.total / pagination.limit > pagination.current) {
              dispatch({
                type: TypeNumber.getAllMyNumber,
                payload: {
                  actionLoading: ActionLoading.loadMore,
                  sort,
                },
              });
            }
          }}
          onEndReachedThreshold={0.001}
          // ListFooterComponent={
          //   isLoadingFetchAddProduct && <MainLoading padding={10} />
          // }
          ListFooterComponent={() => <View style={{paddingBottom: 30}}></View>}
        />
      </View>
    </View>
  );
};

export default MyNumberList;

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

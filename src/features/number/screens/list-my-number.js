import Header from '@src/components/header';
import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import InfoNumberCard from '../components/info-number-card';
import {Theme, HeightScreen} from '@common/theme';
import {useSelector, useDispatch} from 'react-redux';
import {TypeNumber} from '../redux/number.type';
import {useNavigation} from '@react-navigation/native';
import EmptyValue from '@src/components/empty-value';

const MyNumberList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {showLoading, myNumbers} = useSelector(state => state.number);

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

  return (
    <View style={styles.root}>
      <Header isBack title="Sốs" />
      <View style={styles.main}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.list}
          data={[...Object.values(!!myNumbers ? myNumbers.list : {})]}
          renderItem={({item, index}) => (
            <InfoNumberCard item={item} onCard={() => _onPickNumber(item)} />
          )}
          ListEmptyComponent={
            <View
              style={{
                paddingTop: HeightScreen / 4,
              }}>
              <EmptyValue text="Bạn khum có số lào nhé!" />
            </View>
          }
          ListFooterComponent={() => <View style={{paddingBottom: 30}}></View>}
          keyExtractor={(item, index) => index.toString()}
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
    paddingTop: 70,
    flex: 1,
  },
  list: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});

import {Theme} from '@src/common/theme';
import Header from '@src/components/header';
import React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import InfoMore from '../components/info-more';
import NumberCard from '../components/number-card';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {Router} from '@src/navigation/router';
import {useSelector} from 'react-redux';
import ShowLoading from '@src/components/show-loading';
import {TypeLoading} from '@src/constants/loading.type';

const Number = () => {
  const navigation = useNavigation();

  const {pickerNumber, showLoading} = useSelector(state => state.number);
  const {isLogin} = useSelector(state => state.auth);

  return (
    <View style={{flex: 1}}>
      <StatusBar
        animated={true}
        backgroundColor={Theme.colors.primary}
        // translucent={true}
        barStyle="dark-content"
        showHideTransition="fade"
        // hidden={true}
      />
      <Header title="Bốc số" />
      <View style={styles.root}>
        <View style={styles.listContainer}>
          <View style={styles.list}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(
                  isLogin ? Router.MyNumberList : Router.Login,
                )
              }>
              <LottieView
                source={require('@src/assets/images/list.json')}
                style={{
                  height: 35,
                }}
                speed={0.4}
                autoPlay
                loop
              />
            </TouchableOpacity>
            <Text style={styles.listText}>Danh sách số</Text>
          </View>
          <View style={styles.list}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(
                  isLogin ? Router.CreateRoomScreen : Router.Login,
                )
              }>
              <Image
                source={require('@src/assets/images/icons/add-list.png')}
                style={{width: 35, height: 35, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
            <Text style={styles.listText}>Tạo danh sách</Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.title}>Đơn vị tổ chức: </Text>
          {showLoading ? (
            <ShowLoading type={TypeLoading.counter} />
          ) : !!pickerNumber ? (
            <Text style={styles.currentNumber}>{pickerNumber.idRoom.name}</Text>
          ) : (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(isLogin ? Router.ScanQrCode : Router.Login)
              }>
              <View style={styles.btn}>
                <Text style={styles.btnText}>
                  {isLogin ? 'Lấy số' : 'Đăng nhập'}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Số thứ tự hiện tại: </Text>
          {showLoading ? (
            <ShowLoading type={TypeLoading.counter} />
          ) : !!pickerNumber ? (
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.currentNumber}>
                {pickerNumber.idRoom.currentNumber}
              </Text>

              <ShowLoading
                type={TypeLoading.dot}
                height={15}
                styleRoot={styles.dot}
              />
            </View>
          ) : (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(isLogin ? Router.ScanQrCode : Router.Login)
              }>
              <View style={styles.btn}>
                <Text style={styles.btnText}>
                  {isLogin ? 'Lấy số' : 'Đăng nhập'}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
        <NumberCard
          showLoading={showLoading}
          number={!!pickerNumber ? pickerNumber.number : ''}
          isNumber={!!pickerNumber}
          onPress={() =>
            navigation.navigate(isLogin ? Router.ScanQrCode : Router.Login)
          }
          buttonText={isLogin ? 'Lấy số' : 'Đăng nhập'}
        />
        <InfoMore />
      </View>
    </View>
  );
};

export default Number;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.backgrounds.white,
  },
  title: {
    fontFamily: Theme.fontFamily.QuicksandMedium,
    fontSize: Theme.size.large,
    color: Theme.colors.secondary,
  },
  currentNumber: {
    fontFamily: Theme.fontFamily.QuicksandBold,
    fontSize: Theme.size.largeX,
    color: Theme.colors.secondary,
  },
  listContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    borderBottomWidth: 5,
    borderColor: Theme.colors.lineBorder,
    paddingBottom: 20,
  },
  list: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  listText: {
    fontSize: Theme.size.small,
    fontFamily: Theme.fontFamily.QuicksandMedium,
    color: Theme.colors.secondary,
  },
  infoContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  btn: {
    backgroundColor: Theme.backgrounds.transparent,
    paddingVertical: 0,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Theme.colors.primary,
  },
  btnText: {
    fontFamily: Theme.fontFamily.QuicksandSemiBold,
    color: Theme.colors.primary,
  },
  dot: {
    justifyContent: 'flex-end',
    opacity: 0.3,
  },
});

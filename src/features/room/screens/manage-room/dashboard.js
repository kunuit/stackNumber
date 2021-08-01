import React, {useState, useCallback, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import Header from '@src/components/header';
import NumberFormat from 'react-number-format';
import {Theme} from '@common/theme';
import ShowLoading from '@src/components/show-loading';
import {TypeLoading} from '@src/constants/loading.type';
import Icon from 'react-native-vector-icons/AntDesign';
import {Router} from '@src/navigation/router';
import {debounce} from '@src/modules/utils';
import {TypeRoom} from '../../redux/room.type';
import {useWebSockets} from '@src/features/socket-io-client/modules/use-web-socket';

const DashboardRoomScreen = () => {
  const {params} = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {rooms} = useSelector(state => state.room);
  const [tmpPlus, setTmpPlus] = useState({value: 0, error: ''});
  const [memberTotalAtScreen, setMemberTotalAtScreen] = useState(0);
  const [currentNumberAtScreen, setCurrentNumberAtScreen] = useState(0);

  useWebSockets({
    userId: 'abc',
    enabled: !!rooms.list[id] && !!rooms.list[id].keyRoom,
    room: !!rooms.list[id] ? rooms.list[id].keyRoom : null,
  });

  const {id} = params;

  console.log(`tmpPlus`, tmpPlus);

  console.log(`params, rooms.list[id]`, params, rooms.list[id]);

  useEffect(() => {
    console.log(`runHear`);
    if (params) {
      setMemberTotalAtScreen(rooms.list[id].memberTotal);
      setCurrentNumberAtScreen(rooms.list[id].currentNumber);
    }
    return () => {
      setTmpPlus({value: 0, error: ''});
    };
  }, [params, rooms.list[id]]);

  const delayedQuery = useCallback(
    debounce(plusNumber => {
      setTmpPlus({value: 0, error: ''});
      // onProductCount(item.id, settedQuantity)
    }, 700),
    [],
  );

  const _handleIncrease = () => {
    if (currentNumberAtScreen === memberTotalAtScreen) {
      setTmpPlus({...tmpPlus, error: 'Không ai thèm vào!'});
      delayedQuery();
      return;
    }

    setCurrentNumberAtScreen(currentNumberAtScreen + 1);
    setTmpPlus({...tmpPlus, value: tmpPlus.value + 1});
    delayedQuery();
    dispatch({
      type: TypeRoom.increaseNumber,
      payload: {
        id,
      },
    });
  };

  return (
    <View style={styles.root}>
      <Header isBack title="Room" styleRoot={styles.header} />
      <View style={styles.main}>
        <View style={styles.infoContainer}>
          <Text style={styles.name} numberOfLines={2}>
            {rooms.list[id].name}
          </Text>

          <NumberFormat
            value={memberTotalAtScreen}
            displayType={'text'}
            thousandSeparator={true}
            // suffix={' đ'}
            // prefix={'$'}
            renderText={formattedValue => (
              <View style={styles.numberContainer}>
                <Text style={styles.memberTotal} numberOfLines={1}>
                  {formattedValue}
                </Text>
                <ShowLoading
                  type={TypeLoading.dot}
                  height={10}
                  styleRoot={styles.dot}
                />
              </View>
            )}
          />
          <NumberFormat
            value={currentNumberAtScreen}
            displayType={'text'}
            thousandSeparator={true}
            // suffix={' đ'}
            // prefix={'$'}
            renderText={formattedValue => (
              <View style={styles.numberContainer}>
                <Text style={styles.currentNumber} numberOfLines={1}>
                  {formattedValue}
                </Text>
                <ShowLoading
                  type={TypeLoading.dot}
                  height={10}
                  styleRoot={styles.dot}
                />
              </View>
            )}
          />
          <View style={styles.codeContainer}>
            <Text style={styles.keyRoom} numberOfLines={2}>
              code: {rooms.list[id].keyRoom}
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(Router.QrCodeGeneratorScreen, {id})
              }>
              <View style={styles.qrcode}>
                <Icon name="qrcode" color={Theme.colors.primary} size={20} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.increaseNumberContainer}>
          <View style={styles.plusContainer}>
            {tmpPlus.value !== 0 && (
              <View style={{flex: 1}}>
                <Text
                  style={[
                    styles.plusText,
                    {
                      right: -Math.floor(Math.random() * 60),
                      top: -Math.floor(Math.random() * 30) + 10,
                      fontSize:
                        tmpPlus.value < 3
                          ? Theme.size.normal
                          : tmpPlus.value < 5
                          ? Theme.size.large
                          : Theme.size.largeX,
                      color:
                        tmpPlus.value < 3
                          ? Theme.colors.lGreen
                          : tmpPlus.value < 5
                          ? Theme.colors.mGreen
                          : Theme.colors.bGreen,
                    },
                  ]}>
                  +{tmpPlus.value}
                </Text>
                {/* <Text>{}</Text> */}
              </View>
            )}
            {!!tmpPlus.error && (
              <Text style={styles.errorText}>{tmpPlus.error}</Text>
            )}
          </View>
          <TouchableOpacity onPress={_handleIncrease}>
            <View style={styles.btn}>
              <ShowLoading
                type={TypeLoading.spread}
                height={60}
                styleRoot={styles.spread}
              />
              <ShowLoading
                type={TypeLoading.plus}
                height={90}
                styleRoot={{zIndex: 2}}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DashboardRoomScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    position: 'relative',
  },
  main: {
    flex: 1,
  },
  infoContainer: {
    paddingTop: 14,
  },
  increaseNumberContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    paddingHorizontal: 50,
    fontFamily: Theme.fontFamily.QuicksandBold,
    fontSize: Theme.size.h4,
    textAlign: 'center',
    color: Theme.colors.secondary,
  },
  numberContainer: {
    flexDirection: 'row',
    paddingHorizontal: 40,
    justifyContent: 'center',
    paddingTop: 12,
  },
  memberTotal: {
    fontFamily: Theme.fontFamily.QuicksandSemiBold,
    fontSize: Theme.size.h2,
    color: Theme.colors.secondary,
  },
  currentNumber: {
    fontFamily: Theme.fontFamily.QuicksandSemiBold,
    fontSize: Theme.size.h3,
    color: Theme.colors.primary,
  },
  dot: {
    justifyContent: 'flex-end',
    opacity: 0.3,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 6,
  },
  keyRoom: {
    paddingRight: 4,
    fontFamily: Theme.fontFamily.QuicksandSemiBold,
    fontSize: Theme.size.small,
  },
  qrcode: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  btn: {
    padding: 30,
    height: 90,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: Theme.colors.lineBorder,
    borderWidth: 2,
    borderColor: Theme.colors.primary,
    borderRadius: 45,
  },
  spread: {
    position: 'absolute',
    zIndex: 1,
  },
  plusContainer: {
    flex: 0.1,
    paddingVertical: 12,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  plusText: {
    fontFamily: Theme.fontFamily.QuicksandSemiBold,
  },
  errorText: {
    fontFamily: Theme.fontFamily.QuicksandSemiBold,
    fontSize: Theme.size.small,
    color: Theme.colors.redBtn,
  },
});

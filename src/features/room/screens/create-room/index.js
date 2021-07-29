import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, Text, View, Platform, TouchableOpacity} from 'react-native';

import Header from '@components/header';
import {Theme} from '@common/theme';
import TextInputCus from '@components/TextInputCus';
import {nameValidator} from '../../modules/room.validation';
import {TypeRoom} from '../../redux/room.type';
import {useDispatch, useSelector} from 'react-redux';
import ShowLoading from '@src/components/show-loading';
import {TypeLoading} from '@src/constants/loading.type';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {Router} from '@src/navigation/router';

const CreateRoomScreen = () => {
  const ref_input1 = useRef();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [name, setName] = useState({value: '', error: ''});
  const {errorCreatedRoom, showLoading, isCreated, rooms} = useSelector(
    state => state.room,
  );

  useEffect(() => {
    if (isCreated) {
      navigation.goBack();
      navigation.navigate(Router.ListMyRoom);
      navigation.navigate(Router.DashboardRoomScreen, {
        id: Object.keys(rooms.list).slice(-1)[0],
      });
      dispatch({
        type: TypeRoom.changeFields,
        payload: {
          changeFields: {
            isCreated: false,
          },
        },
      });
    }
  }, [isCreated]);

  useEffect(() => {
    if (isFocused) {
      dispatch({
        type: TypeRoom.changeFields,
        payload: {
          changeFields: {
            errorCreatedRoom: null,
            showLoading: false,
          },
        },
      });
    }
  }, [isFocused]);

  const _submitName = () => {
    const nameError = nameValidator(name.value);
    if (nameError) {
      setName({...name, error: nameError});
      return;
    }

    //! dispatch to check createRoom
    dispatch({
      type: TypeRoom.createRoom,
      payload: {
        name: name.value,
      },
    });
  };

  return (
    <View style={styles.root}>
      <Header title="Tạo phòng" isBack isRight={false} />
      <View style={styles.main}>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: Theme.fontFamily.QuicksandSemiBold,
            fontSize: Theme.size.large,
            paddingBottom: 20,
          }}>
          Nhập thông tin phòng
        </Text>
        {!!errorCreatedRoom && (
          <Text style={styles.error}>{errorCreatedRoom}</Text>
        )}
        <View style={styles.inputContainer}>
          <TextInputCus
            label="Tên Phòng"
            returnKeyType="done"
            inputRef={ref => (ref_input1.current = ref)}
            onSubmitEditing={_submitName}
            value={name.value}
            onChangeText={text => setName({value: text, error: ''})}
            errorText={name.error}
          />
        </View>
        <View style={styles.submitContainer}>
          <TouchableOpacity onPress={_submitName} disabled={showLoading}>
            <View style={styles.btn}>
              {showLoading ? (
                <ShowLoading type={TypeLoading.truck} height={20} />
              ) : (
                <Text>Tạo</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CreateRoomScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  main: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 85 : 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  submitContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 20,
  },
  btn: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: Theme.colors.primary,
  },
  error: {
    width: '70%',
    color: Theme.colors.error,
    fontFamily: Theme.fontFamily.QuicksandMedium,
    fontSize: Theme.size.small,
    textAlign: 'center',
  },
});

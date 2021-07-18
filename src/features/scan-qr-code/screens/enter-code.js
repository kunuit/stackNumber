import {Theme} from '@src/common/theme';
import Header from '@src/components/header';
import Logo from '@src/components/Logo';
import TextInputCus from '@src/components/TextInputCus';
import React, {useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Platform} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {TypeNumber} from '../../number/redux/number.type';
import {API_ENDPOINT} from '@env';
import {Router} from '@src/navigation/router';

const EnterCode = () => {
  let ref_input1 = useRef();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [code, setCode] = useState({value: '', error: ''});

  const _submitCode = () => {
    dispatch({
      type: TypeNumber.getNumber,
      payload: {url: `${API_ENDPOINT}/number/${code.value}`},
    });
    navigation.navigate(Router.Number);
  };
  return (
    <View style={styles.root}>
      <Header isBack={true} isRight={false} title="Nhập code" />
      <View style={styles.main}>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: Theme.fontFamily.QuicksandSemiBold,
            fontSize: Theme.size.large,
            paddingBottom: 20,
          }}>
          Nhập code để lấy số thứ tự
        </Text>
        <View style={styles.inputContainer}>
          <TextInputCus
            label="code"
            returnKeyType="done"
            inputRef={ref => (ref_input1.current = ref)}
            onSubmitEditing={_submitCode}
            value={code.value}
            onChangeText={text => setCode({value: text, error: ''})}
            errorText={code.error}
          />
        </View>
        <View style={styles.submitContainer}>
          <TouchableOpacity onPress={_submitCode}>
            <View style={styles.btn}>
              <Text>Lấy số</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EnterCode;

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
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 20,
  },
  btn: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: Theme.colors.primary,
  },
});

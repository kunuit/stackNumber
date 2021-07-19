import {Theme} from '@src/common/theme';
import React, {useState, useEffect} from 'react';
import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import TopContent from '../components/top-content';
import BottomContent from '../components/bottom-content';
import Header from '@src/components/header';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {Router} from '@src/navigation/router';
import {TypeNumber} from '../../number/redux/number.type';
import {API_ENDPOINT} from '@env';
import {showToast} from '@src/common/layout/toast.helper';

const ScanQrCode = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [isLight, setIsLight] = useState(false);
  const [isBackCamera, setIsBackCamera] = useState(true);
  const [isScanned, setIsScanned] = useState(false);

  const {errorNumber} = useSelector(state => state.number);

  useEffect(() => {
    if (isFocused) {
      console.log(`isFocused`, isFocused);
      setIsScanned(true);
    }
  }, [isFocused]);

  useEffect(() => {
    if (errorNumber) {
      showToast({type: 'error', title: 'Lỗi số', message: errorNumber});

      dispatch({
        type: TypeNumber.changeFields,
        payload: {
          changeFields: {
            errorNumber: null,
          },
        },
      });
    }
  }, [errorNumber]);

  const _onSuccess = e => {
    navigation.navigate(Router.Number);
    setIsScanned(false);

    if (e.data.includes(`${API_ENDPOINT}/number/`)) {
      dispatch({type: TypeNumber.getNumber, payload: {url: e.data}});
      return;
    }
    Linking.openURL(e.data).catch(err =>
      showToast({type: 'error', title: 'Scan Code', message: err}),
    );
  };

  return (
    <View style={styles.root}>
      <Header
        styleRoot={{backgroundColor: Theme.backgrounds.transparent}}
        isRight={false}
        isBack={true}
        isBorder={true}
      />
      {isScanned && (
        <QRCodeScanner
          containerStyle={styles.QRCodeContainer}
          onRead={e => _onSuccess(e)}
          flashMode={
            isLight
              ? RNCamera.Constants.FlashMode.torch
              : RNCamera.Constants.FlashMode.off
          }
          // reactivateTimeout={0}
          // cameraTimeout={0}
          // reactivate={true}
          permissionDialogMessage="Cần cho phép camera hoạt động"
          cameraType={isBackCamera ? 'back' : 'front'}
          showMarker={true}
          markerStyle={{
            borderRadius: 10,
            borderStyle: 'dashed',
            borderWidth: 1,
          }}
          topContent={<TopContent />}
          bottomContent={
            <BottomContent
              isLight={isLight}
              onPressLight={() => setIsLight(!isLight)}
              onPressCamera={() => setIsBackCamera(!isBackCamera)}
              onNavigateEnterCode={() => navigation.navigate(Router.EnterCode)}
            />
          }
        />
      )}
    </View>
  );
};

export default ScanQrCode;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  QRCodeContainer: {
    backgroundColor: Theme.backgrounds.white,
  },
});

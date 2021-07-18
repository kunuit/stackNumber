import {Theme} from '@src/common/theme';
import React, {useState} from 'react';
import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import TopContent from '../components/top-content';
import BottomContent from '../components/bottom-content';
import Header from '@src/components/header';
// import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Router} from '@src/navigation/router';
import {useDispatch} from 'react-redux';
import {TypeNumber} from '../../number/redux/number.type';
import {API_ENDPOINT} from '@env';

const ScanQrCode = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLight, setIsLight] = useState(false);
  const [isBackCamera, setIsBackCamera] = useState(true);

  const _onSuccess = e => {
    console.log(`e`, e);
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err),
    // );

    if (e.data.includes(`${API_ENDPOINT}/number/`)) {
      console.log(`true`, true);
      dispatch({type: TypeNumber.getNumber, payload: {url: e.data}});
      navigation.navigate(Router.Number);
    }
  };

  return (
    <View style={styles.root}>
      <Header
        styleRoot={{backgroundColor: Theme.backgrounds.transparent}}
        isRight={false}
        isBack={true}
        isBorder={true}
      />
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
        markerStyle={{borderRadius: 10, borderStyle: 'dashed', borderWidth: 1}}
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

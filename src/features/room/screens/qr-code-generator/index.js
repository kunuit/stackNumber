import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Header from '@src/components/header';
import {Theme} from '@common/theme';
import {useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import {API_ENDPOINT} from '@env';

const QrCodeGeneratorScreen = () => {
  const {params} = useRoute();
  const {rooms} = useSelector(state => state.room);
  const [qrValue, setQrValue] = useState('');

  console.log(`params, rooms[params.id]`, params, rooms[params.id]);

  useEffect(() => {
    if (params) {
      setQrValue(`${API_ENDPOINT}/number/${rooms.list[params.id].keyRoom}`);
    }
  }, [params]);

  return (
    <View>
      <Header
        isRight={false}
        isBack
        styleRoot={styles.header}
        title="Mã phòng"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, paddingBottom: 30}}>
          <View style={styles.qrCodeContainer}>
            <QRCode
              //QR code value
              value={qrValue ? qrValue : 'NA'}
              //size of QR Code
              size={200}
              //Color of the QR Code (Optional)
              color={Theme.colors.notBlack}
              //Background Color of the QR Code (Optional)
              backgroundColor={Theme.backgrounds.transparent}
              //Logo of in the center of QR Code (Optional)
              logo={{
                url:
                  'https://res.cloudinary.com/dypezmi3x/image/upload/v1619285500/blog/pngwing.com_1_iyn0du.png',
              }}
              //Center Logo size  (Optional)
              logoSize={30}
              //Center Logo margin (Optional)
              logoMargin={2}
              //Center Logo radius (Optional)
              logoBorderRadius={15}
              //Center Logo background (Optional)
              logoBackgroundColor={Theme.backgrounds.paper}
            />

            <Text style={{fontFamily: Theme.fontFamily.QuicksandMedium}}>
              Mã QR code
            </Text>
            <Text
              style={{
                fontFamily: Theme.fontFamily.QuicksandMedium,
                paddingTop: 20,
              }}>
              Code:{' '}
              <Text
                style={{
                  fontFamily: Theme.fontFamily.QuicksandBold,
                }}>
                {!!rooms.list[params.id] && rooms.list[params.id].keyRoom}
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default QrCodeGeneratorScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Theme.backgrounds.white,
  },
  header: {
    backgroundColor: Theme.colors.primary,
  },
  qrCodeContainer: {
    paddingTop: 150,
    alignItems: 'center',
    marginBottom: 60,
  },
});

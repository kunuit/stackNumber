import {Theme} from '@src/common/theme';
import ShowLoading from '@src/components/show-loading';
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {TypeLoading} from '@src/constants/loading.type';

const NumberCard = ({
  number,
  isNumber,
  onPress,
  buttonText,
  showLoading,
  ...props
}) => {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Số của bạn là</Text>
      {showLoading ? (
        <ShowLoading type={TypeLoading.counter} />
      ) : !!isNumber ? (
        <Text style={styles.text}>{number}</Text>
      ) : (
        <TouchableOpacity onPress={onPress}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>{buttonText}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default NumberCard;

const styles = StyleSheet.create({
  root: {
    flex: 0.6,
    width: '80%',
    backgroundColor: Theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 15,
    // borderColor: Theme.colors.secondary,
    // borderWidth: 2,
  },
  title: {
    fontSize: Theme.size.h4,
    fontFamily: Theme.fontFamily.QuicksandSemiBold,
    color: Theme.colors.secondary,
    marginBottom: 20,
  },
  text: {
    fontFamily: Theme.fontFamily.GilroyExtraBold,
    fontSize: Theme.size.h1,
    color: Theme.colors.secondary,
  },
  btn: {
    backgroundColor: Theme.backgrounds.white,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Theme.colors.primary,
  },
  btnText: {
    fontFamily: Theme.fontFamily.QuicksandSemiBold,
    color: Theme.colors.primary,
  },
});

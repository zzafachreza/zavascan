import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';

export default function Laporan({navigation}) {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('LaporanHarian')}
        style={{
          flex: 1,
          marginVertical: 20,
          marginHorizontal: 10,
          backgroundColor: colors.secondary,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 2,
        }}>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            fontSize: 20,
            color: colors.white,
          }}>
          Laporan Harian
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('LaporanBulanan')}
        style={{
          flex: 1,
          marginVertical: 20,
          marginHorizontal: 10,
          backgroundColor: colors.primary,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 2,
        }}>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            fontSize: 20,
            color: colors.white,
          }}>
          Laporan Bulanan
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});

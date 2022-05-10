import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { fonts } from '../../utils/fonts';
import { colors } from '../../utils/colors';
import { Icon } from 'react-native-elements';
import { Dimensions } from 'react-native';

export default function Laporan({ navigation }) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
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
        <Icon
          type="ionicon"
          name="pie-chart"
          color={colors.white}
          size={windowWidth / 5}
        />
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 15,
            color: colors.white,
          }}>
          Laporan Harian
        </Text>
        <Text
          style={{
            fontFamily: fonts.secondary[400],
            fontSize: windowWidth / 20,
            color: colors.white,
          }}>
          Berisi Lapporan per hari
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('LaporanBulanan')}
        style={{
          flex: 1,
          marginVertical: 20,
          marginHorizontal: 10,
          backgroundColor: colors.background,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 2,
        }}>
        <Icon
          type="ionicon"
          name="bar-chart"
          color={colors.white}
          size={windowWidth / 5}
        />
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 15,
            color: colors.white,
          }}>
          Laporan Bulanan
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('LaporanTanggal')}
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
        <Icon
          type="ionicon"
          name="calendar"
          color={colors.white}
          size={windowWidth / 5}
        />
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 15,
            color: colors.white,
          }}>
          Laporan By Tanggal
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});

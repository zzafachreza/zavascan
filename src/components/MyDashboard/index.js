import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../utils/colors';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { fonts } from '../../utils/fonts';



export default function MyDashboard() {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const navigation = useNavigation();

  return (
    <View
      style={{
        justifyContent: 'center',
        padding: 10,
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Scanner')}
            style={{
              flex: 1,
              borderRadius: 10,
              backgroundColor: colors.primary,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: windowHeight / 20,
              marginRight: 10,
              marginBottom: 5,
            }}>
            <Icon
              type="ionicon"
              name="qr-code-outline"
              size={windowWidth / 5}
              color={colors.white}
            />
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text style={{ fontFamily: fonts.secondary[600], fontSize: 16 }}>
              SCAN ALAT / MANUAL
            </Text>
            <Text style={{ fontFamily: fonts.secondary[400], fontSize: 12 }}>
              Menggunakan Alat Scanner
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('LaporanTanggal')}
            style={{
              flex: 1,
              borderRadius: 10,
              backgroundColor: colors.secondary,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
              marginBottom: 5,
            }}>
            <Icon
              type="ionicon"
              name="calendar-outline"
              size={windowWidth / 5}
              color={colors.white}
            />
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 70,
            }}>
            <Text style={{ fontFamily: fonts.secondary[600], fontSize: 16 }}>
              LAPORAN
            </Text>
            <Text style={{ fontFamily: fonts.secondary[400], fontSize: 12 }}>
              Laporan Berdasarkan Tanggal
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Kamera')}
            style={{
              flex: 1,
              borderRadius: 10,
              backgroundColor: colors.background,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: windowHeight / 20,
              marginLeft: 10,
              marginBottom: 5,
            }}>
            <Icon
              type="ionicon"
              name="camera-outline"
              size={windowWidth / 5}
              color={colors.white}
            />
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text style={{ fontFamily: fonts.secondary[600], fontSize: 16 }}>
              SCAN KAMERA
            </Text>
            <Text style={{ fontFamily: fonts.secondary[400], fontSize: 12 }}>
              Menggunakan Kamera HP
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Hasil')}
            style={{
              flex: 1,
              borderRadius: 10,
              backgroundColor: colors.tertiary,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 10,
              marginBottom: 5,
            }}>
            <Icon
              type="ionicon"
              name="file-tray-stacked-outline"
              size={windowWidth / 5}
              color={colors.white}
            />
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 70,
            }}>
            <Text style={{ fontFamily: fonts.secondary[600], fontSize: 16 }}>
              HASIL SCAN
            </Text>
            <Text style={{ fontFamily: fonts.secondary[400], fontSize: 12 }}>
              Hasil Scan Hari ini
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

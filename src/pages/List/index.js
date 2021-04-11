import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import axios from 'axios';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';
import {color} from 'react-native-reanimated';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {Icon} from 'react-native-elements';
import {getData} from '../../utils/localStorage';
import {showMessage} from 'react-native-flash-message';
import {useFocusEffect} from '@react-navigation/native';

export default function List({navigation, route}) {
  const [data, setData] = useState([]);

  useFocusEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get('https://zavalabs.com/api/beton_data.php').then(res => {
      console.log(res.data);
      setData(res.data);
    });
  };
  useEffect(() => {
    getData();
  }, []);

  const hanldeHapus = id => {
    Alert.alert('Hallo Sobat Beton', 'Apakah Anda yakin akan hapus ini ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          axios
            .post('https://zavalabs.com/api/beton_delete.php', {
              id: id,
            })
            .then(res => {
              console.log(res.data);
              getData();
              showMessage({
                type: 'success',
                message: 'Data Berhasil Dihapus',
              });
            });
        },
      },
    ]);
  };

  const hanldeEdit = item => {
    Alert.alert('Hallo Sobat Beton', 'Apakah Anda yakin akan edit ini ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          navigation.navigate('Edit', item);
        },
      },
    ]);
  };

  const _renderItem = ({item}) => {
    let resiko = '';
    let warna = '';
    if (item.e < 0.5) {
      resiko = 'RENDAH';
      warna = 'green';
    } else if (item.e >= 0.5 && item.e <= 1) {
      resiko = 'SEDANG';
      warna = 'orange';
    } else if (item.e > 1) {
      resiko = 'TINGGI';
      warna = 'red';
    } else {
      resiko = '-';
    }

    let mutu = '';
    let fc = (1.6 - item.e) / 0.016;

    if (fc >= 20 && fc < 25) {
      mutu = 'K300/FC25 MPA';
    } else if (fc >= 25 && fc < 30) {
      mutu = 'K350/FC30 MPA';
    } else if (fc >= 30 && fc <= 34) {
      mutu = 'K425/FC35 MPA';
    } else {
      mutu = '-';
    }

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ListDetail', item)}
        style={{
          // height: 100,
          padding: 10,
          borderRadius: 10,
          marginVertical: 10,
          backgroundColor: colors.secondary,
          elevation: 1,
          borderWidth: 1,
          borderColor: colors.primary,
        }}>
        <Text style={styles.title}>{item.nama}</Text>
        <Text style={styles.date}>{item.tanggal}</Text>
        <View
          style={{
            borderBottomWidth: 1,
            borderRadius: 10,
            flexDirection: 'row',
            padding: 10,
            borderColor: colors.primary,
            marginVertical: 5,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 14,
              lineHeight: 30,
              fontFamily: fonts.secondary[400],
            }}>
            Evaporation Rate
          </Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontSize: 14,
                lineHeight: 30,
                fontFamily: fonts.secondary[600],
              }}>
              {item.e} kg/m
            </Text>
            <Text
              style={{
                fontSize: 12,
                lineHeight: 25,
                fontFamily: fonts.secondary[600],
              }}>
              2
            </Text>
            <Text
              style={{
                fontSize: 14,
                lineHeight: 30,
                fontFamily: fonts.secondary[600],
              }}>
              /hr
            </Text>
          </View>
        </View>

        <View
          style={{
            borderBottomWidth: 1,
            borderRadius: 10,
            flexDirection: 'row',
            padding: 10,
            borderColor: colors.primary,
            marginVertical: 5,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: fonts.secondary[400],
            }}>
            Resiko Retak
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: colors.white,
              backgroundColor: warna,
              padding: 5,
              fontFamily: fonts.secondary[600],
            }}>
            {resiko}
          </Text>
        </View>

        <View
          style={{
            borderBottomWidth: 1,
            borderRadius: 10,
            flexDirection: 'row',
            padding: 10,
            borderColor: colors.primary,
            marginVertical: 5,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: fonts.secondary[400],
            }}>
            Mutu Beton ({fc})
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: fonts.secondary[600],
            }}>
            {mutu}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',

            // paddingVertical: 10,
          }}>
          <TouchableOpacity
            onPress={() => hanldeEdit(item)}
            style={{
              // flex: 1,
              backgroundColor: colors.primary,
              borderRadius: 10,
              margin: 5,
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Icon
              type="ionicon"
              name="trash-outline"
              color={colors.white}
              size={12}
            />
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                color: colors.white,
                fontSize: 12,
              }}>
              Edit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => hanldeHapus(item.id)}
            style={{
              backgroundColor: colors.danger,
              borderRadius: 10,
              margin: 5,
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Icon
              type="ionicon"
              name="trash-outline"
              color={colors.white}
              size={12}
            />
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                color: colors.white,
                fontSize: 12,
              }}>
              Hapus
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <ImageBackground
      source={require('../../assets/back-beton.png')}
      style={{
        flex: 1,
        padding: 10,
      }}>
      <FlatList renderItem={_renderItem} data={data} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: colors.primary,

    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    height: 80,
    margin: 5,
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.secondary[600],
    fontSize: 12,
  },
  date: {
    fontFamily: fonts.secondary[400],
    fontSize: 12,
  },
});

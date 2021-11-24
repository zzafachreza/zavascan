import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Picker,
} from 'react-native';
import {MyInput, MyGap, MyButton} from '../../components';
import {getData} from '../../utils/localStorage';
import axios from 'axios';
import {colors} from '../../utils/colors';
import {showMessage} from 'react-native-flash-message';
import DropDownPicker from 'react-native-dropdown-picker';
import {Icon} from 'react-native-elements';
import {fonts} from '../../utils/fonts';

import Sound from 'react-native-sound';

export default function Manual() {
  useEffect(() => {
    getData('user').then(res => {
      setUser(res);
      //   console.log(res);
    });

    axios.get('https://zavalabs.com/api/zavascan_kurir.php').then(res => {
      console.log('kuri', res);
      setKurir(res.data);
    });
  }, []);

  var whoosh = new Sound(require('../../assets/salah.mp3'), Sound.MAIN_BUNDLE);

  const [kurir, setKurir] = useState([]);
  const [key, setKey] = useState('');
  const [eks, setEks] = useState('');
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const _kirimData = () => {
    if (key == '') {
      showMessage({
        message: 'Form masih kosong !',
        type: 'danger',
      });
    } else {
      setLoading(true);
      const kirim = {
        id_member: user.id,
        key: key,
        eks: eks,
      };
      axios
        .post('https://zavalabs.com/api/zavascan_manual_add.php', kirim)
        .then(res => {
          console.log(res);
          if (res.data == 404) {
            whoosh.play(success => {
              if (success) {
                showMessage({
                  message: 'Nomor barcode sudah pernah diinput !',
                  type: 'danger',
                });
                console.log('successfully finished playing');
              } else {
                console.log('playback failed due to audio decoding errors');
              }
            });
            setLoading(false);
          } else {
            setTimeout(() => {
              setLoading(false);
              showMessage({
                message: 'Data berhasil disimpan !',
                type: 'success',
              });
            }, 500);
          }
        });
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ScrollView>
        <View
          style={{
            padding: 10,
          }}>
          <MyInput
            value={key}
            onChangeText={value => setKey(value)}
            autoFocus
            label="Masukan barcode"
            iconname="barcode-outline"
          />

          <MyGap jarak={10} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 5,
            }}>
            <Icon
              type="ionicon"
              name="cube-outline"
              color={colors.primary}
              size={16}
            />
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                color: colors.primary,
                left: 10,
                fontSize: 16,
              }}>
              Pilih Ekspedisi
            </Text>
          </View>
          <Picker
            selectedValue={eks}
            onValueChange={itemValue => setEks(itemValue)}>
            {kurir.map(item => {
              return (
                <Picker.Item label={item.nama_kurir} value={item.nama_kurir} />
              );
            })}
          </Picker>

          <MyGap jarak={10} />

          <MyButton
            onPress={_kirimData}
            title="SIMPAN"
            warna={colors.secondary}
            Icons="cloud-upload-outline"
          />
        </View>
        {loading && (
          <View
            style={{
              margin: 10,
            }}>
            <ActivityIndicator color={colors.primary} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  picker: {
    width: 200,
    backgroundColor: '#FFF0E0',
    borderColor: 'black',
    borderWidth: 1,
  },
  pickerItem: {
    color: 'red',
  },
  onePicker: {
    width: 200,
    height: 44,
    backgroundColor: '#FFF0E0',
    borderColor: 'black',
    borderWidth: 1,
  },
  onePickerItem: {
    height: 44,
    color: 'red',
  },
  twoPickers: {
    width: 200,
    height: 88,
    backgroundColor: '#FFF0E0',
    borderColor: 'black',
    borderWidth: 1,
  },
  twoPickerItems: {
    height: 88,
    color: 'red',
  },
});

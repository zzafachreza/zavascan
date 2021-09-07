import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Picker,
  TextInput,
} from 'react-native';
import {MyInput, MyGap, MyButton} from '../../components';
import {getData} from '../../utils/localStorage';
import axios from 'axios';
import {colors} from '../../utils/colors';
import {showMessage} from 'react-native-flash-message';
import DropDownPicker from 'react-native-dropdown-picker';
import {Icon} from 'react-native-elements';
import {fonts} from '../../utils/fonts';
import LottieView from 'lottie-react-native';
import {Button} from 'react-native-elements/dist/buttons/Button';

export default function Scanner({navigation}) {
  useEffect(() => {
    getData('user').then(res => {
      setUser(res);
      //   console.log(res);
    });
  }, []);

  const [key, setKey] = useState('');
  const [user, setUser] = useState({});

  const [loading, setLoading] = useState(false);
  const _kirimData = () => {
    if (key.length == 0) {
      showMessage({
        message: 'Form masih kosong !',
        type: 'danger',
      });
    } else {
      const kirim = {
        id_member: user.id,
        key: key,
      };

      axios
        .post('https://zavalabs.com/api/zavascan_kamera_add.php', kirim)
        .then(res => {
          setKey('');
          ref_input.current.focus();
          if (res.data == 404) {
            // alert(cek);

            setCek(true);

            setCek2(false);
            showMessage({
              type: 'danger',
              message: key + ' Sudah Pernah Di Scan !',
            });
          } else {
            // alert(cek);
            setCek2(true);
            setCek(false);
            showMessage({
              type: 'success',
              message: key + ' Berhasil Simpan Data',
            });
          }
        });

      // navigation.navigate('BarcodeHasil', kirim);

      //   console.log(kirim);
    }
  };

  // useEffect(() => {
  //   _myInput.focus();
  //   console.log(_myInput);
  // });
  const ref_input = useRef();
  const [cek, setCek] = useState();
  const [cek2, setCek2] = useState();

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
          {/* <MyInput
            ref={x => (ref_input = x)}
            value={key}
            onChangeText={value => setKey(value)}
            onSubmitEditing={_kirimData}
            // autoFocus
            label="Masukan barcode"
            iconname="barcode-outline"
          /> */}

          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Icon
                type="ionicon"
                name="barcode"
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
                Masukan Barcode / Resi
              </Text>
            </View>
            <TextInput
              autoFocus
              value={key}
              onChangeText={val => setKey(val)}
              onSubmitEditing={_kirimData}
              style={{
                borderColor: colors.primary,
                borderRadius: 10,
                borderWidth: 1,
                paddingLeft: 10,
                fontSize: 18,
                fontFamily: fonts.primary[400],
              }}
              ref={ref_input}
            />
          </View>
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
      {cek && (
        <LottieView
          source={require('../../assets/error.json')}
          autoPlay
          loop={false}
        />
      )}
      {cek2 && (
        <LottieView
          style={{margin: 40}}
          source={require('../../assets/success.json')}
          autoPlay
          loop={false}
        />
      )}
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

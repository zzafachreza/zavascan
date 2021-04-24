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
import {Button} from 'react-native-elements/dist/buttons/Button';

export default function Scanner({navigation}) {
  useEffect(() => {
    getData('user').then(res => {
      setUser(res);
      //   console.log(res);
    });
  }, []);

  let _myInput = null;

  const [key, setKey] = useState('');
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const _kirimData = () => {
    if (key == '') {
      showMessage({
        message: 'Form masih kosong !',
        type: 'danger',
      });
    } else {
      const kirim = {
        id_member: user.id,
        key: key,
      };

      navigation.navigate('BarcodeHasil', kirim);

      //   console.log(kirim);
      setTimeout(() => {
        setKey('');
      }, 1000);
    }
  };

  // useEffect(() => {
  //   _myInput.focus();
  //   console.log(_myInput);
  // });

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
            onSubmitEditing={_kirimData}
            autoFocus
            label="Masukan barcode"
            iconname="barcode-outline"
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

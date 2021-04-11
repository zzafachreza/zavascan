import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {MyInput, MyGap, MyButton} from '../../components';
import {getData} from '../../utils/localStorage';
import axios from 'axios';
import {colors} from '../../utils/colors';
import {showMessage} from 'react-native-flash-message';

export default function Manual() {
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
      };
      axios
        .post('https://zavalabs.com/api/zavascan_manual_add.php', kirim)
        .then(res => {
          console.log(res);
          if (res.data == 404) {
            setLoading(false);
            showMessage({
              message: 'Nomor barcode sudah pernah diinput !',
              type: 'info',
            });
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
            label="masukan barcode"
            iconname="barcode-outline"
          />
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

const styles = StyleSheet.create({});

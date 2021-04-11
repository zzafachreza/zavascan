import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {MyInput} from '../../components';
import {getData} from '../../utils/localStorage';
import axios from 'axios';
import {FlatList} from 'react-native-gesture-handler';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

export default function Hasil() {
  const [refreshing, setRefreshing] = React.useState(false);
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const [key, setKey] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getData('user').then(res => {
      setUser(res);
      _getData(res.id);
      //   console.log(res);
    });
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData('user').then(res => {
      setUser(res);
      _getData(res.id);
      //   console.log(res);
    });
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const _getData = id_member => {
    axios
      .post('https://zavalabs.com/api/zavascan_data.php', {
        id_member: id_member,
      })
      .then(res => {
        console.log(res.data);
        setData(res.data);
      });
  };

  const _searchData = (id_member, kata_kunci) => {
    setLoading(true);
    axios
      .post('https://zavalabs.com/api/zavascan_data.php', {
        id_member: id_member,
        key: kata_kunci,
      })
      .then(res => {
        console.log(res.data);
        setTimeout(() => {
          setData(res.data);
          setLoading(false);
        }, 500);
      });
  };

  const _hapusData = (id_member, id) => {
    axios
      .post('https://zavalabs.com/api/zavascan_delete.php', {
        id_member: id_member,
        id: id,
      })
      .then(res => {
        console.log(res.data);
        _getData(id_member);
      });
  };

  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          Alert.alert('', 'Apakah Anda yakin akan hapus ini ?', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                _hapusData(user.id, item.id);
              },
            },
          ])
        }
        style={{
          marginVertical: 10,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: colors.primary,
          //   padding: 10,
          overflow: 'hidden',
        }}>
        <View
          style={{
            backgroundColor: colors.white,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: 14,
              color: colors.primary,
            }}>
            {item.nama}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: colors.white,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            padding: 10,
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: 14,
              color: colors.secondary,
            }}>
            {item.ekspedisi}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: colors.primary,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            padding: 10,
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[400],
              fontSize: 12,
              color: colors.white,
            }}>
            {item.tanggal} {item.jam}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 10,
        backgroundColor: colors.white,
      }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
          />
        }>
        <MyInput
          label="Pencarian Data"
          iconname="search"
          placeholder="masukan kata kunci"
          value={key}
          onChangeText={value => setKey(value)}
          onSubmitEditing={() => _searchData(user.id, key)}
        />
        {loading && (
          <View
            style={{
              margin: 10,
            }}>
            <ActivityIndicator color={colors.primary} />
          </View>
        )}
        {!loading && <FlatList data={data} renderItem={_renderItem} />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

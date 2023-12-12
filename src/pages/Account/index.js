import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, ImageBackground, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
;
import {
  Avatar,
  Accessory,
  Divider,
  ListItem,
  // Icon,
  Button,
  Icon,
} from 'react-native-elements';
import { storeData, getData } from '../../utils/localStorage';
import { colors } from '../../utils/colors';
import { MyDimensi, fonts } from '../../utils';

export default function Account({ navigation }) {
  const [user, setUser] = useState({});
  const [iLogo, setiLogo] = useState('');

  useEffect(() => {
    getData('user').then(res => {
      setUser(res);
      // console.log(user);
      setiLogo(res.nama_lengkap.substring(0, 1));
    });
  }, []);

  const btnKeluar = () => {
    Alert.alert('ZAVASCAN', 'Apakah kamu yakin akan keluar ?', [
      {
        text: 'Batal',
        style: "cancel"
      },
      {
        text: 'Keluar',
        onPress: () => {
          storeData('user', null);

          navigation.reset({
            index: 0,
            routes: [{ name: 'Utama' }],
          });
        }
      }
    ])
  };

  return (
    <SafeAreaView

      style={{
        flex: 1,
      }}>
      <View style={{
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View style={{
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: colors.primary
          }}>
            <Icon type='ionicon' name='chevron-back' color={colors.white} />
          </View>

        </TouchableWithoutFeedback>
        <Text style={{
          fontFamily: fonts.secondary[600],
          flex: 1,
          paddingLeft: 20,
          fontSize: MyDimensi / 18,
          color: colors.primary
        }}>Profile</Text>
      </View>
      <View
        style={{
          padding: 10,
          // backgroundColor: 'blue',

          flex: 1,
          flexDirection: 'column',
        }}>
        <View
          style={{
            padding: 10,
            // backgroundColor: 'yellow',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <View
            style={{
              // borderWidth: 1,
              backgroundColor: 'gray',
              width: 100,
              height: 100,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
            }}>
            <Text
              style={{
                fontSize: 50,
                color: 'white',
              }}>
              {iLogo}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              top: 10,
            }}>
            {user.nama_lengkap}
          </Text>
          <Divider style={{ backgroundColor: colors.border, height: 1 }} />
          <Text
            style={{
              fontSize: 16,
              top: 10,
            }}>
            {user.tlp}
          </Text>
        </View>
        <View
          style={{
            padding: 10,
            // backgroundColor: 'green',
            flex: 1,
          }}>
          <ListItem bottomDivider>
            <Icon
              name="mail"
              type="ionicon"
              color={colors.primary}
              size={20}
            />
            <ListItem.Content>
              <ListItem.Title>
                <Text
                  style={{
                    fontFamily: 'Montserrat-SemiBold',
                  }}>
                  Email
                </Text>
              </ListItem.Title>
              <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>

          <ListItem bottomDivider>
            <Icon
              name="location"
              type="ionicon"
              color={colors.primary}
              size={20}
            />
            <ListItem.Content>
              <ListItem.Title>
                <Text
                  style={{
                    fontFamily: 'Montserrat-SemiBold',
                  }}>
                  Alamat
                </Text>
              </ListItem.Title>
              <ListItem.Subtitle>{user.alamat}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>

          {/* <TouchableOpacity onPress={() => {
            navigation.navigate('Customer')
          }}>
            <ListItem bottomDivider>
              <Icon
                name="users"
                type="ionicon"
                color={colors.success}
                size={20}
              />
              <ListItem.Content >
                <ListItem.Title>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-SemiBold',
                      color: colors.success
                    }}>
                    Data Customer
                  </Text>
                </ListItem.Title>
                <ListItem.Subtitle style={{
                  color: colors.black
                }}>Klik disini untuk masuk ke menu customer</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          </TouchableOpacity> */}
          <Button
            onPress={btnKeluar}
            title="Logout"
            icon={
              <Icon
                style={{
                  marginRight: 5,
                }}
                type='ionicon'
                name="log-out-outline"
                size={15}
                color="white"
              />
            }
            buttonStyle={{
              backgroundColor: colors.primary,
              height: 50,
              marginTop: '5%',
              borderRadius: 10,
              marginBottom: 20,
              padding: 20,
              margin: 5,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

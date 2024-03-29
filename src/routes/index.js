import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  View,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Splash,
  GetStarted,
  Login,
  Register,
  Home,
  Account,
  Success,
  Berita,
  List,
  Success2,
  ListDetail,
  Edit,
  Hasil,
  Manual,
  Kamera,
  KameraHasil,
  Error,
  Laporan,
  LaporanHarian,
  LaporanBulanan,
  Scanner,
  BarcodeHasil,
  Utama,
  SerahTerima,
  HasilSerah,
  Customer,
  LaporanTanggal,
  LaporanByEkspedisi,
  LaporanByCustomer,
  Kurir,
  Hasil2,
  LaporanDownload,
  PilihanSerahTerima,
  SerahTerimaScan,
  Otp,
  Resi,
  Packing,
  Retur,
} from '../pages';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigator } from '../components';
import { colors } from '../utils/colors';
import { Icon } from 'react-native-elements';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      {/* <Tab.Screen name="Customer" component={Customer} /> */}
      {/* <Tab.Screen name="Kurir" component={Kurir} /> */}
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

export default function Router() {
  return (
    <Stack.Navigator initialRouteName={'Utama'}>
      <Stack.Screen
        name="Utama"
        component={Utama}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="Resi"
        component={Resi}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Packing"
        component={Packing}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Retur"
        component={Retur}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="LaporanDownload"
        component={LaporanDownload}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Otp"
        component={Otp}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="Laporan"
        component={Laporan}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="PilihanSerahTerima"
        component={PilihanSerahTerima}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Success"
        component={Success}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Success2"
        component={Success2}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Error"
        component={Error}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerTitle: 'Login',
          headerShown: false,

          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerTitle: 'Register',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Berita"
        component={Berita}
        options={({ route, navigation }) => ({
          title: 'ARTIKEL BERITA',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="Hasil"
        component={Hasil}
        options={({ route, navigation }) => ({
          title: 'HASIL DATA SCAN',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />


      <Stack.Screen
        name="Hasil2"
        component={Hasil2}
        options={({ route, navigation }) => ({
          title: 'HASIL DATA SCAN',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="Customer"
        component={Customer}
        options={({ route, navigation }) => ({
          title: 'DATA CUSTOMER',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="HasilSerah"
        component={HasilSerah}
        options={({ route, navigation }) => ({
          title: 'HASIL SCAN RETUR',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="Manual"
        component={Manual}
        options={({ route, navigation }) => ({
          title: 'INPUT MANUAL',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          headerRight: () => (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Hasil')}
                style={{
                  position: 'relative',
                  padding: 5,
                  marginHorizontal: 5,
                }}>
                <Icon name="list" type="ionicon" color="white" size={20} />
              </TouchableOpacity>
            </View>
          ),
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="Kamera"
        component={Kamera}
        options={({ route, navigation }) => ({
          title: 'SCAN KAMERA',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          headerRight: () => (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Hasil')}
                style={{
                  position: 'relative',
                  padding: 5,
                  marginHorizontal: 10,
                }}>
                <Icon name="list" type="ionicon" color="white" size={25} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.replace('MainApp')}
                style={{
                  position: 'relative',
                  padding: 5,
                  marginHorizontal: 10,
                }}>
                <Icon name="home" type="ionicon" color="white" size={25} />
              </TouchableOpacity>
            </View>
          ),
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="Scanner"
        component={Scanner}
        options={({ route, navigation }) => ({
          title: 'SCAN ALAT',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          headerRight: () => (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Hasil')}
                style={{
                  position: 'relative',
                  padding: 5,
                  marginHorizontal: 10,
                }}>
                <Icon name="list" type="ionicon" color="white" size={25} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.replace('MainApp')}
                style={{
                  position: 'relative',
                  padding: 5,
                  marginHorizontal: 10,
                }}>
                <Icon name="home" type="ionicon" color="white" size={25} />
              </TouchableOpacity>
            </View>
          ),
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="KameraHasil"
        component={KameraHasil}
        options={({ route, navigation }) => ({
          headerShown: false,
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="BarcodeHasil"
        component={BarcodeHasil}
        options={({ route, navigation }) => ({
          headerShown: false,
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="List"
        component={List}
        options={({ route, navigation }) => ({
          title: 'LIST DATA',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="ListDetail"
        component={ListDetail}
        options={({ route, navigation }) => ({
          title: 'LIST DETAIL',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="Edit"
        component={Edit}
        options={({ route, navigation }) => ({
          title: 'EDIT DATA',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="LaporanHarian"
        component={LaporanHarian}
        options={({ route, navigation }) => ({
          title: 'LAPORAN HARIAN',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="LaporanBulanan"
        component={LaporanBulanan}
        options={({ route, navigation }) => ({
          title: 'LAPORAN BULANAN',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="LaporanTanggal"
        component={LaporanTanggal}
        options={({ route, navigation }) => ({
          title: 'LAPORAN BERDASARKAN TANGGAL',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />


      <Stack.Screen
        name="LaporanByEkspedisi"
        component={LaporanByEkspedisi}
        options={({ route, navigation }) => ({
          title: 'LAPORAN EKSPEDISI',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="LaporanByCustomer"
        component={LaporanByCustomer}
        options={({ route, navigation }) => ({
          title: 'LAPORAN ADMIN',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />



      <Stack.Screen
        name="SerahTerima"
        component={SerahTerima}
        options={({ route, navigation }) => ({
          title: 'SCAN RETUR',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.background,
            elevation: 0, // remove shadow on Android
          },
          headerRight: () => (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('HasilSerah')}
                style={{
                  position: 'relative',
                  padding: 5,
                  marginHorizontal: 10,
                }}>
                <Icon name="list" type="ionicon" color="white" size={25} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.replace('MainApp')}
                style={{
                  position: 'relative',
                  padding: 5,
                  marginHorizontal: 10,
                }}>
                <Icon name="home" type="ionicon" color="white" size={25} />
              </TouchableOpacity>
            </View>
          ),
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />




      <Stack.Screen
        name="SerahTerimaScan"
        component={SerahTerimaScan}
        options={({ route, navigation }) => ({
          title: 'SCAN RETUR',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.background,
            elevation: 0, // remove shadow on Android
          },
          headerRight: () => (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('HasilSerah')}
                style={{
                  position: 'relative',
                  padding: 5,
                  marginHorizontal: 10,
                }}>
                <Icon name="list" type="ionicon" color="white" size={25} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.replace('MainApp')}
                style={{
                  position: 'relative',
                  padding: 5,
                  marginHorizontal: 10,
                }}>
                <Icon name="home" type="ionicon" color="white" size={25} />
              </TouchableOpacity>
            </View>
          ),
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});

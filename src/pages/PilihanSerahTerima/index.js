import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    Alert,
    Linking,
} from 'react-native';
import { fonts } from '../../utils/fonts';
import { colors } from '../../utils/colors';
import { Icon } from 'react-native-elements';
import { Dimensions } from 'react-native';

export default function PilihanSerahTerima({ navigation }) {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    return (
        <View
            style={{
                flex: 1,
            }}>

            <TouchableOpacity
                onPress={() => {

                    navigation.navigate('SerahTerima')
                    // Alert.alert(
                    //     "ZAVASCAN INFO",
                    //     "Untuk mengunakan fitur kamera, silahkan hubungi admin terlebih dahulu",
                    //     [
                    //         {
                    //             text: "Cancel",
                    //             onPress: () => console.log("Cancel Pressed"),
                    //             style: "cancel"
                    //         },
                    //         { text: "HUBUNGI ADMIN", onPress: () => Linking.openURL('https://wa.me/6281319456595?text=Hallo%20admin%20mau%20tanya%20fitur%20aplikasi%20*ZAVASCAN*%20dong...') }
                    //     ]
                    // );
                }}
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
                    name="camera-outline"
                    color={colors.white}
                    size={windowWidth / 3}
                />
                <Text
                    style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 25,
                        color: colors.white,
                    }}>
                    Scan Retur Dengan Kamera
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('SerahTerimaScan')}
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
                    name="barcode-outline"
                    color={colors.white}
                    size={windowWidth / 3}
                />
                <Text
                    style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 25,
                        color: colors.white,
                    }}>
                    Scan Retur Dengan Alat
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({});

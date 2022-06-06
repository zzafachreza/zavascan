import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
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
                onPress={() => navigation.navigate('SerahTerima')}
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
                        fontSize: windowWidth / 20,
                        color: colors.white,
                    }}>
                    Serah Terima Dengan Kamera
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
                        fontSize: windowWidth / 15,
                        color: colors.white,
                    }}>
                    Serah Terima Dengan Alat
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({});

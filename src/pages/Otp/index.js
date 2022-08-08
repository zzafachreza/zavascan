import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { MyGap } from '../../components';
import { showMessage } from 'react-native-flash-message';
import axios from 'axios';

export default function Otp({ navigation, route }) {
    const item = route.params;
    // console.log(item);
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.white,
        }}>
            <ScrollView style={{
                flex: 1,
            }}>
                <View style={{
                    flex: 0.8,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image source={require('../../assets/otp.png')} style={{
                        width: 200,
                        height: 200,
                    }} />
                </View>
                <View style={{
                    flex: 1,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        textAlign: 'center',
                        fontSize: 13,
                        margin: 5,
                    }}>Hallo {item.nama_lengkap}</Text>

                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        textAlign: 'center',
                        fontSize: 13,
                        margin: 10,
                    }}>Terima kasih sudah mendaftar <Text style={{
                        fontFamily: fonts.secondary[600],
                    }}>ZAVASCAN</Text>, Kode OTP akan kami kirimkan melalui Whatsapp ke nomor xxxxxx{item.telepon.substring(item.telepon.length - 3)}</Text>

                </View>
                <View style={{
                    paddingHorizontal: 50,
                    justifyContent: 'center',
                }}>

                    <TextInput autoFocus value={otp} onChangeText={x => {
                        console.log('inpyu otp', x)
                        setOtp(x);
                        if (x.length === 4) {
                            if (parseInt(x) !== parseInt(item.telepon.substr(7, 1) + item.telepon.substr(4, 1) + + item.telepon.substr(9, 1) + item.telepon.substr(6, 1))) {
                                setLoading(true);
                                setTimeout(() => {
                                    showMessage({
                                        type: 'danger',
                                        message: 'Maaf kode OTP salah !'
                                    });
                                    setLoading(false);
                                }, 1000)
                            } else if (parseInt(x) === parseInt(item.telepon.substr(7, 1) + item.telepon.substr(4, 1) + + item.telepon.substr(9, 1) + item.telepon.substr(6, 1))) {
                                setLoading(true);
                                setTimeout(() => {

                                    axios.post('https://zavalabs.com/api/zavascan_add_member.php', item).then(res => {
                                        console.log(res.data);
                                        showMessage({
                                            type: 'success',
                                            message: 'Selamat Anda berhasil mendaftar !'
                                        })
                                        navigation.navigate('Login')
                                    })
                                    setLoading(false);
                                }, 1000)
                            }
                        }

                    }} maxLength={4} keyboardType='number-pad' style={{
                        borderBottomWidth: 1,
                        textAlign: 'center',
                        fontSize: 35,
                        fontFamily: fonts.secondary[600],
                    }} />
                    <MyGap jarak={10} />
                    {loading && <ActivityIndicator size="large" color={colors.primary} />}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({})
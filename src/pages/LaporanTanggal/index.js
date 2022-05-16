import React, { useEffect, useState, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    SafeAreaView,
    PermissionsAndroid,
    Linking,
} from 'react-native';
import { getData } from '../../utils/localStorage';
import DatePicker from 'react-native-datepicker'
import { fonts } from '../../utils/fonts';
import { MyInput, MyGap, MyButton } from '../../components';
import { colors } from '../../utils/colors';
export default function LaporanTanggal() {

    const [user, setUser] = useState({});
    const [awal, setAwal] = useState('');
    const [akhir, setAkhir] = useState('');
    useEffect(() => {
        getData('user').then(res => {
            setUser(res);
            console.log(res);
        });
    }, []);

    const download = () => {

        if (awal.length > 1 && akhir.length > 1) {
            console.log('siop');
            Linking.openURL('https://zavalabs.com/api/zavascan_download.php?id_member=' +
                user.id + '&awal=' + awal + '&akhir=' + akhir);
        } else {
            alert('Silahkan pilih tanggal terlebih dahulu')
        }


    }


    return (
        <SafeAreaView style={{
            flex: 1,
            padding: 10
        }}>

            <View>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 14,
                }}>Dari</Text>
                <DatePicker
                    style={{
                        width: '100%',
                    }}

                    date={awal}
                    mode="date"
                    placeholder="silahkan pilih tanggal"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36,
                            borderRadius: 10,
                        },

                        // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => setAwal(date)}
                />
            </View>

            <MyGap jarak={20} />
            <View>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 14,
                }}>Sampai</Text>
                <DatePicker
                    style={{
                        width: '100%',
                    }}

                    date={akhir}
                    mode="date"
                    placeholder="ssilahkan pilih tanggal"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36,
                            borderRadius: 10,
                        },

                        // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => setAkhir(date)}
                />
            </View>
            <MyGap jarak={20} />
            <MyButton onPress={download} title="Download Sekarang" warna={colors.success} Icons="download-outline" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})
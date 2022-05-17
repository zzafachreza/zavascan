import { ActivityIndicator, Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { MyButton, MyGap, MyInput } from '../../components'
import { colors } from '../../utils/colors'
import { Icon } from 'react-native-elements'
import { fonts } from '../../utils/fonts'
import { getData, storeData } from '../../utils/localStorage'
import axios from 'axios'
import { showMessage } from 'react-native-flash-message'

export default function Customer({ navigation, route }) {

    useEffect(() => {
        getData('user').then(res => {
            setUser(res);
            console.log(res);
            setKirim({
                ...kirim,
                fid_member: res.id
            });
            getDataCustomer(res.id)
        });
        getNamaCustomer();


    }, [])


    const getNamaCustomer = () => {
        getData('customer').then(res => {
            setCustomer(res);
        })
    }

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});
    const [customer, setCustomer] = useState('');
    const [open, setOpen] = useState(false);
    const [kirim, setKirim] = useState({
        nama_customer: '',
        telepon_customer: '',
    });
    const [data, setData] = useState([]);

    const sendToServer = () => {
        setLoading(true);
        setOpen(false);
        console.log('sen to server', kirim);
        axios.post('https://zavalabs.com/api/add_customer.php', kirim).then(res => {
            console.log('response server', res.data);

            getDataCustomer(kirim.fid_member);
            setKirim({
                ...kirim,
                nama_customer: '',
                telepon_customer: ''
            })

        })

    }

    const deleteCustomer = (x) => {

        setLoading(true);

        axios.post('https://zavalabs.com/api/delete_customer.php', {
            id_customer: x
        }).then(res => {
            console.log('response server', res.data);

            getDataCustomer(kirim.fid_member);

        });

    }

    const getDataCustomer = (x) => {


        axios.post('https://zavalabs.com/api/get_customer.php', {
            fid_member: x
        }).then(res => {
            console.log('data customer', res.data);
            setData(res.data);
            setLoading(false);
        })


    }

    return (
        <SafeAreaView style={{
            flex: 1,
        }}>
            <View style={{
                padding: 10,
            }}>
                <Text style={{
                    marginBottom: 10,
                    fontFamily: fonts.secondary[400], fontSize: 13,
                }}>Customer Dipilih : <Text style={{
                    fontFamily: fonts.secondary[600], fontSize: 16,
                }}>{customer}</Text></Text>
                <MyButton onPress={() => setOpen(true)} title="Tambah Customer" warna={colors.secondary} Icons="add" />
            </View>
            {loading && <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
            }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>}
            <ScrollView style={{
                flex: 1,
            }}>


                {!loading && data.map(item => {
                    return (
                        <View style={{
                            marginHorizontal: 10,
                            marginVertical: 5,
                            borderRadius: 5,
                            borderWidth: 1,
                            borderColor: customer == item.nama_customer ? colors.success : colors.black,
                            padding: 10,
                            flexDirection: 'row',
                            marginBottom: 5,
                        }}>

                            <View style={{
                                flex: 1
                            }}>
                                <Text style={{
                                    flex: 1,
                                    color: customer == item.nama_customer ? colors.success : colors.black,
                                    fontFamily: fonts.secondary[600],
                                    fontSize: 16,
                                }}>{item.nama_customer}</Text>
                                <Text style={{
                                    flex: 1,
                                    fontFamily: fonts.secondary[400],
                                    fontSize: 12,
                                }}>{item.telepon_customer}</Text>
                            </View>

                            <TouchableOpacity onPress={() => navigation.navigate('Hasil2', {
                                key: item.nama_customer
                            })
                            } >
                                <Icon type='ionicon' name='search' color={colors.primary} />
                            </TouchableOpacity>

                            {customer != item.nama_customer && <TouchableOpacity style={{
                                marginHorizontal: 10,
                            }} onPress={() => {
                                Alert.alert(
                                    `${item.nama_customer}`,
                                    `Pilih customer ini ?`,
                                    [
                                        {
                                            text: "Cancel",
                                            onPress: () => console.log("Cancel Pressed"),
                                            style: "cancel"
                                        },
                                        {
                                            text: "OK", onPress: () => {

                                                storeData('customer', item.nama_customer);

                                                showMessage({
                                                    message: `${item.nama_customer} berhasil dipilih`,
                                                    type: 'success'
                                                });
                                                getNamaCustomer();
                                            }
                                        }
                                    ]
                                );
                            }}>
                                <Icon type='ionicon' name='open-outline' color={colors.success} />
                            </TouchableOpacity>}

                            <TouchableOpacity onPress={() => {
                                Alert.alert(
                                    `${item.nama_customer}`,
                                    `Anda yakin akan hapus customer ini ?`,
                                    [
                                        {
                                            text: "Cancel",
                                            onPress: () => console.log("Cancel Pressed"),
                                            style: "cancel"
                                        },
                                        { text: "OK", onPress: () => deleteCustomer(item.id) }
                                    ]
                                );
                            }}>
                                <Icon type='ionicon' name='trash' color={colors.secondary} />
                            </TouchableOpacity>



                        </View>

                    );
                })}
            </ScrollView>
            {open && <ScrollView style={{
                flex: 2,
                padding: 10,
                borderTopLeftRadius: 20,
                elevation: 4,

                borderTopRightRadius: 20,
                backgroundColor: colors.white
            }}>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 15,
                        }}>Tambah Customer</Text>
                    </View>

                    <TouchableOpacity onPress={() => setOpen(false)} style={{

                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Icon type='ionicon' name='close' size={35} />
                    </TouchableOpacity>
                </View>
                <View>
                    <MyInput value={kirim.nama_customer} onChangeText={x => setKirim({
                        ...kirim,
                        nama_customer: x
                    })} autoFocus label="Nama Customer" iconname="card" />
                    <MyGap jarak={10} />
                    <MyInput value={kirim.telepon_customer} onChangeText={x => setKirim({
                        ...kirim,
                        telepon_customer: x
                    })} label="Telepon Customer" keyboardType="phone-pad" iconname="call" />
                    <MyGap jarak={20} />
                    <MyButton onPress={sendToServer} Icons="save-outline" title="Simpan Customer" warna={colors.primary} />

                </View>
            </ScrollView>}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})
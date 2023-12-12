import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    FlatList,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { APIurl, getData } from '../../utils/localStorage';
import axios from 'axios';
import { colors } from '../../utils/colors';
import { showMessage } from 'react-native-flash-message';
import { Icon } from 'react-native-elements';
import { MyDimensi, fonts } from '../../utils/fonts';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { MyInput } from '../../components';
import { Image } from 'react-native';
import SoundPlayer from 'react-native-sound-player'
import ZavalabsScanner from 'react-native-zavalabs-scanner'


export default function Packing({ navigation, route }) {

    const user = route.params;
    const [loading, setLoading] = useState(true);
    const [customer, setCustomer] = useState('');
    const [key, setKey] = useState('')
    const __getTransaction = () => {
        // setLoading(true);
        axios.get(APIurl + 'packing?id_member=' + route.params.id).then(res => {
            // console.log(res.data.data[0]);
            setData(res.data.data)
        }).finally(() => {
            setLoading(false);
        })
    }

    const __deleteData = (barcode) => {
        axios.delete(APIurl + 'packing?id_member=' + user.id + '&key=' + barcode).then(res => {
            console.log(res.data);
            __getTransaction();
        })
    }

    const __insertData = (barcode, tipe = 'scan') => {

        if (barcode.length < 10) {
            showMessage({
                message: 'Minimal 10 karakter !'
            })
        } else if (barcode.length > 18) {
            showMessage({
                message: 'Maksimal 18 karakter !'
            })
        } else {
            axios.post(APIurl + 'packing', {
                id_member: user.id,
                key: barcode,
                customer: customer
            }).then(res => {
                console.log(res.data)
                if (tipe == 'scan') {
                    setKey('');
                    inputRef.current.focus();
                }


                if (res.data.status == 200) {
                    SoundPlayer.playSoundFile('scan', 'mp3')
                    __getTransaction();
                } else {
                    showMessage({
                        type: 'danger',
                        message: res.data.message
                    });
                    SoundPlayer.playSoundFile('errpack', 'mp3')
                }
            })
        }

    }


    const __filterData = (barcode) => {
        // setLoading(true);
        axios.get(APIurl + 'packing?id_member=' + route.params.id + '&key=' + barcode).then(res => {
            console.log(res.data.data);
            setData(res.data.data)
        }).finally(() => {
            setLoading(false);
        })
    }


    const [data, setData] = useState([]);

    const inputRef = useRef();



    useEffect(() => {
        __getTransaction();
    }, [])

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            position: 'relative'
        }}>
            {/* header */}
            <View style={{
                padding: 10,
            }}>
                <View style={{
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
                    }}>Scan Packing</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    marginTop: 10,
                }}>
                    <View style={{
                        flex: 1,
                    }}>
                        <TextInput
                            ref={inputRef}
                            value={key}
                            maxLength={18}
                            placeholder='Add Resi'
                            onChangeText={x => setKey(x)}
                            onSubmitEditing={x => {
                                let barcode = x.nativeEvent.text.trim();


                                __insertData(barcode)
                            }}
                            autoCapitalize="none"
                            style={{
                                backgroundColor: colors.white,
                                borderColor: colors.primary,
                                borderRadius: 10,
                                borderWidth: 1,
                                paddingLeft: 10,
                                color: colors.black,
                                fontSize: MyDimensi / 25,
                                fontFamily: fonts.primary[400],
                            }}
                        />

                    </View>
                    <View style={{
                        flex: 0.7,
                        paddingLeft: 5,
                        position: 'relative'
                    }}>

                        <MyInput value={customer} onChangeText={x => {
                            setCustomer(x)
                        }} nolabel backgroundColor={colors.white} borderWidth={1} borderColor={colors.primary} />
                        <Text style={{
                            fontFamily: fonts.secondary[400],
                            fontSize: MyDimensi / 28,
                            position: 'absolute',
                            // left: 10,
                            left: '35%',
                            top: -15,
                            color: colors.border
                        }}>Scanned by</Text>
                    </View>

                </View>
            </View>
            <View style={{
                flex: 1,
                backgroundColor: '#F7F7F7',

            }}>
                <View style={{
                    marginHorizontal: 10,
                    height: 40,
                    marginVertical: 10,

                    position: 'relative'
                }}>
                    <TextInput
                        placeholder='Cari'

                        onSubmitEditing={x => {
                            let barcode = x.nativeEvent.text.trim();


                            __filterData(barcode)
                        }}
                        autoCapitalize="none"
                        style={{
                            backgroundColor: colors.white,
                            borderColor: colors.primary,
                            borderRadius: 10,
                            borderWidth: 0,
                            paddingLeft: 10,
                            color: colors.black,
                            fontSize: MyDimensi / 30,
                            fontFamily: fonts.primary[400],
                        }}
                    />
                    <View style={{
                        position: 'absolute',
                        right: 10,
                        bottom: 10,
                    }}>
                        <Icon type='ionicon' name='search' size={MyDimensi / 18} />
                    </View>
                </View>

                {loading && <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator size="large" color={colors.primary} />
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: MyDimensi / 30,
                        color: colors.border,
                    }}>Memuat Data</Text>
                </View>}

                {!loading && <FlatList data={data} key={item => item.nama} renderItem={({ item, index }) => {
                    return (
                        <View style={{

                            marginVertical: 5,
                            marginHorizontal: 10,
                            backgroundColor: colors.secondary,
                            borderRadius: 10,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <View style={{ padding: 5, }}>
                                <Image source={{
                                    uri: 'https://member.zavalabs.com/' + item.kurir,
                                    cache: 'only-if-cached',
                                }} style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 10,
                                    resizeMode: 'contain'
                                }} />
                            </View>
                            <View style={{
                                flex: 1,
                                paddingLeft: 10,
                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    fontSize: MyDimensi / 28,
                                    color: colors.border,
                                }}>{item.customer}</Text>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    fontSize: MyDimensi / 28,
                                    color: colors.black,
                                }}>{item.ekspedisi}</Text>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    fontSize: MyDimensi / 25,
                                    color: colors.primary,
                                }}>{item.nama}</Text>
                            </View>
                            <View>
                                <Text style={{
                                    backgroundColor: colors.white,
                                    padding: 5,
                                    borderRadius: 5,
                                    fontFamily: fonts.secondary[600],
                                    fontSize: MyDimensi / 28,
                                    color: '#F08F5F',
                                }}>{item.tanggal} {item.jam}</Text>
                            </View>
                            <TouchableOpacity onPress={(() => {
                                Alert.alert('ZAVASCAN', 'Apakah kamu yakin akan hapus resi ' + item.nama + ' ?', [
                                    { text: 'TIDAK' },
                                    {
                                        text: 'HAPUS',
                                        onPress: () => __deleteData(item.nama)

                                    }
                                ])
                            })} style={{
                                padding: 10,
                            }}>
                                <Icon type='ionicon' name='trash' color={colors.black} size={MyDimensi / 17} />
                            </TouchableOpacity>
                        </View>
                    )
                }} />}
            </View>

            <TouchableOpacity style={{
                position: 'absolute',
                width: 80,
                height: 80,

                backgroundColor: colors.primary,
                borderRadius: 40,
                bottom: 20,
                right: 20,
                justifyContent: 'center',
                alignItems: 'center'

            }} onPress={() => {

                ZavalabsScanner.showBarcodeReader(result => {
                    if (result !== null) {
                        __insertData(result, 'camera')
                    }

                });
            }}>

                <Icon type='ionicon' name='barcode-outline' color={colors.white} size={MyDimensi / 10} />
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: MyDimensi / 30,
                    color: colors.white
                }}>SCAN</Text>

            </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})
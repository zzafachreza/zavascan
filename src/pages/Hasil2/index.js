import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    Alert,
    RefreshControl,
    ActivityIndicator,
    Linking,
} from 'react-native';
import { MyButton, MyGap, MyInput } from '../../components';
import { getData } from '../../utils/localStorage';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import { fonts } from '../../utils/fonts';
import { colors } from '../../utils/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
import RNFetchBlob from 'rn-fetch-blob'
import { WebView } from 'react-native-webview';
const wait = timeout => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
};

export default function Hasil2({ navigation, route }) {
    const cust = route.params;
    const [refreshing, setRefreshing] = React.useState(false);
    const [user, setUser] = useState({});
    const [data, setData] = useState([]);
    const [key, setKey] = useState('');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [awal, setAwal] = useState('');
    const [akhir, setAkhir] = useState('');
    useEffect(() => {
        getData('user').then(res => {
            setUser(res);
            _getData(res.id, cust.key);
        });
    }, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getData('user').then(res => {
            setUser(res);
            _getData(res.id, cust.key);
        });
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const _getData = (id_member, customer) => {
        axios
            .post('https://zavalabs.com/api/zavascan_data2.php', {
                id_member: id_member,
                customer: customer
            })
            .then(res => {
                console.log(res.data);
                setData(res.data);
            });
    };

    const _searchData = (id_member, kata_kunci, customer = cust.key) => {
        setLoading(true);
        axios
            .post('https://zavalabs.com/api/zavascan_data2.php', {
                id_member: id_member,
                customer: customer,
                key: kata_kunci,
            })
            .then(res => {
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
                _getData(id_member, cust.key);
            });
    };


    const _hapusDataAll = (id_member, customer) => {
        axios
            .post('https://zavalabs.com/api/zavascan_delete_customer.php', {
                id_member: id_member,
                customer: customer,
            })
            .then(res => {
                _getData(id_member, cust.key);
            });
    };



    const _renderItem = ({ item, index }) => {
        return (
            <View
                style={{
                    marginVertical: 1,
                    borderRadius: 10,
                    borderBottomWidth: 1,
                    borderColor: colors.primary,
                    padding: 10,
                    overflow: 'hidden',
                    flexDirection: 'row'
                }}>

                <View style={{
                    flex: 1
                }}>
                    <Text
                        style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 16,
                            color: colors.background,
                        }}>
                        {item.nama}
                    </Text>

                    <Text
                        style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 12,
                            color: colors.secondary,
                        }}>
                        {item.ekspedisi}
                    </Text>


                    <Text
                        style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 12,

                            flex: 1,
                            color: colors.black,
                        }}>
                        {item.tanggal} {item.jam}
                    </Text>
                </View>


                <TouchableOpacity
                    style={{
                        backgroundColor: colors.danger,
                        padding: 10,
                        flexDirection: 'row',
                    }}
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
                    }>
                    <Icon type="ionicon" name="trash" size={13} color={colors.white} />
                    <Text style={{ color: colors.white }}>Hapus</Text>
                </TouchableOpacity>

            </View>
        );
    };


    const donwloadData = () => {
        if (awal.length > 1 && akhir.length > 1) {

            // Linking.openURL('https://zavalabs.com/api/zavascan_download_customer.php?id_member=' +
            //     user.id + '&awal=' + awal + '&akhir=' + akhir + '&customer=' + cust.key);

            navigation.navigate('LaporanDownload', {
                url: 'https://zavalabs.com/api/zavascan_download_customer.php?id_member=' +
                    user.id + '&awal=' + awal + '&akhir=' + akhir + '&customer=' + cust.key
            })
            // RNFetchBlob.config({
            //     fileCache: true,
            //     appendExt: 'xlsx'
            // })
            //     .fetch('GET', 'https://zavalabs.com/api/zavascan_download_customer.php?id_member=' +
            //         user.id + '&awal=' + awal + '&akhir=' + akhir + '&customer=' + cust.key)
            //     .then((res) => {
            //         // the temp file path
            //         console.log('The file saved to ', res.path())
            //     })


        } else {
            alert('Silahkan pilih tanggal terlebih dahulu')
        }
    }
    return (
        <SafeAreaView
            style={{
                flex: 1,
                // padding: 10,
                backgroundColor: colors.black,
            }}>

            <ScrollView
                style={{
                    backgroundColor: colors.white,
                    opacity: !open ? 1 : 0.3,
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[colors.primary]}
                    />
                }>
                <View style={{
                    flexDirection: 'row',
                    padding: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 16,
                        flex: 1,
                        textAlign: 'center'
                    }}>{cust.key}</Text>

                    <TouchableOpacity onPress={() => {

                        Alert.alert('', 'Hapus semua resi dari ' + cust.key + ' ini ?', [
                            {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                            },
                            {
                                text: 'OK',
                                onPress: () => {
                                    _hapusDataAll(user.id, cust.key);
                                },
                            },
                        ])

                    }} style={{
                        flexDirection: 'row',
                        justifyConten: 'center',
                        backgroundColor: colors.black,
                        alignItems: 'center',
                        padding: 5,
                    }}>
                        <Icon type='name' name='delete-outline' color={colors.white} />
                        <Text style={{
                            color: colors.white,
                            fontFamily: fonts.secondary[600]
                        }}>Hapus Semua</Text>
                    </TouchableOpacity>
                </View>
                <MyInput
                    label="Pencarian Data"
                    iconname="search"
                    placeholder="masukan kata kunci"
                    value={key}
                    borderRadius={0}
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
            {open && <View style={{
                padding: 10,
                borderTopLeftRadius: 20,
                elevation: 4,
                backgroundColor: '#FFF',

                borderTopRightRadius: 20,
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
                        }}>Download Excel</Text>
                    </View>

                    <TouchableOpacity onPress={() => setOpen(false)} style={{

                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Icon type='ionicon' name='close' size={35} />
                    </TouchableOpacity>
                </View>
                <View>

                    <Text style={{
                        marginVertical: 20,
                        fontFamily: fonts.secondary[600],
                        fontSize: 16,
                    }}>
                        Silahkan Pilih tanggal laporan yang Anda butuhkan
                    </Text>

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
                            onDateChange={(date) => setAkhir(date)}
                        />
                    </View>

                    <MyGap jarak={20} />
                    <MyButton onPress={donwloadData} Icons="download-outline" title="Download Excel" warna={colors.success} />

                </View>
            </View>}

            {!open && <MyButton borderRadius={0} onPress={() => setOpen(true)} title="Exprort To Excel" warna={colors.black} Icons="download-outline" />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});

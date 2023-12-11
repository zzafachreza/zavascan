import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    Picker,
    Alert,
    FlatList,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { MyInput, MyGap, MyButton } from '../../components';
import { getData } from '../../utils/localStorage';
import axios from 'axios';
import { colors } from '../../utils/colors';
import { showMessage } from 'react-native-flash-message';
import DropDownPicker from 'react-native-dropdown-picker';
import { Icon } from 'react-native-elements';
import { fonts } from '../../utils/fonts';
import LottieView from 'lottie-react-native';
import { Button } from 'react-native-elements/dist/buttons/Button';
import Sound from 'react-native-sound';

var whoosh = new Sound(
    require('../../assets/salah.mp3'),
    Sound.MAIN_BUNDLE,
).release();

var whoosh2 = new Sound(
    require('../../assets/oke.mp3'),
    Sound.MAIN_BUNDLE,
).release();

export default function SerahTerimaScan({ navigation }) {
    useEffect(() => {
        getData('user').then(res => {
            setUser(res);

            getData('customer').then(res2 => {
                setCustomer(res2);
                _getData(res.id, res2);
            });
        });

    }, []);



    const [key, setKey] = useState('');
    const [user, setUser] = useState({});
    const [customer, setCustomer] = useState('');
    const [loading, setLoading] = useState(false);
    const _kirimData = () => {
        if (key.length == 0) {
            showMessage({
                message: 'Form masih kosong !',
                type: 'danger',
            });
        } else {
            const kirim = {
                id_member: user.id,
                customer: customer,
                key: key,
            };

            axios
                .post('https://zavalabs.com/api/zavascan_kamera_add_retur.php', kirim)
                .then(res => {
                    setKey('');
                    ref_input.current.focus();
                    console.log(res.data);
                    if (res.data.status == 404) {
                        showMessage({
                            type: 'danger',
                            message: key + ' Sudah Pernah Di Scan !',
                        });
                        whoosh.play();
                        // alert(cek);
                    } else {
                        showMessage({
                            type: 'success',
                            message: key + ' Berhasil Simpan Data',
                        });
                        _getData(user.id, customer);

                    }
                });


        }
    };


    const ref_input = useRef();
    const [jml, setJML] = useState(0);
    const [data, setData] = useState([]);

    const _getData = (id_member, customer) => {
        axios
            .post('https://zavalabs.com/api/zavascan_data_new_retur.php', {
                id_member: id_member,
                customer: customer
            })
            .then(res => {
                console.log('jml', res.data[0].kode)
                setJML(res.data[0].kode);
                setData(res.data);
            });
    };
    const _renderItem = ({ item, index }) => {
        return (
            <View
                style={{
                    marginVertical: 2,
                    borderBottomWidth: 1,
                    borderColor: colors.success,
                    //   padding: 10,
                    overflow: 'hidden',
                }}>
                <View
                    style={{
                        backgroundColor: colors.white,
                        justifyContent: 'center',
                        flexDirection: 'row',
                        padding: 10,
                    }}>
                    <View style={{ flex: 1 }}>
                        <Text
                            style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: 14,
                                color: colors.primary,
                            }}>
                            {item.nama}
                        </Text>
                        <Text
                            style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: 14,
                                color: colors.black,
                            }}>
                            {item.customer}
                        </Text>
                    </View>

                    <Text
                        style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 12,
                            color: colors.secondary,
                        }}>
                        {item.ekspedisi}
                    </Text>
                </View>
            </View>
        );
    };

    const _hapusData = (id_member, id) => {
        axios
            .post('https://zavalabs.com/api/zavascan_delete.php', {
                id_member: id_member,
                id: id,
            })
            .then(res => {
                _getData(id_member, customer);
            });
    };



    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}>
            <ScrollView>
                <View
                    style={{
                        padding: 10,
                    }}>


                    <View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingVertical: 5,
                            }}>
                            <Icon
                                type="ionicon"
                                name="barcode"
                                color={colors.success}
                                size={16}
                            />
                            <Text
                                style={{
                                    fontFamily: fonts.secondary[600],
                                    color: colors.success,
                                    left: 10,
                                    fontSize: 14,
                                }}>
                                Masukan Barcode / Resi ( {customer} ) / {jml}
                            </Text>
                        </View>
                        <TextInput
                            autoFocus
                            value={key}
                            onChangeText={val => setKey(val)}
                            onSubmitEditing={_kirimData}
                            style={{
                                borderColor: colors.success,
                                borderRadius: 10,
                                borderWidth: 1,
                                paddingLeft: 10,
                                fontSize: 18,
                                fontFamily: fonts.primary[400],
                            }}
                            ref={ref_input}
                        />
                    </View>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12,
                        marginVertical: 5,
                    }}>Resi Dibawah adalah resi serah terima terakhir perhari ini</Text>
                    <FlatList data={data} renderItem={_renderItem} />
                </View>




                {loading && (
                    <View
                        style={{
                            margin: 10,
                        }}>
                        <ActivityIndicator color={colors.primary} />
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    picker: {
        width: 200,
        backgroundColor: '#FFF0E0',
        borderColor: 'black',
        borderWidth: 1,
    },
    pickerItem: {
        color: 'red',
    },
    onePicker: {
        width: 200,
        height: 44,
        backgroundColor: '#FFF0E0',
        borderColor: 'black',
        borderWidth: 1,
    },
    onePickerItem: {
        height: 44,
        color: 'red',
    },
    twoPickers: {
        width: 200,
        height: 88,
        backgroundColor: '#FFF0E0',
        borderColor: 'black',
        borderWidth: 1,
    },
    twoPickerItems: {
        height: 88,
        color: 'red',
    },
});

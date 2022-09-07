import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,
    TouchableOpacity,
    Dimensions,
    Alert,
    ActivityIndicator,
    ImageBackground,
    Image,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Icon, ListItem } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { colors } from '../../utils/colors';
import { getData } from '../../utils/localStorage';
import axios from 'axios';
import BarcodeMask from 'react-native-barcode-mask';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { fonts } from '../../utils/fonts';
import ZavalabsScanner from 'react-native-zavalabs-scanner'


var whoosh = new Sound(
    require('../../assets/salah.mp3'),
    Sound.MAIN_BUNDLE,
).release();

var whoosh2 = new Sound(
    require('../../assets/oke.mp3'),
    Sound.MAIN_BUNDLE,
).release();



export default function SerahTerima() {

    const [barcode, setBarcode] = useState('');

    const [user, setUser] = useState({});
    const [customer, setCustomer] = useState('');

    useEffect(() => {
        getData('user').then(res => {
            setUser(res);
            console.log(res);
        });
        getData('customer').then(res => {
            setCustomer(res);
        })
    }, []);

    const [kurir, setKurir] = useState({
        kurir: '',
        foto: '',
        resi: ''
    })

    const openScanner = () => {
        ZavalabsScanner.showBarcodeReader(result => {
            // console.log('barcode : ', result);

            if (result !== null) {
                const kirim = {
                    id_member: user.id,
                    key: result,
                    customer: customer
                };

                axios
                    .post('https://zavalabs.com/api/zavascan_kamera_add_retur.php', kirim)
                    .then(res => {
                        console.warn(res.data);
                        setKurir(res.data)
                        if (res.data.status == 404) {
                            showMessage({
                                message: 'Sudah pernah discan',
                                type: 'danger',
                            });

                            whoosh.play();
                        } else {
                            showMessage({
                                message: 'Berhasil disimpan !',
                                type: 'success',
                            });

                            // whoosh2.play();
                        }

                        setTimeout(() => {
                            openScanner();
                        }, 2000);

                    });
                setBarcode(result);
            }



        });
    };






    return (
        <View style={styles.container}>
            <Image style={{
                width: '100%',
                height: 300,
                resizeMode: 'contain'
            }} source={{
                uri: kurir.foto
            }} />
            <View style={styles.row}>
                <Text style={styles.textResult}>Nomor Resi</Text>
                <Text style={styles.textDot}>:</Text>
                <Text style={styles.textBarcode}>{kurir.resi}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.textResult}>Expedisi</Text>
                <Text style={styles.textDot}>:</Text>
                <Text style={styles.textBarcode}>{kurir.kurir}</Text>
            </View>
            <TouchableOpacity onPress={openScanner} style={styles.button}>
                <Text style={styles.textScan}>SCAN BARCODE</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        // justifyContent: 'center',
    },
    button: {
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
        borderRadius: 10,
    },
    textResult: {
        flex: 0.5,
        fontSize: 20,
        color: 'black'
    },
    textDot: {
        flex: 0.1,
        fontSize: 20,
        color: 'black'
    },
    textBarcode: {
        flex: 1,
        fontSize: 25,
        color: 'black'
    },
    textScan: {
        fontSize: 20,
        color: 'white'
    },
    row: {
        padding: 10,
        flexDirection: 'row'
    }
})
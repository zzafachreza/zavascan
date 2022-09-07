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
} from 'react-native';
import BarcodeZxingScan from "react-native-barcode-zxing-scan";
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { fonts } from '../../utils/fonts';
import { colors } from '../../utils/colors';
import { getData } from '../../utils/localStorage';
import axios from 'axios';
import { Icon, ListItem } from 'react-native-elements';
var whoosh = new Sound(
    require('../../assets/salah.mp3'),
    Sound.MAIN_BUNDLE,
).release();


export default function Kamera({ navigation, route }) {

    const barcodeScanned = (data) => {
        console.log("Barcode ", data);

        // setOpenCamera(false);
        // setLoading(true);
        // const kirim = {
        //   id_member: user.id,
        //   key: data,
        //   customer: customer
        // };

        // axios
        //   .post('https://zavalabs.com/api/zavascan_kamera_add.php', kirim)
        //   .then(res => {
        //     console.log(res);
        //     if (res.data == 404) {
        //       showMessage({
        //         message: 'Sudah pernah discan',
        //         type: 'danger',
        //       });

        //       whoosh.play();
        //     } else {
        //       showMessage({
        //         message: 'Berhasil disimpan !',
        //         type: 'success',
        //       });
        //       // whoosh2.play();
        //     }
        //     setTimeout(() => {
        //       setOpenCamera(true);
        //     }, 1200);
        //   });

        // setlampu(false);
    };



    const [customer, setCustomer] = useState('');
    //   alert(data.id);
    const [openCamera, setOpenCamera] = useState(true);
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [lampu, setlampu] = useState(false);
    const [key, setKey] = useState('');
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);

    BarcodeZxingScan.showQrReader(x => {
        console.log('barcode', x)
    });
    return (
        <View style={{
            padding: 10,
        }}>

        </View>
    )
}
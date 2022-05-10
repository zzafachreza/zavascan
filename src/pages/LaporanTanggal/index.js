import React, { useEffect, useState, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    SafeAreaView,
    PermissionsAndroid,
} from 'react-native';
import { fonts } from '../../utils/fonts';
import { WebView } from 'react-native-webview';
import { getData } from '../../utils/localStorage';
import { Icon } from 'react-native-elements';
import { colors } from '../../utils/colors';

export default function LaporanTanggal({ navigation, route }) {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [user, setUser] = useState({});
    useEffect(() => {
        getData('user').then(res => {
            setUser(res);
            console.log(res);
        });
    }, []);

    const webViewRef = useRef(null);

    const goback = () => {
        webViewRef.current.goBack();
    };

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "Write file Permission",
                    message:
                        "Izinkan Aplikasi untuk menyimpan data " +
                        "Supaya bisa download laporan.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera");
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    }

    useEffect(() => {
        requestCameraPermission();
    }, [])
    return (
        <SafeAreaView
            style={{
                flex: 1,
                // padding: 10,
            }}>
            <WebView
                ref={webViewRef}
                injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
                scalesPageToFit={false}
                source={{
                    uri:
                        'https://zavalabs.com/api/zavascan_data_tanggal.php?id_member=' +
                        user.id,
                }}
            />
            <View style={styles.navbar}>
                <View style={styles.back}>
                    <Icon
                        name="arrow-back-outline"
                        size={30}
                        color={colors.white}
                        type="ionicon"
                        onPress={goback}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    navbar: {
        height: 50,
        width: '100%',
        padding: 10,
        flexDirection: 'row-reverse',
        backgroundColor: colors.primary,
    },
    back: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    forward: {
        width: 50,
        height: 50,
    },
});

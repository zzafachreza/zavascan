import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ActivityIndicator,
} from 'react-native';
import WebView from 'react-native-webview';
import { colors } from '../../utils/colors';
import { APIurl, getData, urlWeb } from '../../utils/localStorage';

export default function LaporanByEkspedisi({ route }) {

    const item = route.params;
    const [user, setUser] = useState({});
    const [visible, setVisible] = useState(true);

    const hideSpinner = () => {
        setVisible(false);
    };

    const myUrl = urlWeb + 'laporan/by_expedisi?id_member=' +
        item.id_member + '&awal=' + item.awal + '&akhir=' + item.akhir
    return (
        <SafeAreaView
            style={{
                flex: 1,
                // padding: 10,
            }}>
            <WebView
                onLoad={hideSpinner}
                injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'); meta.setAttribute('name', 'viewport'); `}
                scalesPageToFit={false}
                source={{
                    uri: myUrl,
                }}
            />
            {visible && (
                <View
                    style={{
                        flex: 1,
                        position: 'absolute',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#FFF',
                        width: '100%',
                        tåop: 0,
                        opacity: 0.7,
                        height: '100%',
                    }}>
                    <ActivityIndicator color={colors.primary} size="large" />
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});

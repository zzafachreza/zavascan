import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Dimensions,
    Animated,
} from 'react-native';
import { fonts } from '../../utils/fonts';
import LottieView from 'lottie-react-native';
import { MyButton } from '../../components';
import { colors } from '../../utils/colors';
import { WebView } from 'react-native-webview';


export default function LaporanDownload({ navigation, route }) {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const txt = new Animated.Value(-windowWidth);
    const item = route.params;
    Animated.timing(txt, {
        toValue: 10,
        duration: 800,
        useNativeDriver: false,
    }).start();

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: colors.white
            }}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    paddingBottom: 100,
                }}>
                <LottieView
                    source={require('../../assets/success.json')}
                    autoPlay
                    loop={false}
                />

            </View>
            <WebView style={{
                height: 100,
            }} source={{ uri: item.url }} />
            <Animated.Text
                style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: windowWidth / 22,
                    color: 'black',
                    bottom: txt,
                    textAlign: 'center'
                }}>
                Download Excel Berhasil
            </Animated.Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});

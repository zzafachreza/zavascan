import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {fonts} from '../../utils/fonts';
import {WebView} from 'react-native-webview';

export default function Berita({navigation, route}) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const item = route.params;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        // padding: 10,
      }}>
      <WebView
        injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
        scalesPageToFit={false}
        source={{
          uri: item.url,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

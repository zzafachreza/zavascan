import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import LottieView from 'lottie-react-native';
import {getData} from '../../utils/localStorage';
import {FlatListSlider} from 'react-native-flatlist-slider';
import {Preview} from '../../components';
import {Icon} from 'react-native-elements';
import MyNews from '../../components/MyNews';

export default function Home({navigation}) {
  const images = [
    {
      image: 'https://kipmi.or.id/wp-content/uploads/2016/11/beton1.jpg',
    },
    {
      image: 'https://kipmi.or.id/wp-content/uploads/2017/01/molen-kecil.jpg',
    },
    {
      image: 'https://kipmi.or.id/wp-content/uploads/2016/11/beton8.jpg',
    },
  ];

  const [data, setData] = useState([
    {
      id: 0,
      image:
        'https://sikomarjabar.com/admin/upload/210304055804suaka-elang-loji-bogor-jawa-barat.jpg',
    },
    // {
    //   id: 1,
    //   image:
    //     'https://sikomarjabar.com/admin/upload/210304055856geopark-Ciletuh.jpg',
    // },
  ]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    getData('user').then(res => {
      console.log(res);
      setUser(res);
    });
  }, []);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const ratio = 192 / 108;
  const _renderItem = ({item, index}) => {
    return (
      <Image
        resizeMode="contain"
        source={{uri: item.image}}
        style={{
          width: windowWidth,
          height: Math.round((windowWidth * 9) / 16),
        }}
      />
    );
  };
  return (
    <ImageBackground
      source={require('../../assets/back-beton.png')}
      style={{
        flex: 1,
      }}>
      <ScrollView>
        <FlatListSlider
          data={images}
          width={windowWidth}
          timer={5000}
          contentContainerStyle={{
            borderRadius: 20,
          }}
          indicatorInActiveColor={colors.secondary}
          // component={<Preview />}
          // onPress={item => alert(JSON.stringify(item))}
          indicatorActiveWidth={20}
          indicatorActiveColor={colors.primary}
        />
        <View
          style={{
            marginTop: 10,
            // backgroundColor: colors.primary,
            // borderWidth: 1,
            padding: 10,
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 25,
              maxWidth: '80%',
              color: colors.primary,
            }}>
            Selamat datang,
          </Text>
          <Text
            style={{
              marginTop: 2,
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 25,
              maxWidth: '80%',
              color: colors.primary,
            }}>
            {user.nama_lengkap}
          </Text>

          <View
            style={{
              // backgroundColor: 'red',
              // padding: 10,
              marginVertical: 10,
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('List')}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                height: windowHeight / 10,
                backgroundColor: colors.primary,
                borderRadius: 10,
                marginRight: 5,
                flexDirection: 'row',
              }}>
              <Icon
                type="ionicon"
                name="folder"
                color={colors.white}
                size={windowWidth / 20}
              />

              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  color: colors.white,
                  fontSize: windowWidth / 28,
                  left: 10,
                }}>
                LIHAT DATA
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Tambah')}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                height: windowHeight / 10,
                backgroundColor: colors.secondary,
                marginLeft: 5,
                borderRadius: 10,
                flexDirection: 'row',
              }}>
              <Icon
                type="ionicon"
                name="file-tray-full"
                color={colors.white}
                size={windowWidth / 20}
              />

              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  color: colors.white,
                  left: 10,
                  fontSize: windowWidth / 28,
                }}>
                TAMBAH
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            // backgroundColor: colors.primary,
            // padding: 20,
            padding: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              // justifyContent: 'center',
              alignItems: 'center',
              // paddingVertical: 5,
            }}>
            <Icon type="ionicon" name="map" color={colors.primary} size={16} />
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                color: colors.primary,
                left: 10,
                fontSize: 16,
              }}>
              KUMPULAN BERITA
            </Text>
          </View>
          <MyNews />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

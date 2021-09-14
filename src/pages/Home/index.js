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
import {Preview, MyDashboard} from '../../components';
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

  const [user, setUser] = useState([]);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    getData('user').then(res => {
      console.log(res);
      setUser(res);
    });

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(
      date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
    );
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}>
      <View
        style={{
          padding: 10,
          height: windowHeight / 8,
          flexDirection: 'row',
        }}>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 25,
              maxWidth: '80%',
              color: colors.white,
            }}>
            Selamat datang,
          </Text>
          <Text
            style={{
              marginTop: 2,
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 22,
              maxWidth: '80%',
              color: colors.white,
            }}>
            {user.nama_lengkap}
          </Text>
          <Text
            style={{
              marginTop: 2,
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 27,
              maxWidth: '80%',
              color: colors.white,
            }}>
            {user.email}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
          }}>
          <Icon
            type="ionicon"
            name="notifications"
            color={colors.white}
            size={windowWidth / 15}
          />
        </View>
      </View>
      <ImageBackground
        source={require('../../assets/back.jpeg')}
        style={{
          flex: 1,
          backgroundColor: colors.white,
          justifyContent: 'center',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <MyDashboard />
      </ImageBackground>
    </SafeAreaView>
  );
}

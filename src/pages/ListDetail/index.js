import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';

export default function ListDetail({route}) {
  const item = route.params;
  return (
    <ImageBackground
      source={require('../../assets/back-beton.png')}
      style={{
        flex: 1,
        padding: 10,
      }}>
      <View
        style={{
          //   flex: 1,
          padding: 10,
          borderRadius: 10,
          marginVertical: 10,
          backgroundColor: colors.white,
          elevation: 1,
        }}>
        <Text style={styles.title}>{item.nama}</Text>
        <Text style={styles.date}>{item.tanggal}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View style={styles.card}>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
                fontSize: 12,
              }}>
              Air Temperature
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontFamily: fonts.secondary[600],
              }}>
              {item.tc} deg C
            </Text>
          </View>
          <View style={styles.card}>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
                fontSize: 12,
              }}>
              Concrete Temperature
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontFamily: fonts.secondary[600],
              }}>
              {item.ta} deg C
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
          }}>
          <View style={styles.card}>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
                fontSize: 12,
              }}>
              Relative Humidity
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontFamily: fonts.secondary[600],
              }}>
              {item.r}%
            </Text>
          </View>
          <View style={styles.card}>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
                fontSize: 12,
              }}>
              Wind Velocity
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontFamily: fonts.secondary[600],
              }}>
              {item.v} kph
            </Text>
          </View>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: colors.primary,
            borderRadius: 10,
            // flex: 1,
            justifyContent: 'center',
            height: 80,
            margin: 5,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[400],
              fontSize: 12,
            }}>
            Evaporation Rate
          </Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontSize: 18,
                lineHeight: 30,
                fontFamily: fonts.secondary[600],
              }}>
              {item.e} kg/m
            </Text>
            <Text
              style={{
                fontSize: 12,
                lineHeight: 25,
                fontFamily: fonts.secondary[600],
              }}>
              2
            </Text>
            <Text
              style={{
                fontSize: 18,
                lineHeight: 30,
                fontFamily: fonts.secondary[600],
              }}>
              /hr
            </Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: colors.primary,

    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    height: 80,
    margin: 5,
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.secondary[600],
    fontSize: 12,
    textAlign: 'center',
  },
  date: {
    fontFamily: fonts.secondary[400],
    fontSize: 12,
    textAlign: 'center',
  },
});

import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    Image,
    Alert,
    RefreshControl,
    ActivityIndicator,
} from 'react-native';
import { MyInput } from '../../components';
import { getData } from '../../utils/localStorage';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import { fonts } from '../../utils/fonts';
import { colors } from '../../utils/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';

const wait = timeout => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
};

export default function Kurir() {
    const [refreshing, setRefreshing] = React.useState(false);
    const [user, setUser] = useState({});
    const [data, setData] = useState([]);
    const [key, setKey] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getData('user').then(res => {
            setUser(res);
            _getData();
        });
    }, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getData('user').then(res => {
            setUser(res);
            _getData();
        });
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const _getData = () => {
        axios
            .post('https://zavalabs.com/api/zavascan_data_kurir.php')
            .then(res => {
                setData(res.data);
            });
    };

    const _searchData = (kata_kunci) => {
        setLoading(true);
        axios
            .post('https://zavalabs.com/api/zavascan_data_kurir.php', {
                key: kata_kunci,
            })
            .then(res => {
                console.log(res.data);
                setTimeout(() => {
                    setData(res.data);
                    setLoading(false);
                }, 500);
            });
    };



    const _renderItem = ({ item, index }) => {
        return (
            <View
                style={{
                    marginVertical: 10,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: colors.primary,
                    //   padding: 10,
                    overflow: 'hidden',
                }}>
                <View
                    style={{
                        backgroundColor: colors.white,
                        justifyContent: 'center',

                        padding: 10,
                    }}>
                    <Text
                        style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 14,
                            color: colors.background,
                        }}>
                        {item.nama}
                    </Text>
                    <Image source={{
                        uri: item.image
                    }} style={{
                        height: 80,
                        resizeMode: 'contain',
                    }} />


                </View>




            </View>
        );
    };
    return (
        <SafeAreaView
            style={{
                flex: 1,
                padding: 10,
                backgroundColor: colors.white,
            }}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[colors.primary]}
                    />
                }>
                <MyInput
                    label="Pencarian Data"
                    iconname="search"
                    placeholder="masukan kata kunci"
                    value={key}
                    onChangeText={value => setKey(value)}
                    onSubmitEditing={() => _searchData(key)}
                />
                {loading && (
                    <View
                        style={{
                            margin: 10,
                        }}>
                        <ActivityIndicator color={colors.primary} />
                    </View>
                )}
                {!loading && <FlatList data={data} renderItem={_renderItem} />}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});

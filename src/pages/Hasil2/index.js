import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
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

export default function Hasil2({ route }) {
    const cust = route.params;
    const [refreshing, setRefreshing] = React.useState(false);
    const [user, setUser] = useState({});
    const [data, setData] = useState([]);
    const [key, setKey] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getData('user').then(res => {
            setUser(res);
            _getData(res.id, cust.key);
        });
    }, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getData('user').then(res => {
            setUser(res);
            _getData(res.id);
        });
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const _getData = (id_member, customer) => {
        axios
            .post('https://zavalabs.com/api/zavascan_data2.php', {
                id_member: id_member,
                customer: customer
            })
            .then(res => {
                console.log(res.data);
                setData(res.data);
            });
    };

    const _searchData = (id_member, kata_kunci, customer = cust.key) => {
        setLoading(true);
        axios
            .post('https://zavalabs.com/api/zavascan_data2.php', {
                id_member: id_member,
                customer: customer,
                key: kata_kunci,
            })
            .then(res => {
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
                    marginVertical: 1,
                    borderRadius: 10,
                    borderBottomWidth: 1,
                    borderColor: colors.primary,
                    padding: 10,
                    overflow: 'hidden',
                }}>

                <Text
                    style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 16,
                        color: colors.background,
                    }}>
                    {item.nama}
                </Text>

                <Text
                    style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12,
                        color: colors.secondary,
                    }}>
                    {item.ekspedisi}
                </Text>


                <Text
                    style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12,

                        flex: 1,
                        color: colors.black,
                    }}>
                    {item.tanggal} {item.jam}
                </Text>

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
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 16,
                    textAlign: 'center'
                }}>{cust.key}</Text>
                <MyInput
                    label="Pencarian Data"
                    iconname="search"
                    placeholder="masukan kata kunci"
                    value={key}
                    onChangeText={value => setKey(value)}
                    onSubmitEditing={() => _searchData(user.id, key)}
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

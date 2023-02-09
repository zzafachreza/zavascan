import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon, ListItem, Button } from 'react-native-elements';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { TextInput } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native';

export default function MyInput({
  label,
  iconname,
  onChangeText,
  autoFocus,
  value,
  keyboardType,
  secureTextEntry,
  onSubmitEditing,
  styleInput,
  borderRadius = 10,
  ref,
  placeholder,
  styleLabel,
  colorIcon = colors.primary,
}) {



  const [tutup, setTutup] = useState(true);

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 5,
        }}>
        <Icon type="ionicon" name={iconname} color={colorIcon} size={16} />
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            color: colors.primary,
            left: 10,
            fontSize: 16,
            ...styleLabel,
          }}>
          {label}
        </Text>
      </View>
      <TextInput
        ref={ref}
        autoFocus={autoFocus}
        onSubmitEditing={onSubmitEditing}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry ? tutup : false}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        style={{
          borderColor: colors.primary,
          borderRadius: borderRadius,
          borderWidth: 1,
          paddingLeft: 10,
          fontSize: 18,
          fontFamily: fonts.primary[400],
          ...styleInput,
        }}
      />
      {secureTextEntry &&
        <TouchableOpacity onPress={() => {
          if (tutup) {
            setTutup(false);
          } else {
            setTutup(true);
          }
        }} style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          paddingHorizontal: 20,
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}>
          <Icon type="ionicon" name={!tutup ? 'eye-off' : 'eye'} color={colorIcon} size={18} />
        </TouchableOpacity>}
    </>
  );
}

const styles = StyleSheet.create({});

import { StyleSheet, View, TextInput } from "react-native";
import React from "react";
import Text from '../../Components/Atoms/Text';
import { useTheme } from '@react-navigation/native';


const Input = (props) => {
  const theme = useTheme();
  const handleTextChange = (value) => {
    props.onChange(value);
  };
  return (
    <View>
        <Text style={{fontWeight: 'bold'}}>{props.label}</Text>
        <TextInput value={props.value} onChangeText={handleTextChange} {...props} style={{color: theme.colors.text}} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({});

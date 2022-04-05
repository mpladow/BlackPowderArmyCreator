import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

const Input = (props) => {
  const handleTextChange = (value) => {
    props.onChange(value);
  };
  return (
    <View>
        <Text style={{fontWeight: 'bold'}}>{props.label}</Text>
        <TextInput value={props.value} onChangeText={handleTextChange} {...props} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({});

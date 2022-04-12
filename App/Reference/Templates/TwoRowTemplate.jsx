import { StyleSheet, View } from "react-native";
import React from "react";
import Text from "../../Components/Atoms/Text";

const TwoRowTemplate = ({ item }) => {
    console.log(item);
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
      <View style={{flex: .5, paddingLeft: 8}}>
        <Text>{item.col1}</Text>
      </View>
      <View style={{flex: 4}}>
      <Text>{item.col2}</Text>
      </View>
    </View>
  );
};

export default TwoRowTemplate;

const styles = StyleSheet.create({});

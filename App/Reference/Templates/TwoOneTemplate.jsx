import { StyleSheet, View } from "react-native";
import React from "react";
import Text from "../../Components/Atoms/Text";

const TwoOneTemplate = ({ item }) => {
    console.log(item, 'ITEM')
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
      <View style={{flex: 6, paddingLeft: 8}}>
        <Text>{item.col1}</Text>
      </View>
      <View style={{flex: 1, alignItems: 'flex-end'}}>
      <Text>{item.col2}</Text>
      </View>
    </View>
  );
};

export default TwoOneTemplate;

const styles = StyleSheet.create({});

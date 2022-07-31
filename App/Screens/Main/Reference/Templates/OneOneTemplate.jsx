import { StyleSheet, View } from "react-native";
import React from "react";
import Text from "../../../../Components/Atoms/Text";

const OneOneTemplate = ({ item }) => {
    console.log(item, 'ITEM')
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
      <View style={{flex: 1, paddingLeft: 8, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
        <Text>{item.col1}</Text>
      </View>
      <View style={{flex: 1.5, alignItems: 'flex-end'}}>
      <Text>{item.col2}</Text>
      </View>
    </View>
  );
};

export default OneOneTemplate;

const styles = StyleSheet.create({});

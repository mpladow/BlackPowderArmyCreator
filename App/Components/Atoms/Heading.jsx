import { StyleSheet, View } from "react-native";
import React from "react";
import Text from "./Text";
import { useTheme } from "@react-navigation/native";

const Heading = (props) => {
  const theme = useTheme();

  const getSize = () => {
    switch (props.size) {
      case 1:
        return 24;
        break;
      case 2:
        return 20;
        break;
      case 3:
        return 16;
        break;
      default:
        break;
    }
  };
  return (
    <View style={{paddingBottom: 4}}>
      <Text
        {...props}
        style={[
          { color: theme.colors.text, fontSize:getSize(), fontFamily: "NotoSans_700Bold" },
          props.style,
        ]}
      >
        {props.children}
      </Text>
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({});

import { StyleSheet, View, Pressable } from "react-native";
import React, { useState } from "react";
import TextContainer from "../Components/Atoms/TextContainer";
import Text from "../Components/Atoms/Text";
import { commonStyles } from "../../Constants/Styling";
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

const Summary = () => {
  const [turn, setTurn] = useState(1);
  const [currentPlayer, setCurrentPlayer] = useState();
  const incrementTurn = () => {
    let _turn = turn+ 1;

    setTurn(_turn);
  };
  const theme = useTheme();
  const decrementTurn = () => {
    console.log('decrement pressed')
    let _turn = turn - 1;
    if (_turn <= 0)
    _turn = 0;
    setTurn(_turn);
  };
  return (
    <View>
      <TextContainer>
        <Text>Turn Tracker</Text>
        <View style={styles.trackerContainer}>
            <Pressable onPress={decrementTurn}>
          <View style={styles.trackerButton}>
          <AntDesign name="minus" size={24} color={theme.colors.text} />
                    </View>
            </Pressable>
          <View style={styles.trackerValue}>
            <Text style={{fontSize: 32}}>{turn}</Text>
          </View>
             <Pressable onPress={incrementTurn}>
          <View style={styles.trackerButton}>
          <AntDesign name="plus" size={24} color={theme.colors.text} />
                    </View>
            </Pressable>
        </View>
      </TextContainer>
    </View>
  );
};

export default Summary;

const styles = StyleSheet.create({
  trackerContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
  },
  trackerButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: commonStyles.padding * 2,
  },
  trackerValue: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: commonStyles.padding * 2,
  },
});

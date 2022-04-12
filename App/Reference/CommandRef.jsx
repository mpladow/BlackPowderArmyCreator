import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Heading from "../Components/Atoms/Heading";
import { useReferenceContext } from "../../Contexts/ReferenceContext";
import TwoRowTemplate from "./Templates/TwoRowTemplate";

const CommandRef = () => {
  const referenceContext = useReferenceContext();
  const [commandReferences, setCommandReferences] = useState([]);
  useEffect(() => {
    // get references
    let _commandReferences = referenceContext.references.filter(
      (item) => (item.category = "Command")
    );
    setCommandReferences(_commandReferences);
    console.log(commandReferences);
  }, []);
  const renderRows = (item) => {
    console.log(item, 'ITEM')
    switch (item.template) {
      case "twoRow":
        return <TwoRowTemplate item={item} />;
        break;

      default:
        return <TwoRowTemplate item={item} />;
        break;
    }
  };
  return (
    <View>
      {commandReferences.map((item, index) => (
        <>
          <Heading size={4}>{item.mainHeading}</Heading>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={item.rows}
            renderItem={(item) => (renderRows(item.item))}
          />
        </>
      ))}
      <View></View>
    </View>
  );
};

export default CommandRef;

const styles = StyleSheet.create({});

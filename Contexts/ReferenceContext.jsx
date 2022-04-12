import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import { colors } from "../Constants/Styling";

const ReferenceContext = createContext(undefined);

const ReferenceProvider = ({ children }) => {
  // Manage theme state
  const [dotPointReferences, setDotPointRefereces] = useState([]);
  const [singleRowReferences, setSingleRowReferences] = useState([]);
  const [twoRowReferences, setTwoRowReferences] = useState([]);

  const [references, setReferences] = useState([]);

  const DEFAULT_DATA = [
    {
      id: 1,
      seq: 1,
      category: "Command",
      mainHeading: "Command modifiers",
      rows: [
        { seq: 1, template: 'twoRow', col1: '-1', col2: "Per 12'' distance from commander to unit" },
        {
          seq: 2,
          col1: '-1',
          col2: 'Enemy unit within 12" of unit receiving order',
        },
        { seq: 3,  template: 'twoRow',col1: '+1', col2: "Attack Column" },
        {
          seq: 4,
          template: 'twoRow',
          col1: '+1',
          col2: "March Column/Limbered Artillery unless on road or track",
        },
        {
          seq: 5,
          template: 'twoRow',
          col1: '+2',
          col2: "March Column/Limbered Artillery on road or track",
        },
      ],
    },
  ];
  useEffect(() => {
    setReferences(DEFAULT_DATA);
  }, []);
  return (
    <ReferenceContext.Provider
      value={{
        references
      }}
    >
      {children}
    </ReferenceContext.Provider>
  );
};
export const useReferenceContext = () => {
  const context = useContext(ReferenceContext);
  if (!context) {
    throw new Error("useTheme can only be used wtihin an ArmyProvider");
  }
  return context;
};
export default ReferenceProvider;

const styles = StyleSheet.create({});

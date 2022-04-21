import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import { colors } from "../Constants/Styling";

const ReferenceContext = createContext(undefined);

const ReferenceProvider = ({ children }) => {
  // Manage theme state
  const [references, setReferences] = useState([]);

  const DEFAULT_DATA = [
    {
      id: 1,
      seq: 1,
      category: "Command",
      rows: [
        {
          seq: 1,
          heading: "Command modifiers",
          template: "one-two",
          col1: "-1",
          col2: "Per 12'' distance from commander to unit",
        },
        {
          seq: 2,
          heading: "Command modifiers",
          template: "one-two",
          col1: "-1",
          col2: 'Enemy unit within 12" of unit receiving order',
        },
        {
          seq: 3,
          heading: "Command modifiers",
          template: "one-two",
          col1: "+1",
          col2: "Attack Column",
        },
        {
          seq: 4,
          heading: "Command modifiers",
          template: "one-two",
          col1: "+1",
          col2: "March Column/Limbered Artillery unless on road or track",
        },
        {
          seq: 5,
          heading: "Command modifiers",
          template: "one-two",
          col1: "+2",
          col2: "March Column/Limbered Artillery on road or track",
        },
      ],
    },
    {
      id: 2,
      seq: 2,
      category: "Movement",
      rows: [
        {
          seq: 1,
          heading: "Movement Distances",
          template: "two-one",
          col1: "Infantry, Limbered Foot Artillery, Wagons",
          col2: "12''",
        },
        {
          seq: 2,
          heading: "Movement Distances",

          template: "two-one",
          col1: "Cavalry, Limbered Horse Artillery",
          col2: "18''",
        },
        {
          seq: 3,
          heading: "Movement Distances",

          template: "two-one",
          col1: "Manhandled Artillery",
          col2: "6''",
        },
        {
          seq: 4,
          heading: "Movement Distances",

          template: "two-one",
          col1: "Manhandled Artillery",
          col2: "12''",
        },
        {
          seq: 5,
          heading: "Movement Distances",

          template: "two-one",
          col1: "Commanders on foot",
          col2: "36''",
        },
        {
          seq: 6,
          heading: "Movement Distances",

          template: "two-one",
          col1: "Commanders on horseback",
          col2: "48''",
        },
        {
          heading: "Move Modifiers",
          seq: 7,
          template: "one-one",
          col1: "Woods",
          col2: "Half pace skirmish infantry only",
        },
        {
          heading: "Move Modifiers",
          seq: 8,
          template: "one-one",
          col1: "Rough ground",
          col2: "Half pace infantry/cavalry, skirmishers as normal only",
        },
        {
          heading: "Move Modifiers",
          seq: 8,
          template: "one-one",
          col1: "Crossing obstacle",
          col2: "6'' penalty",
        },
        {
          heading: "Move Modifiers",
          seq: 9,
          template: "one-one",
          col1: "Entering Building",
          col2: "6'' penalty",
        },
        {
          heading: "Move Modifiers",
          seq: 9,
          template: "one-one",
          col1: "March Column",
          col2: "Free move if Command roll failed",
        },
        {
          heading: "Move Modifiers",
          seq: 10,
          template: "one-one",
          col1: "Limbered Artillery",
          col2: "Free move if Command roll failed",
        },
        {
          heading: "Move Modifiers",
          seq: 11,
          template: "one-one",
          col1: "Square",
          col2: "One move if failed Command roll (one move max)",
        },
      ],
    },
    {
      id: 3,
      seq: 3,
      category: "Hand-To-Hand Combat",
      rows: [
        {
          seq: 1,
          heading: "Combat To Hit modifiers",
          extraHeadingText: "hit on roll of 4+",
          template: "one-two",
          col1: "+1",
          col2: "Charging",
        },
        {
          seq: 2,
          heading: "Combat To Hit modifiers",
          extraHeadingText: "hit on roll of 4+",
          template: "one-two",
          col1: "+1",
          col2: "Won last round of combat",
        },
        {
          seq: 3,
          heading: "Combat To Hit modifiers",
          extraHeadingText: "hit on roll of 4+",
          template: "one-two",
          col1: "-1",
          col2: "Shaken or Disordered",
        },
        {
          seq: 4,
          heading: "Combat To Hit modifiers",
          extraHeadingText: "hit on roll of 4+",
          template: "one-two",
          col1: "-1",
          col2: "Skirmishers",
        },
        {
          seq: 5,
          heading: "Combat To Hit modifiers",
          extraHeadingText: "hit on roll of 4+",
          template: "one-two",
          col1: "-1",
          col2: "Engaged to flank or rear",
        },
        {
          seq: 6,
          heading: "Combat Result modifiers",
          template: "one-two",
          col1: "+1",
          col2: "Support to the rear",
        },
        {
          seq: 7,
          heading: "Combat Result modifiers",
          template: "one-two",
          col1: "+1",
          col2: "Per flank support(L/R)",
        },
        {
          seq: 8,
          heading: "Combat Result modifiers",
          template: "one-two",
          col1: "+3",
          col2: "Square vs Cavalry",
        },
        {
          seq: 9,
          heading: "Combat Result modifiers",
          template: "one-two",
          col1: "+1-3",
          col2: "Occupying building(size)",
        },
      ],
    },
    {
      id: 4,
      seq: 4,
      category: "Morale",
      rows: [
        {
          seq: 1,
          heading: "Save Modifiers",
          extraHeadingText: "most troops save on roll of 4+",
          template: "one-two",
          col1: "+1",
          col2: "Infantry in Attack Colum unless hit by artillery",
        },
        {
          seq: 2,
          heading: "Save Modifiers",
          extraHeadingText: "most troops save on roll of 4+",
          template: "one-two",
          col1: "+1",
          col2: "Target within woods, hedgerows or similar (light cover)",
        },
        {
          seq: 3,
          heading: "Save Modifiers",
          extraHeadingText: "most troops save on roll of 4+",
          template: "one-two",
          col1: "+2",
          col2: "Target is within buildings/fortifications (heavy cover)",
        },
        {
          seq: 4,
          heading: "Save Modifiers",
          extraHeadingText: "most troops save on roll of 4+",
          template: "one-two",
          col1: "-2",
          col2: "Target is in March Column",
        }
        ,
        {
          seq: 5,
          heading: "Save Modifiers",
          extraHeadingText: "most troops save on roll of 4+",
          template: "one-two",
          col1: "-1",
          col2: "Hit by artillery fire at long range",
        },
        {
          seq: 3,
          heading: "Save Modifiers",
          extraHeadingText: "most troops save on roll of 4+",
          template: "one-two",
          col1: "-1",
          col2: "hit by artillery fire at close or medium range",
        }
      ],
    },
    ,
    {
      id: 5,
      seq: 5,
      category: "Shooting",
      rows: [
        {
          seq: 1,
          heading: "Ranges",
          template: "two-one",
          col1: "Pistols, Shotguns and Thrown Weapons",
          col2: "6''",
        },
        {
          seq: 2,
          heading: "Ranges",
          template: "two-one",
          col1: "Bow and arrow",
          col2: "12''",
        },
        {
          seq: 3,
          heading: "Ranges",
          template: "two-one",
          col1: "Smoothbore Carbines",
          col2: "12''",
        },
        {
          seq: 4,
          heading: "Ranges",
          template: "two-one",
          col1: "Smoothbore Muskets",
          col2: "18''",
        },
        {
          seq: 5,
          heading: "Ranges",
          template: "two-one",
          col1: "Rifled Carbines",
          col2: "18''",
        },
        {
          seq: 6,
          heading: "Ranges",
          template: "two-one",
          col1: "Rifled Muskets",
          col2: "24''",
        },
        {
          seq: 7,
          heading: "Ranges",
          template: "two-one",
          col1: "Breech loading Carbines",
          col2: "24''",
        },
        {
          seq: 8,
          heading: "Ranges",
          template: "two-one",
          col1: "Breech loading Rifles",
          col2: "30''",
        },
        {
          seq: 9,
          heading: "Ranges",
          template: "two-one",
          col1: "Bolt action carbines",
          col2: "30''",
        },
        {
          seq: 10,
          heading: "Ranges",
          template: "two-one",
          col1: "Bolt action rifles",
          col2: "36''",
        },
        {
          seq: 11,
          heading: "Ranges",
          template: "two-one",
          col1: "Light Smoothbore Artillery",
          col2: "36''",
        },
        {
          seq: 12,
          heading: "Ranges",
          template: "two-one",
          col1: "Smoothbore Artillery",
          col2: "48''",
        },
        {
          seq: 13,
          heading: "Shooting To Hit modifiers",
          template: "one-two",
          col1: "+1",
          col2: "Artillery shooting at Column or Square",
        },
        {
          seq: 14,
          heading: "Shooting To Hit modifiers",
          template: "one-two",
          col1: "+1",
          col2: "Close Range(6''), Closing Fire",
        },
        {
          seq: 15,
          heading: "Shooting To Hit modifiers",
          template: "one-two",
          col1: "-1",
          col2: "Shooters 'Shaken' or 'Disordered'",
        },
        {
          seq: 16,
          heading: "Shooting To Hit modifiers",
          template: "one-two",
          col1: "-1",
          col2: "Target is skirmishers, deployed Artillery or Not Clear",
        },
        {
          seq: 17,
          heading: "Shooting To Hit modifiers",
          template: "one-two",
          col1: "-1",
          col2: "Artillery at over half range",
        },
        {
          seq: 18,
          heading: "Shooting To Hit modifiers",
          template: "one-two",
          col1: "-1",
          col2: "Cannon shooting overhead",
        },
      ],
    },
    {
      id: 6,
      seq: 6,
      category: "Size Modifiers",
      rows: [
        {
          seq: 1,
          heading: "none",
          template: "one-one",
          col1: "Large unit",
          col2: "+1 Dice Shooting, +2 Combat",
        },
        {
          seq: 2,
          heading: "none",
          template: "one-one",
          col1: "Small unit",
          col2: "1 Dice Shooting, 2 Combat",
        },
        {
          seq: 3,
          heading: "none",
          template: "one-one",
          col1: "Tiny unit",
          col2: "1 dice only Shooting.Combat",
        }
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
    throw new Error("useReference can only be used wtihin an ReferenceProvider");
  }
  return context;
};
export default ReferenceProvider;

const styles = StyleSheet.create({});

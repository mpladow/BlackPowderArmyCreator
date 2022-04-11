import { createContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useContext } from "react/cjs/react.production.min";

const ArmyContext = createContext(undefined);

const ArmyProvider = ({ children }) => {
  // Manage theme state
  const [armies, setArmies] = useState([]);

  const addArmy = (newArmy) => {
    setArmies([...armies, newArmy]);
  };
  const editArmy = (armyDetails) => {
    
      const itemIndex = armies.findIndex((item) => item.ArmyId === armyDetails.ArmyId);
      const updatedArray = [...armies];

      updatedArray[itemIndex].Name = armyDetails.Name;
      setArmies(updatedArray);

  }; 

  return (
    <ArmyContext.Provider value={{ armies, addArmy, editArmy }}>
      {children}
    </ArmyContext.Provider>
  );
};

export default ArmyProvider ;

export const useArmyContext = () => {
  const context = useContext(ArmyContext);
  if (!context) {
    throw new Error("useArmyContext can only be used wtihin an ArmyProvider")
  }
  return context;
}
const styles = StyleSheet.create({});

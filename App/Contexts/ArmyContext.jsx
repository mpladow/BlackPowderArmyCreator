import { createContext, useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ArmyContext = createContext(undefined);

const ArmyProvider = ({ children }) => {
	// Manage theme state
	const [armies, setArmies] = useState([]);
	const getArmies = async () => {
		// check local storage for saved armies
			  const _armies = await AsyncStorage.getItem('USER_ARMIES');
			  if (_armies) {
				  const armiesSerialised = JSON.parse(_armies);
				  setArmies(armiesSerialised);
			  }
 
	}

	
	const addArmy = (newArmy) => {
		setArmies([...armies, newArmy]);
	};
	const editArmy = (armyDetails) => {
		const itemIndex = armies.findIndex(
			(item) => item.Id === armyDetails.Id
		);
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

export default ArmyProvider;

export const useArmyContext = () => {
	const context = useContext(ArmyContext);
	if (!context) {
		throw new Error(
			'useArmyContext can only be used wtihin an ArmyProvider'
		);
	}
	return context;
};
const styles = StyleSheet.create({});

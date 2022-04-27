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
		console.log(armies, 'ARMIES FROM USEEFFECT');
		if (_armies) {
			const armiesSerialised = JSON.parse(_armies);
			setArmies(armiesSerialised);
		}
	};

	const addArmy = (newArmy) => {
		console.log('Adding new army...');
		setArmies([...armies, newArmy]);
	};
	const editArmy = (army) => {
		console.log('EDITING ARMY');
		const itemIndex = armies.findIndex(
			(item) => item.Id === army.Id
		);
		const updatedArray = [...armies];

		updatedArray[itemIndex].ArmyName = army.ArmyName;
		updatedArray[itemIndex].ArmyNotes = army.ArmyNotes;
		updatedArray[itemIndex].EraTemplate = army.EraTemplate;

		setArmies(updatedArray);
	};
	const getArmyById = (id) => {
		return armies.find((x) => x.Id == id);
	};
	const deleteArmy = (id) => {
		setArmies(armies.filter((i) => i.Id !== id));
	};
	useEffect(() => {
		getArmies();
	}, []);
	useEffect(() => {
		let armiesString = JSON.stringify(armies);
		AsyncStorage.setItem('USER_ARMIES', armiesString);
		console.log(armiesString, 'update armies');
	}, [armies]);

	return (
		<ArmyContext.Provider
			value={{
				armies,
				addArmy,
				editArmy,
				deleteArmy,
				getArmyById,
			}}
		>
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

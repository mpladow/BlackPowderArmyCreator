import { createContext, useEffect, useState, useContext, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Armament, Army, Brigade, Commander, Division, EraTemplate, SpecialRule, Unit, UnitTemplate, UnitType } from '../../Models/ArmyCreator';
import uuid from 'react-native-uuid';

interface ArmyContextInterface {
	divisions: Division[];
	deleteDivision;
	getDivisionById;
	getBrigadeById;
	addDivision;
	editDivision;
	currentCommander: Commander;
	setCurrentCommander;
	currentDivision: Division;
	setCurrentDivision;
	currentBrigade: Brigade;
	setCurrentBrigade;
	addBrigade;
}
const ArmyContext = createContext<ArmyContextInterface>(undefined);
const ArmyProvider = ({ children }) => {
	// Manage theme state
	const [divisions, setDivisions] = useState([] as Division[]);

	const [currentCommander, setCurrentCommander] = useState(undefined as Commander);

	const [currentDivision, setCurrentDivision] = useState(undefined as Division)
	const [currentBrigade, setCurrentBrigade] = useState(undefined as Brigade)

	useEffect(() => {
		// AsyncStorage.removeItem('USER_DIVISIONS_ALL');
		// AsyncStorage.removeItem('USER_DIVISIONS');
		getDivisionsFromMemory();
	}, []);
	// set armies everytime an army is added/removed/edited to memory

	const getDivisionsFromMemory = async () => {
		const _armies = await AsyncStorage.getItem('USER_DIVISIONS_ALL');
		if (_armies) {
			const armiesSerialised: Division[] = JSON.parse(_armies);
			setDivisions(armiesSerialised);
			return armiesSerialised;
		}
	};

	const getDivisionById = (id) => {
		let _div = divisions.find((x) => x.DivisionId == id);
		console.log(_div, 'dov');
		console.log(id, 'id');
		setCurrentDivision(_div);
		return _div;
	};

	const getBrigadeById = (id, divisionId) => {
		let _division = divisions.find((x) => x.DivisionId == divisionId);
		let _brigade = _division.Brigades.find((x) => x.BrigadeId == id)
		setCurrentBrigade(_brigade);
	};

	const addBrigade = (newBrigade: Brigade) => {
		let division = divisions.find((x) => x.DivisionId == newBrigade.DivisionId);
		console.log(newBrigade);

		newBrigade.BrigadeId = uuid.v4.toString();
		let updatedBrigs = [...division.Brigades, newBrigade];
		division.Brigades = updatedBrigs;
		// set as focused brigade
		

	};

	const editBrigade = (newBrigade) => {};

	const addDivision = async (newArmy: Division) => {
		const division = new Division();
		division.DivisionId = newArmy.DivisionId;
		division.DivisionName = newArmy.DivisionName;
		division.DivisionNotes = newArmy.DivisionNotes;
		division.EraTemplateId = newArmy.EraTemplateId;
		division.Brigades = [];

		const updatedDivisions = [...divisions, division];

		updateArmiesListInMemory(updatedDivisions);
		setDivisions(updatedDivisions);
		// setFocusedArmy(army);
	};

	const editDivision = (division: Division) => {
		const itemIndex = divisions.findIndex((d) => d.DivisionId == division.DivisionId);

		const updatedDivisions = [...divisions] as Division[];
		updatedDivisions[itemIndex].DivisionName = division.DivisionName;
		// TODO - update commander
		setDivisions(updatedDivisions);
		updateArmiesListInMemory(updatedDivisions);
	};

	const deleteDivision = (id) => {
		// deleting army
		let updatedDivisions = divisions.filter((i) => i.DivisionId !== id);
		updateArmiesListInMemory(updatedDivisions);
		setDivisions(updatedDivisions);
	};

	const updateArmiesListInMemory = (divisions: Division[]) => {
		let divisionsString = JSON.stringify(divisions);
		AsyncStorage.setItem('USER_DIVISIONS_ALL', divisionsString);
	};

	return (
		<ArmyContext.Provider
			value={{
				divisions,
				deleteDivision,
				getDivisionById,
				getBrigadeById,
				addDivision,
				editDivision,
				currentCommander,
				setCurrentCommander,
				currentDivision,
				setCurrentDivision,
				currentBrigade,
				setCurrentBrigade,
				addBrigade,
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
		throw new Error('useArmyContext can only be used wtihin an ArmyProvider');
	}
	return context;
};
const styles = StyleSheet.create({});

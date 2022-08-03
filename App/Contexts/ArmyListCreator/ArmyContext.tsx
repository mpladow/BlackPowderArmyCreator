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
	updateBrigade;
}
const ArmyContext = createContext<ArmyContextInterface>(undefined);
const ArmyProvider = ({ children }) => {
	// Manage theme state
	const [divisions, setDivisions] = useState([] as Division[]);

	const [currentCommander, setCurrentCommander] = useState(undefined as Commander);

	const [currentDivision, setCurrentDivision] = useState(undefined as Division);
	const [currentBrigade, setCurrentBrigade] = useState(undefined as Brigade);

	useEffect(() => {
		// AsyncStorage.removeItem('USER_DIVISIONS_ALL');
		// AsyncStorage.removeItem('USER_DIVISIONS');
		getDivisionsFromMemory();
	}, []);
	// set armies everytime an army is added/removed/edited to memory
	// when divisions are updated, update local storage
	useEffect(() => {
		// divisions updated
		// console.log(divisions, 'divisions updated in useEffect');
		updateArmiesListInMemory(divisions);
	}, [divisions]);

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
		setCurrentDivision(_div);
		return _div;
	};

	const getBrigadeById = (id, divisionId) => {
		// let _division = divisions.find((x) => x.DivisionId == divisionId);
		let _brigade = currentDivision.Brigades.find((x) => x.BrigadeId == id);
		setCurrentBrigade(_brigade);
		setCurrentCommander(_brigade.Commander);
		return _brigade;
	};

	const addBrigade = (newBrigade: Brigade) => {
		// create copy of existing division
		let updatedDivision = { ...currentDivision };
		// generate a new uuid
		newBrigade.BrigadeId = uuid.v4().toString();
		console.log(newBrigade, 'new brigade');
		// update the array of all division brigades
		let updatedBrigs = [...updatedDivision.Brigades, newBrigade];
		updatedDivision.Brigades = updatedBrigs;
		// update state with division with updated brigades
		setCurrentDivision(updatedDivision);
		// update localstorage
		// update all divisions in state with this new updated division, which will trigger saving into local storage.
		setDivisions((prevState) => {
			const newState = prevState.map((div) => {
				if (div.DivisionId == updatedDivision.DivisionId) {
					return updatedDivision;
				}
				return div;
			});
			return newState;
		});
		setCurrentCommander(null);
		// set as focused brigade
	};

	const updateBrigade = (updated: Brigade) => {
		let updatedDivision = { ...currentDivision };
		let updatedBrigs = updatedDivision.Brigades.map((b) => {
			if (b.BrigadeId == updated.BrigadeId) {
				// update values - ensure we never mutate the original object
				let newBrig = { ...b };

				newBrig.BrigadeName = updated.BrigadeName;
				newBrig.Commander = updated.Commander;
				return newBrig;
			}
			return b;
		});
		updatedDivision.Brigades = updatedBrigs;
		setCurrentDivision(updatedDivision);
		setDivisions((prevState) => {
			const newState = prevState.map((div) => {
				if (div.DivisionId == updatedDivision.DivisionId) {
					return updatedDivision;
				}
				return div;
			});
			return newState;
		});
		setCurrentCommander(null);
	};

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
				updateBrigade,
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

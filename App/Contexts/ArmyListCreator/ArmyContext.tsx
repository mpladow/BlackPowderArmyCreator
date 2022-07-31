import {
	createContext,
	useEffect,
	useState,
	useContext,
	useCallback,
} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
	Armament,
	Army,
	Division,
	EraTemplate,
	SpecialRule,
	Unit,
	UnitTemplate,
	UnitType,
} from '../../Models/ArmyCreator';

const ArmyContext = createContext(undefined);
const ArmyProvider = ({ children }) => {
	// Manage theme state
	const [armies, setArmies] = useState([] as Army[]);
	const [divisions, setDivisions] = useState([] as Division[]);

	useEffect(() => {
		// AsyncStorage.removeItem('USER_DIVISIONS_ALL');
		// AsyncStorage.removeItem('USER_DIVISIONS');
		getDivisionsFromMemory();
	}, []);
	// set armies everytime an army is added/removed/edited to memory
	useEffect(() => {
		let armiesString = JSON.stringify(armies);
		AsyncStorage.setItem('USER_ARMIES', armiesString);
	}, [armies]);

	const getDivisionsFromMemory = async () => {
		const _armies = await AsyncStorage.getItem(
			'USER_DIVISIONS_ALL'
		);
		if (_armies) {
			const armiesSerialised: Division[] =
				JSON.parse(_armies);
			setDivisions(armiesSerialised);
			return armiesSerialised;
		}
	};

	const getDivisionById = (id) => {
		let _div = divisions.find((x) => x.DivisionId == id);
		console.log(_div, 'dov');
		console.log(id, 'id');
		return _div;
	};

	const getBrigadeById = (id, divisionId) => {
		let _brigade = divisions.find((x) => x.Brigades)
	} 

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
		const itemIndex = divisions.findIndex(
			(d) => d.DivisionId == division.DivisionId
		);

		const updatedDivisons = [...divisions] as Division[];
		updatedDivisons[itemIndex].DivisionName = division.DivisionName;
		// TODO - update commander
		completeDivisionsUpdate(updatedDivisons);
	};

	const deleteDivision = (id) => {
		// deleting army
		let updatedDivisions = divisions.filter(
			(i) => i.DivisionId !== id
		);
		updateArmiesListInMemory(updatedDivisions);
		setDivisions(updatedDivisions);
	};

	const updateArmiesListInMemory = (divisions: Division[]) => {
		let divisionsString = JSON.stringify(divisions);
		AsyncStorage.setItem('USER_DIVISIONS', divisionsString);
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

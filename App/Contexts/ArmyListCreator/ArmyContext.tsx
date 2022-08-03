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
	Brigade,
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
	const [divisions, setDivisions] = useState([] as Division[]);


	useEffect(() => {
		// AsyncStorage.removeItem('USER_ARMIES');
		//AsyncStorage.removeItem('USER_DIVISIONS');
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
		let _div = divisions.find(x => x.DivisionId == id);
		console.log(_div, 'dov');
		console.log(id, 'id')
		return _div;
	};



	const addDivision = async (newArmy: Army) => {
		const division = new Division();
		division.DivisionId = newArmy.ArmyId;
		division.DivisionName = newArmy.ArmyName;
		division.DivisionNotes = newArmy.ArmyNotes;
		division.EraTemplateId = newArmy.EraTemplateId;
		division.Brigades = [];

		const updatedDivisions = [...divisions, division];

		updateArmiesListInMemory(updatedDivisions);
		setDivisions(updatedDivisions)
		// setFocusedArmy(army);
	};



	const editDivision = (division: Division) => {
		const itemIndex = divisions.findIndex(
			(d) => d.DivisionId == division.DivisionId
		);

		const updatedDivisions = [...divisions] as Division[];
		updatedDivisions[itemIndex].DivisionName =
			division.DivisionName;
		// TODO - update commander
		setDivisions(updatedDivisions);
		updateArmiesListInMemory(updatedDivisions);
	};



	const deleteArmy = (id) => {
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
				deleteArmy,
				getDivisionById,
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

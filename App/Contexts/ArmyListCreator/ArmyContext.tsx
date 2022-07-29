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
	const [units, setUnits] = useState([] as Unit[]);
	const [focusedArmy, setFocusedArmy] = useState({} as Army);
	const [focusedDivision, setFocusedDivision] = useState({} as Division);
	const [focusedUnit, setFocusedUnit] = useState({} as Unit);

	useEffect(() => {
				AsyncStorage.removeItem('USER_ARMIES');
				AsyncStorage.removeItem('USER_DIVISIONS');
		getArmies();

	}, []);
	// set armies everytime an army is added/removed/edited to memory
	useEffect(() => {
		let armiesString = JSON.stringify(armies);
		AsyncStorage.setItem('USER_ARMIES', armiesString);
	}, [armies]);

	useEffect(() => {
		getDivisions();
	}, [focusedArmy]);
	useEffect(() => {}, [armies]);

	const getArmies = async () => {
		// check local storage for saved armies
		const _armies = await AsyncStorage.getItem('USER_ARMIES');
		if (_armies) {
			const armiesSerialised: Army[] = JSON.parse(_armies);
			setArmies(armiesSerialised);
		}
	};
	const getDivisions = async () => {
		const _divisions = await AsyncStorage.getItem('USER_DIVISIONS');
		if (_divisions) {
			const allDivisionsSerialised: Division[] =
				JSON.parse(_divisions);
			setDivisions(allDivisionsSerialised);
		}
		return divisions;
	};
	const focus = (armyId: number) => {
		let army = armies.find((a) => a.ArmyId == armyId);
		setFocusedArmy(army);
	};

	const removeFocus = () => {
		setFocusedArmy({} as Army);
	};
	const focusDivision = (divisionId: number) => {
		let division = focusedArmy.Divisions.find(
			(div) => div.DivisionId == divisionId
		);
		setFocusedDivision(division);
	};
	const removeDivisionFocus = () => {
		setFocusedDivision({} as Division);
	};

	const addArmy = (newArmy: Army) => {
		const army = new Army();
		army.ArmyId = newArmy.ArmyId;
		army.ArmyName = newArmy.ArmyName;
		army.ArmyNotes = newArmy.ArmyNotes;
		army.EraTemplateId = newArmy.EraTemplateId;
		army.Divisions = [];
		army.DivisionIds = [];

		const updatedArmies = [...armies, army];
		completeArmiesUpdate(updatedArmies);
		// setFocusedArmy(army);
	};

	const editArmy = (army: Army) => {
		const itemIndex = armies.findIndex(
			(item) => item.ArmyId === army.ArmyId
		);
		const updatedArmies = [...armies] as Army[];

		updatedArmies[itemIndex].ArmyName = army.ArmyName;
		updatedArmies[itemIndex].ArmyNotes = army.ArmyNotes;
		updatedArmies[itemIndex].EraTemplateId = army.EraTemplateId;

		completeArmiesUpdate(updatedArmies);
	};
	const addDivision = (division: Division) => {
		console.log(division, 'division on context')
		const updatedDivisions = [...divisions, division];
		completeDivisionsUpdate(updatedDivisions);
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

	const getDivisionByArmyId = (id: number) => {
		return divisions.filter(d => d.DivisionId == id);
	}
	const getArmyById = (id) => {
		return armies.find((x) => x.ArmyId == id);
	};
	const getDivisionsById = (id) => {
return divisions.filter(x => x.ArmyId == id );
	}
	const getDivisionById = (id) => {
		return divisions.find((x) => x.DivisionId == id);
	} 
	const deleteArmy = (id) => {
		// deleting army
		let updatedArmies = armies.filter((i) => i.ArmyId !== id);
		completeArmiesUpdate(updatedArmies);
	};

	// helper functions
	const completeArmiesUpdate = (updatedArmies) => {
		setArmies(updatedArmies);
		// set to memory
		updateArmiesListInMemory(updatedArmies);
	};

	const completeDivisionsUpdate = (updatedDivisions) => {
		setDivisions(updatedDivisions);
		updateDivisionsInMemory(updatedDivisions);
	};

	const updateArmiesListInMemory = (armyList: Army[]) => {
		let armiesString = JSON.stringify(armyList);
		AsyncStorage.setItem('USER_ARMIES', armiesString);
	};
	const updateDivisionsInMemory = (divisions: Division[]) => {
		let divisionsString = JSON.stringify(divisions);
		AsyncStorage.setItem('USER_DIVISIONS', divisionsString);
	};

	return (
		<ArmyContext.Provider
			value={{
				armies,
				divisions,
				addArmy,
				editArmy,
				deleteArmy,
				getArmyById,
				getDivisionsById,
				getDivisionById,
				getDivisionByArmyId,
				focus,
				removeFocus,
				focusedArmy,

				getDivisions,
				focusedDivision,
				focusDivision,
				removeDivisionFocus,
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

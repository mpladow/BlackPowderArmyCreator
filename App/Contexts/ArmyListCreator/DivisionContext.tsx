import { StyleSheet, Text, View } from 'react-native';
import React, { createContext, useContext, useState } from 'react';
import { Division } from '../../Models/ArmyCreator';

const DivisionContext = createContext(undefined);

const DivisionProvider = ({ children }) => {
	const [divisions, setDivisions] = useState([] as Division[]);
	const [focusedDivision, setFocusedDivision] = useState({} as Division)

	const focusDivision = (divisionId) => {
		
	}
	return (
		<DivisionContext.Provider value={divisions, focusedDivision}>
			{children}
		</DivisionContext.Provider>
	);
};

export default DivisionProvider;

export const useDivisionContext = () => {
	const context = useContext(DivisionContext);
	return context;
};

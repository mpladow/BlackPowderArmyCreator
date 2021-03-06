import { createContext, useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const RulesContext = createContext(undefined);

const RulesProvider = ({ children }) => {
	const EXAMPLE_ARMY = {
		Id: 69,
		ArmyName: 'TEST_ARMY',
		ArmyNotes: 'Army notes',
		EraTemplate: 'napoleonics',
		Divisions: [
			{
				DivisionId: '69a',
				DivisionName: '1st Division',
				Commander: {
					DivisionCommanderId: '69b',
					DivisionCommanderName:
						'Lieutenant Monet',
					Traits: '',
					SpecialRules: [],
				},
				Brigades: [
					{
						BrigadeId: '69b',
						BrigadeName: '1st Brigade',
						Commander: {
							BrigadeCommanderId:
								'69d',
							BrigadeCommanderName:
								'General Murat',
							CR: '8',
							Traits: [
								{
									TraitId: 1,
									Name: 'Aggressive',
									Description:
										'+1 to SR when giving an order to charge',
								},
							],
						},
						Units: [
							{
								UnitId: '69u',
								UnitName: '31st Line',
								Type: 'Regular Infantry',
								Armament: 'Smoothbore Musket',
								HandToHand: '6',
								Shooting: '3',
								Morale: '4',
								Stamina: '4',
								Special: [
									'5',
									'23',
								],
								Cost: '61',
							},
						],
					},
				],
			},
		],
	};
	const templates = [
		{
			id: 1,
			templateName: 'napoleonics',
			infantry: {
				type: 'Regular Infantry',
				armament: 'Smoothbore Musket',
				handToHand: '6',
				shooting: '3',
				morale: '4',
				stamina: '4',
				special: ['5', '23'],
				cost: '61',
			},
			cavalry: {
				type: 'Regular Cavalry',
				armament: 'Sabre',
				handToHand: '7',
				shooting: '0',
				morale: '4',
				stamina: '4',
				special: ['7'],
				cost: '60',
			},
			artillery: {
				type: 'Regular Artillery',
				armament: 'Smoothbore Artillery',
				handToHand: '1',
				shooting: '1/2/3',
				morale: '4',
				stamina: '1',
				special: ['8'],
				cost: '31',
			},
		},
	];
	const specialRules = [
		{
			id: 23,
			name: 'Tough Fighter',
			description: 'Tough Fighters',
		},
		{
			id: 1,
			name: 'Bloodthirsty',
			description:
				'Re-roll misses on first round of combat only.',
		},
		{
			id: 2,
			name: 'Brave',
			description:
				'Shaken units rally on 4+ if more than 12" from enemy.',
		},
		{
			id: 3,
			name: 'Crack',
			description:
				'Re-roll one failed morale save if you have no casualties already.',
		},
		{
			id: 4,
			name: 'Determined Charge',
			description: 'Must charge where able to do so.',
		},
		{
			id: 5,
			name: 'Elite 4',
			description:
				'Overcome disorder at start of Command on roll of 4+.',
		},
		{
			id: 6,
			name: 'Elite 5',
			description:
				'Overcome disorder at start of Command on roll of 5+.',
		},
		{
			id: 7,
			name: 'Heavy Cavalry D3',
			description: '+D3 combar result on a charge',
		},
		{
			id: 8,
			name: 'Reliable',
			description: '+1 command',
		},
	];
	// Manage theme state

	return (
		<RulesContext.Provider
			value={{ templates, specialRules, EXAMPLE_ARMY }}
		>
			{children}
		</RulesContext.Provider>
	);
};

export default RulesProvider;

export const useRulesContext = () => {
	const context = useContext(RulesContext);
	if (!context) {
		throw new Error(
			'useRulesContext can only be used wtihin a Rules Context'
		);
	}
	return context;
};
const styles = StyleSheet.create({});

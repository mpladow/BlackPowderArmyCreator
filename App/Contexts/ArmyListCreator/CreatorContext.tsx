import { StyleSheet, Text, View } from 'react-native';
import React, { createContext, useContext, useState } from 'react';
import {
	Armament,
	EraTemplate,
	SpecialRule,
	UnitTemplate,
	UnitType,
} from '../../Models/ArmyCreator';

const CreatorContext = createContext(undefined);

const ERA_TEMPLATES: EraTemplate[] = [
	{
		TemplateId: 0,
		TemplateName: 'Revolutionary',
		TemplateNotes: '1792-1802',
		Order: 0,
	} as EraTemplate,
	{
		TemplateId: 1,
		TemplateName: 'Napoleonics',
		TemplateNotes: '1803-1815',
		Order: 1,
		UnitTemplateIds: [0],
	} as EraTemplate,
	{
		TemplateId: 2,
		TemplateName: 'British Colonial',
		TemplateNotes: '1792-1802',
		Order: 1,
	} as EraTemplate,
];
const UNIT_TEMPLATES: UnitTemplate[] = [
	{
		UnitTemplateId: 0,
		UnitName: 'Line Infantry',
		UnitNotes: 'Basic Line infantry unit, armed with a smoothebore musket',
		ArmamentId: 1,
		UnitTypeId: 0,
		Melee: 6,
		Shooting: '3',
		Morale: 4,
		Stamina: 3,
		SpecialRuleIds: [0, 1],
		Order: 0,
	} as UnitTemplate,
	{
		UnitTemplateId: 1,
		UnitName: 'Elite Infantry',
		UnitNotes: 'Veteran troops, commonly given to guards',
		ArmamentId: 1,
		UnitTypeId: 0,
		Melee: 7,
		Shooting: '4',
		Morale: 3,
		Stamina: 4,
		SpecialRuleIds: [0, 1, 3, 5],
		Order: 0,
	} as UnitTemplate,
	{
		UnitTemplateId: 2,
		UnitName: 'Light Infantry',
		UnitNotes: 'Light infantry trained in skirmishing',
		ArmamentId: 1,
		UnitTypeId: 0,
		Melee: 6,
		Shooting: '3',
		Morale: 4,
		Stamina: 3,
		SpecialRuleIds: [0, 1, 5, 6],
		Order: 0,
	} as UnitTemplate,
];

const ARMAMENTS: Armament[] = [
	{
		ArmamentId: 0,
		ArmamentName: 'Pistol',
		Range: 6,
		Order: 1.0,
	} as Armament,
	{
		ArmamentId: 1,
		ArmamentName: 'Smoothebore Muskets',
		Range: 18,
		Order: 2.1,
	} as Armament,
	{
		ArmamentId: 2,
		ArmamentName: 'Rifled Musket',
		Range: 24,
		Order: 3.1,
	} as Armament,
	{
		ArmamentId: 3,
		ArmamentName: 'Light Smoothebore Artillery',
		Range: 36,
		Order: 6.0,
	} as Armament,
	{
		ArmamentId: 1,
		ArmamentName: 'Smoothebore Artillery',
		Range: 48,
		Order: 6.1,
	} as Armament,
];

const UNIT_TYPES: UnitType[] = [
	{
		UnitTypeId: 0,
		UnitTypeName: 'Regular Infantry',
		Movement: 12,
	} as UnitType,
	{
		UnitTypeId: 1,
		UnitTypeName: 'Regular Cavalry',
		Movement: 18,
	} as UnitType,
	{
		UnitTypeId: 2,
		UnitTypeName: 'Artillery',
		Movement: 12,
	} as UnitType,
	{
		UnitTypeId: 3,
		UnitTypeName: 'Horse Artillery',
		Movement: 18,
	} as UnitType,
];
const SPECIAL_RULES: SpecialRule[] = [
	{
		SpecialRuleId: 0,
		SpecialRuleName: 'Form Square',
		SpecialRuleDescription1: 'Form square when charged by cavalry',
		SpecialRuleDescription2:
			'Infantry are drilled to automatically form into square formation',
		IsGlobal: true,
		IsCustom: false,
	} as SpecialRule,
	{
		SpecialRuleId: 1,
		SpecialRuleName: 'First Fire',
		SpecialRuleDescription1: '+1 Dice on First Shot',
		SpecialRuleDescription2:
			'Represents the effectiveness of a units first shot.',
		IsGlobal: false,
		IsCustom: false,
	} as SpecialRule,
	{
		SpecialRuleId: 2,
		SpecialRuleName: 'Elite 3+',
		SpecialRuleDescription1: 'Remove Disorder on a 3+',
		SpecialRuleDescription2:
			'Elite and experienced troops can remove disorder at the start of the order phase',
		IsGlobal: false,
		IsCustom: false,
	} as SpecialRule,
	{
		SpecialRuleId: 3,
		SpecialRuleName: 'Elite 4+',
		SpecialRuleDescription1: 'Remove Disorder on a 4+',
		SpecialRuleDescription2:
			'Elite and experienced troops can remove disorder at the start of the order phase',
		IsGlobal: false,
		IsCustom: false,
	} as SpecialRule,
	{
		SpecialRuleId: 4,
		SpecialRuleName: 'Steady',
		SpecialRuleDescription1: 'Passes the first break test',
		SpecialRuleDescription2:
			'Professional troops that can handle a bit of fear.',
		IsGlobal: false,
		IsCustom: false,
	} as SpecialRule,
	{
		SpecialRuleId: 5,
		SpecialRuleName: 'Reliable',
		SpecialRuleDescription1: '+1 Command',
		SpecialRuleDescription2:
			'Used to differentiate between order troops and veteran or elite formations.',
		IsGlobal: false,
		IsCustom: false,
	} as SpecialRule,
	{
		SpecialRuleId: 5,
		SpecialRuleName: 'Skirmish',
		SpecialRuleDescription1:
			'+1 shooting to hit but -1 to melee to hit',
		SpecialRuleDescription2: 'Unit can enter skirmish formation.',
		IsGlobal: false,
		IsCustom: false,
	} as SpecialRule,
	{
		SpecialRuleId: 6,
		SpecialRuleName: 'Sharpshooter',
		SpecialRuleDescription1: 'Re-roll one missed shot',
		SpecialRuleDescription2:
			'Remarkably well schooled in fire drill.',
		IsGlobal: false,
		IsCustom: false,
	} as SpecialRule,
];
const CreatorProvider = ({ children }) => {
	const [eras, setEras] = useState(ERA_TEMPLATES as EraTemplate[]);
	const [units, setUnits] = useState(UNIT_TEMPLATES as UnitTemplate[]);
	const [armaments, setArmaments] = useState(ARMAMENTS as Armament[]);
	const [unitTypes, setUnitTypes] = useState(UNIT_TYPES as UnitType[]);
	const [specialrules, setSpecialrules] = useState(
		SPECIAL_RULES as SpecialRule[]
	);

	const addNewEra = () => {};
	const getEraDropdown = () => {
		console.log(eras, 'ERAS');
		let dropdown = eras
			.sort((x) => x.Order)
			.map((item, index) => {
				return {
					label: item.TemplateName,
					value: item.TemplateId,
				};
			});
			console.log(dropdown, 'DROPDOWN')
		return dropdown;
	};
	const getUnitTemplateDropdown = () => {
		let dropdown = units
			.sort((x) => x.Order)
			.map((item, index) => {
				return {
					label: item.UnitName,
					value: item.UnitTemplateId,
				};
			});
		return dropdown;
	};
	const getArmamentsDropdown = () => {
		let dropdown = armaments.sort(x => x.Order).map((item, index) => {
			return {
				label: item.ArmamentName,
				value: item.ArmamentId,
			};
		});
		return dropdown;
	};

	return (
		<CreatorContext.Provider
			value={{
				getEraDropdown,
				getUnitTemplateDropdown,
				getArmamentsDropdown,
				unitTypes,
				specialrules,
			}}
		>
			{children}
		</CreatorContext.Provider>
	);
};

export default CreatorProvider;

export const useCreatorContext = () => {
	const context = useContext(CreatorContext);
	return context;
};

import {
	Pressable,
	SectionList,
	StyleSheet,
	View,
	FlatList,
	Alert,
} from 'react-native';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Text from '../../../../Components/Atoms/Text';
import Container from '../../../../Components/Atoms/Container';
import Button from '../../../../Components/Atoms/Button';
import { useNavigation } from '@react-navigation/native';
import { useArmyContext } from '../../../../Contexts/ArmyListCreator/ArmyContext';
import { useRulesContext } from '../../../../Contexts/RulesContext';
import Card from '../../../../Components/Atoms/Card';
import { useTheme } from '@react-navigation/native';
import { Ionicons, Entypo, EvilIcons } from '@expo/vector-icons';
import Heading from '../../../../Components/Atoms/Heading';
import { Army, Division } from '../../../../Models/ArmyCreator';

const ArmyDetails = ({ route, edit }) => {
	// states that will hold army indivisula army details for each section
	// set to edit mode
	const [editMode, setEditMode] = useState(false);
	// hooks
	const nav = useNavigation();
	const armyContext = useArmyContext();
	const theme = useTheme();
	const [focusedDivision, setFocusedDivision] = useState({} as Division);
	const [armyId, setArmyId] = useState(0 as number);

	useEffect(() => {

		if (route.params && route.params?.DivisionId) {
			let _id = route.params.DivisionId;
			let _army = armyContext.getDivisionById(_id);
			console.log(_army, 'retruning army');
			setFocusedDivision(_army);
		} else {
			console.log('dfdf');
		}
		// Return the function to unsubscribe from the event so it gets removed on unmount
	}, []);

	// useEffect(() => {
	// 	if (route.params && route.params?.ArmyId) {
	// 		console.log(route.params?.ArmyId, 'army');
	// 		let _id = route.params.ArmyId;
	// 		setArmyId(_id);
	// 		let _army = armyContext.getArmyById(armyId);
	// 		setFocusedArmy(_army);
	// 	}
	// }, []);

	useEffect(() => {
		nav.setOptions({
			headerTitle: focusedDivision.DivisionName,
			title: focusedDivision.DivisionName,
			headerLeft: () => null,
		});
	}, [focusedDivision]);

	useLayoutEffect(() => {
		nav.setOptions({
			headerRight: () => (
				<Button onPress={() => setEditMode((c) => !c)}>
					<Text>
						{editMode ? 'Save' : 'Edit'}
					</Text>
				</Button>
			),
		});
	}, [nav, editMode]);

	const renderDivisionCommanderDetails = () => {
		return (
			<View
				style={{
					flexDirection: 'row',
					paddingVertical: 4,
				}}
			>
				<Entypo
					name='star-outlined'
					size={18}
					color='yellow'
				/>
				{focusedDivision.Commander ? (
					<Text>
						{`${focusedDivision.Commander.CommanderRank} ${focusedDivision.Commander.CommanderFirstName} ${focusedDivision.Commander.CommanderSurname}`}
					</Text>
				) : (
					<Text
						style={{
							color: 'red',
							fontStyle: 'italic',
						}}
					>
						None Selected
					</Text>
				)}
			</View>
		);
	};
	const onEditDivisionPress = (divisionId: number) => {
		console.log(divisionId, 'div id');
		nav.navigate('EditDivision', {
			DivisionId: divisionId,
			ArmyId: armyId,
		});
	};

	// const onUnitDeletePress = (divisionId, brigadeId, unitId) => {
	// 	// get unit
	// 	console.log(unitId, 'UNIT ID');
	// 	const division = divisions.find(
	// 		(x) => x.DivisionId == divisionId
	// 	);
	// 	const brigade = division.Brigades.find(
	// 		(x) => x.BrigadeId == brigadeId
	// 	);

	// 	let _units = brigade.Units;
	// 	let currentUnit = _units.find((x) => x.UnitId == unitId);
	// 	console.log(_units, 'UNITS');
	// 	Alert.alert(
	// 		'Delete Unit?',
	// 		`Do you want to dismiss ${currentUnit.UnitName} from ${brigade.BrigadeName}?`,
	// 		[
	// 			{
	// 				text: 'Delete',
	// 				onPress: () => {
	// 					setUnits(
	// 						_units.filter(
	// 							(x) =>
	// 								x.UnitId !==
	// 								unitId
	// 						)
	// 					);
	// 				},
	// 			},
	// 			{
	// 				text: 'Cancel',
	// 				onPress: () => {},
	// 			},
	// 		]
	// 	);
	// };

	const onAddBrigadePress = () => {
		nav.navigate('EditBrigade', {
			DivisionId: focusedDivision.DivisionId,
		});
	};

	const onEditBrigadePress = (id) => {
	nav.navigate('EditBrigade', {
		BrigadeId: id,
		DivisionId: focusedDivision.DivisionId,
	});
	}
	const renderBrigades = () => {
		if (focusedDivision.Brigades?.length > 0) {
			return (
				<FlatList
					data={focusedDivision.Brigades}
					keyExtractor={(div) =>
						div.DivisionId?.toString()
					}
					renderItem={(div) => (
						<Card>
							<View
								style={{
									flexDirection:
										'row',
								}}
							>
								<View
									style={{
										// flex: 1,
										justifyContent:
											'center',
										alignItems: 'flex-end',
									}}
								>
									<Heading
										size={
											2
										}
									>
										{
											div
												.item
												.BrigadeName
										}
									</Heading>
								</View>
							</View>
							<View>
								BRIGADE
								COMMANDER NAME
								WIP
							</View>
							<FlatList
								data={
									div.item
										.Units
								}
								renderItem={(
									brig
								) => (
									<View
										style={{
											borderTopWidth: 2,
											borderColor:
												'white',
											paddingVertical: 12,
											paddingHorizontal: 8,
										}}
									>
										<View
											style={{
												flexDirection:
													'row',
												// justifyContent:
												// 	'center',
											}}
										>
											<Heading
												size={
													3
												}
											>
												{
													brig
														.item
														.UnitName
												}
											</Heading>
											{editMode && (
												<View
													style={{
														flex: 1,
														justifyContent:
															'center',
														alignItems: 'flex-end',
													}}
												>
													<Pressable
														onPress={() =>
															onEditBrigadePress(
																brig
																	.item
																	.BrigadeId
															)
														}
													>
														<EvilIcons
															name='pencil'
															size={
																24
															}
															color='red'
														/>
													</Pressable>
												</View>
											)}
										</View>
									</View>
								)}
							/>
						</Card>
					)}
				/>
			);
		} else {
			return <Text>No brigades in this army</Text>;
		}
	};

	return (
		<Container>
			{focusedDivision?.DivisionId > 0 ? (
				<>
					<Text>
						{focusedDivision?.DivisionNotes}
					</Text>
					{renderDivisionCommanderDetails()}
					<View>{renderBrigades()}</View>
					{editMode && (
						<View
							style={{
								marginVertical: 12,
							}}
						>
							<Button
								type='primary'
								onPress={
									onAddBrigadePress
								}
							>
								Add Brigade
							</Button>
						</View>
					)}
				</>
			) : null}
		</Container>
	);
};

export default ArmyDetails;

const styles = StyleSheet.create({});

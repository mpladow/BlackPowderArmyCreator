import {
	Pressable,
	SectionList,
	StyleSheet,
	View,
	FlatList,
	Alert,
} from 'react-native';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Text from '../../Components/Atoms/Text';
import Container from '../../Components/Atoms/Container';
import Button from '../../Components/Atoms/Button';
import { useNavigation } from '@react-navigation/native';
import { useArmyContext } from '../../Contexts/ArmyListCreator/ArmyContext';
import { useRulesContext } from '../../Contexts/RulesContext';
import Card from '../../Components/Atoms/Card';
import { useTheme } from '@react-navigation/native';
import { Ionicons, Entypo, EvilIcons } from '@expo/vector-icons';
import Heading from '../../Components/Atoms/Heading';
import UnitListItem from './Atoms.jsx/UnitListItem';
import { Army } from '../../Models/ArmyCreator';

const ArmyDetails = ({ route, edit }) => {
	// states that will hold army indivisula army details for each section
	// set to edit mode
	const [editMode, setEditMode] = useState(false);
	// hooks
	const nav = useNavigation();
	const armyContext = useArmyContext();
	const theme = useTheme();

	useEffect(() => {
		if (route.params && route.params?.ArmyId) {
			route.params &&
				route.params?.ArmyId &&
				armyContext.focus(route.params.ArmyId);
			let _id = route.params.ArmyId;
			let _army = armyContext.getArmyById(_id);
		}

		//get army from asynclocalstorage
		if (armyContext.focusedArmy) {
			console.log(armyContext.focusedArmy, 'FOCUSED ARMY');
			nav.setOptions({
				headerTitle: armyContext.focusedArmy?.ArmyName,
				title: armyContext.focusedArmy?.ArmyName,
			});
			// setDivisions(rulesContext.EXAMPLE_ARMY.Divisions);
		}
	}, [armyContext.focusedArmy]);

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

	const renderDivisionCommanderDetails = (division) => {
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
				{division.Commander ? (
					<Text>
						{
							division.Commander
								.DivisionCommanderName
						}
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
	// const renderBrigadeCommanderDetails = (brigade) => {
	// 	return (
	// 		<>
	// 			{brigade.Commander ? (
	// 				<>
	// 					<View
	// 						style={{
	// 							flexDirection:
	// 								'row',
	// 							paddingVertical: 4,
	// 						}}
	// 					>
	// 						<Entypo
	// 							name='star-outlined'
	// 							size={18}
	// 							color={
	// 								theme
	// 									.colors
	// 									.text
	// 							}
	// 						/>

	// 						<Text>
	// 							{
	// 								brigade
	// 									.Commander
	// 									.BrigadeCommanderName
	// 							}
	// 						</Text>
	// 					</View>
	// 					<View
	// 						style={{
	// 							flexDirection:
	// 								'row',
	// 						}}
	// 					>
	// 						<Text>
	// 							Staff Rating:{' '}
	// 							{
	// 								brigade
	// 									.Commander
	// 									.CR
	// 							}
	// 						</Text>
	// 						<View
	// 							style={{
	// 								flexDirection:
	// 									'row',
	// 							}}
	// 						>
	// 							{brigade.Commander.Traits.map(
	// 								(
	// 									x,
	// 									index
	// 								) => (
	// 									<View
	// 										style={{
	// 											marginHorizontal: 4,
	// 										}}
	// 									>
	// 										{index !==
	// 											0 && (
	// 											<Text>
	// 												{' '}
	// 												|{' '}
	// 											</Text>
	// 										)}
	// 										<Text>
	// 											{
	// 												x.Name
	// 											}
	// 										</Text>
	// 									</View>
	// 								)
	// 							)}
	// 						</View>
	// 					</View>
	// 				</>
	// 			) : (
	// 				<View
	// 					style={{
	// 						flexDirection: 'row',
	// 						paddingVertical: 4,
	// 					}}
	// 				>
	// 					<Text
	// 						style={{
	// 							color: 'red',
	// 							fontStyle: 'italic',
	// 						}}
	// 					>
	// 						None Selected
	// 					</Text>
	// 				</View>
	// 			)}
	// 		</>
	// 	);
	// };
	const onEditDivisionPress = (divisionId: number) => {
		console.log(divisionId, 'div id')
		nav.navigate("EditDivision", {DivisionId: divisionId})
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

	const onAddDivisionPress = (id) => {
		nav.navigate('EditDivision');
	};
	const renderDivisions = () => {
		if (armyContext.divisions?.length > 0) {
			return (
				<FlatList
					data={armyContext.divisions}
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
									<Heading size={2}>
										{
											div
												.item
												.DivisionName
										}
									</Heading>
								</View>

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
												onEditDivisionPress(
													div
														.item
														.DivisionId
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
							{renderDivisionCommanderDetails(
								div.item
							)}
							<FlatList
								data={
									div.item
										.Brigades
								}
								key={
									div.item
										.Id
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
														.BrigadeName
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
										{renderBrigadeCommanderDetails(
											brig.item
										)}
										<FlatList
											data={
												brig
													.item
													.Units
											}
											renderItem={({
												item,
											}) => (
												<UnitListItem
													unit={
														item
													}
													onDeletePress={() =>
														onUnitDeletePress(
															div
																.item
																.DivisionId,
															brig
																.item
																.BrigadeId,
															item.UnitId
														)
													}
													editMode={
														editMode
													}
												/>
											)}
										/>
									</View>
								)}
								keyExtractor={(
									item
								) => item.id}
							/>
						</Card>
					)}
				/>
			);
		} else {
			return <Text>No divisions in this army</Text>;
		}
	};

	return (
		<Container>
			{armyContext.focusedArmy?.ArmyId > 0 ? (
				<>
					<Text>
						{
							armyContext.focusedArmy
								?.ArmyNotes
						}
					</Text>
					<View>{renderDivisions()}</View>
					{editMode && (
						<View
							style={{
								marginVertical: 12,
							}}
						>
							<Button
								type='primary'
								onPress={
									onAddDivisionPress
								}
							>
								Add Division
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

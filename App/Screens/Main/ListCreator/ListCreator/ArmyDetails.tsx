import { Pressable, SectionList, StyleSheet, View, FlatList, Alert } from 'react-native';
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
	const [armyId, setArmyId] = useState(0 as number);

	useEffect(() => {
		if (route.params && route.params?.DivisionId) {
			let _id = route.params.DivisionId;
			let _division = armyContext.getDivisionById(_id);
			console.log(_division, 'retruning army');
		} else {
			console.log('dfdf');
		}
		// Return the function to unsubscribe from the event so it gets removed on unmount
	}, []);

	useEffect(() => {
		nav.setOptions({
			headerTitle: armyContext.currentDivision?.DivisionName,
			title: armyContext.currentDivision?.DivisionName,
			headerLeft: () => null,
		});
	}, [armyContext.currentDivision]);

	useLayoutEffect(() => {
		nav.setOptions({
			headerRight: () => (
				<Button onPress={() => setEditMode((c) => !c)}>
					<Text>{editMode ? 'Save' : 'Edit'}</Text>
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
				<Entypo name='star-outlined' size={18} color='yellow' />
				{armyContext.currentDivision?.Commander ? (
					<Text>{`Gen ${armyContext.currentDivision?.Commander.CommanderFirstName}`}</Text>
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


	const onAddBrigadePress = () => {
		nav.navigate('EditBrigade', {
			DivisionId: armyContext.currentDivision?.DivisionId,
		});
	};

	const onEditBrigadePress = (id) => {
		nav.navigate('EditBrigade', {
			BrigadeId: id,
			DivisionId: armyContext.currentDivision?.DivisionId,
		});
	};
	const renderBrigades = () => {
		console.log(armyContext.currentDivision?.Brigades, 'dfdf');
		if (armyContext.currentDivision.Brigades?.length > 0) {
			return (
				<FlatList
					data={armyContext.currentDivision?.Brigades}
					keyExtractor={(div) => div.BrigadeId?.toString()}
					renderItem={({ item }) => (
						<Card>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
								}}
							>
								<View
									style={{
										justifyContent: 'center',
										alignItems: 'flex-end',
									}}
								>
									<Heading size={2}>{item.BrigadeName}</Heading>
								</View>
								<View>
									{editMode && (
										<Pressable onPress={() => onEditBrigadePress(item.BrigadeId)}>
											<EvilIcons name='pencil' size={24} color='red' />
										</Pressable>
									)}
								</View>
							</View>
							<View>
								<Text>SR: {item.Commander.CommanderStaffRating}</Text>
								<Text>Commander: Gen. {item.Commander.CommanderFirstName}</Text>
							</View>
							{/* <View>BRIGADE COMMANDER NAME WIP</View> */}
							{/* <FlatList
								data={item.Units}
								renderItem={(brig) => (
									<View
										style={{
											borderTopWidth: 2,
											borderColor: 'white',
											paddingVertical: 12,
											paddingHorizontal: 8,
										}}
									>
										<View
											style={{
												flexDirection: 'row',
												// justifyContent:
												// 	'center',
											}}
										>
											<Heading size={3}>{brig.item.UnitName}</Heading>
											{editMode && (
												<View
													style={{
														flex: 1,
														justifyContent: 'center',
														alignItems: 'flex-end',
													}}
												>
													<Pressable
														onPress={() =>
															onEditBrigadePress(brig.item.BrigadeId)
														}
													>
														<EvilIcons
															name='pencil'
															size={24}
															color='red'
														/>
													</Pressable>
												</View>
											)}
										</View>
									</View>
								)}
							/> */}
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
			{armyContext.currentDivision?.DivisionId > 0 ? (
				<>
					<Text>{armyContext.currentDivision?.DivisionNotes}</Text>
					{renderDivisionCommanderDetails()}
					<View>{renderBrigades()}</View>
					{editMode && (
						<View
							style={{
								marginVertical: 12,
							}}
						>
							<Button type='primary' onPress={onAddBrigadePress}>
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

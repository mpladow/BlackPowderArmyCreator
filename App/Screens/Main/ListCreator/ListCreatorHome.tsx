import { StyleSheet, View, FlatList, Modal, Alert, Pressable, ListRenderItemInfo, Animated } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import ListItem from '../../../Components/Atoms/ListItem';
import Button from '../../../Components/Atoms/Button';
import ButtonContainer from '../../../Components/Atoms/ButtonContainer';
import { FontAwesome } from '@expo/vector-icons';
import { Controller, useForm } from 'react-hook-form';
import { onChange } from 'react-native-reanimated';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ListItemSpacer from '../../../Components/Atoms/ListItemSpacer';
import Text from '../../../Components/Atoms/Text';
import CustomModal from '../../../Components/Atoms/ModalCustom';
import Container from '../../../Components/Atoms/Container';
import Heading from '../../../Components/Atoms/Heading';
import { useNavigation } from '@react-navigation/native';
import InputField from '../../../Components/Atoms/InputField';
import { useArmyContext } from '../../../Contexts/ArmyListCreator/ArmyContext';
import { useTheme } from '@react-navigation/native';
import { Army, Division } from '../../../Models/ArmyCreator';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ArmyCreatorHome = () => {
	const [showArmyModal, setShowArmyModal] = useState(false);
	const [armySummaries, setArmySummaries] = useState([] as Division[]);

	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({ mode: 'onChange', defaultValues: { ArmyName: '' } });

	const nav = useNavigation();
	const armyContext = useArmyContext();

	const scrollY = useRef(new Animated.Value(0)).current;
	const MIN_HEIGHT = 80;
	const SPACING = 8;
	useEffect(() => {
		let allDivisions = armyContext.divisions;
		setArmySummaries(allDivisions);
	}, []);

	const addDivisionHandler = () => {
		// open up a modal to add a new army
		nav.navigate('EditArmy', { id: null });
	};
	const onDivisionListItemPressHandler = (id) => {
		nav.navigate('ArmyDetails', { DivisionId: id });
	};
	return (
		<>
			<View style={{ flex: 4, marginBottom: 100 }}>
				<Animated.FlatList
					data={armyContext.divisions}
					onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
					ListHeaderComponent={() => (
						<View
							style={{
								borderBottomWidth: 1,
								borderColor: '#000',
								paddingHorizontal: 20,
								paddingVertical: 10,
							}}
						>
							<Heading size={2}>All Divisions</Heading>
						</View>
					)}
					ItemSeparatorComponent={() => <ListItemSpacer />}
					renderItem={({ item, index }: ListRenderItemInfo<Division>) => {
						const inputRange = [-1, 0, MIN_HEIGHT * index, MIN_HEIGHT * (index + 2)]; // when the y is anything below the top of the flatlist, it will remain the same (-1)
						const scale = scrollY.interpolate({
							inputRange,
							outputRange: [1, 1, 1, 0],
						});
						console.log(scale)
						return (
							<ListItem
								id={item.DivisionId}
								title={item.DivisionName}
								description={item.DivisionNotes}
								onPress={() => onDivisionListItemPressHandler(item.DivisionId)}
								minHeight={MIN_HEIGHT}
								margin={SPACING}
								style={{ opacity: scale }}
							/>
						);
					}}
					keyExtractor={(item) => item.DivisionId.toString()}
				/>
				<View>
					<ButtonContainer>
						<Button type='primary' onPress={addDivisionHandler}>
							Add Army
						</Button>
					</ButtonContainer>
				</View>
			</View>
			<CustomModal heading='Create Division' toggleModalVisible={() => setShowArmyModal(!showArmyModal)} showModal={showArmyModal}>
				<KeyboardAwareScrollView>
					<View style={styles.modalContent}>
						<Controller
							control={control}
							name='DivisionName'
							render={({ field: { onChange, value, onBlur } }) => (
								<InputField
									label='Division Name'
									placeholder='i.e., French I Division V Corps'
									value={value}
									onChange={(val) => onChange(val)}
								/>
							)}
						/>
					</View>
					<View style={styles.modalFooter}>
						<Button type='primary' onPress={() => setShowArmyModal(false)}>
							Cancel
						</Button>
					</View>
				</KeyboardAwareScrollView>
			</CustomModal>
		</>
	);
};

export default ArmyCreatorHome;

const styles = StyleSheet.create({
	modalView: {
		backgroundColor: 'white',
		borderRadius: 20,
		justifyContent: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	modalHeader: {
		padding: 8,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignContent: 'center',
	},
	modalContent: {
		padding: 4,
	},
	modalFooter: {
		padding: 8,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
});

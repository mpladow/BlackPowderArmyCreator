import {
	StyleSheet,
	View,
	Pressable,
	Dimensions,
	FlatList,
} from 'react-native';
import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FontAwesome } from '@expo/vector-icons';
import Button from '../Components/Atoms/Button';
import ReferenceModal from './ReferenceModal';
import ReferenceListItem from './Atoms/ReferenceListItem';
import ListItemSpacer from '../Components/Atoms/ListItemSpacer';
import { useArmyContext } from '../Contexts/ArmyContext';
import Text from '../Components/Atoms/Text';
import { colors } from '../Themes/Styling';
import { useTheme } from '@react-navigation/native';
import { useThemeContext } from '../Contexts/ThemeContext';
import CustomModal from '../Components/Atoms/ModalCustom';
import Heading from '../Components/Atoms/Heading';
import { useReferenceContext } from '../Contexts/ReferenceContext';

const Reference = () => {
	const [focusedItem, setFocusedItem] = useState();
	const [showModal, setShowModal] = useState(false);
	const onPressHandler = (item) => {
		// open modal
		console.log(item, 'On Press ');
		setFocusedItem(item);
		setShowModal(!showModal);
	};
	const referenceItems = [
		{
			id: 1,
			name: 'Command',
			onPress: (item) => onPressHandler(item),
		},
		{
			id: 2,
			name: 'Movement',
			onPress: (item) => onPressHandler(item),
		},
		{
			id: 3,
			name: 'Hand-To-Hand Combat',
			onPress: (item) => onPressHandler(item),
		},
		{
			id: 4,
			name: 'Morale',
			onPress: (item) => onPressHandler(item),
		},
		{
			id: 5,
			name: 'Shooting',
			onPress: (item) => onPressHandler(item),
		},
		{
			id: 6,
			name: 'Size Modifiers',
			onPress: (item) => onPressHandler(item),
		},
	];

	const referenceContext = useReferenceContext();

	const onCloseHandler = () => {
		setShowModal(false);
		setFocusedItem(undefined);
	};

	const renderContent = () => {
		return <ReferenceModal category={focusedItem} />;
	};
	const renderStickyHeader = () => {
		return (
			<View style={{ padding: 20 }}>
				<Text>
					Find quick references here. You can add
					more quick reference items viea the menu
					at the top right corner.
				</Text>
			</View>
		);
	};
	return (
		<View>
			<View style={{ padding: 20 }}>
				<Text>
					Find quick references here. You can add
					more quick reference items viea the menu
					at the top right corner.
				</Text>
			</View>
			<View>
				<FlatList
					// stickyHeaderIndices={[1]}
					keyExtractor={(item) => item.id.toString()}
					data={referenceItems}
					ItemSeparatorComponent={() => (
						<ListItemSpacer />
					)}
					renderItem={({ item }) => (
						<ReferenceListItem
							name={item.name}
							onPress={item.onPress}
							icon={null}
						/>
					)}
				/>
			</View>

			<CustomModal
				heading={focusedItem}
				toggleModalVisible={() =>
					setShowModal(!showModal)
				}
				showModal={showModal}
			>
				<KeyboardAwareScrollView>
					<View style={styles.modalContent}>
						{renderContent()}
					</View>
					<View style={styles.modalFooter}></View>
				</KeyboardAwareScrollView>
			</CustomModal>
		</View>
	);
};

export default Reference;

const styles = StyleSheet.create({
	//   listItem: {
	//     flex: 1,
	//   },
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		marginTop: 22,
		paddingHorizontal: 4,
	},
	modalLight: {
		backgroundColor: colors.offWhite1,
	},
	modalDark: { backgroundColor: colors.grey2 },

	modalView: {
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

import { Modal, StyleSheet, Text, View, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { useThemeContext } from "../../Contexts/ThemeContext";
import { colors } from "../../Themes/Styling";
import Heading from "./Heading";
import { FontAwesome } from "@expo/vector-icons";

type Props = {
	toggleModalVisible: () => void;
showModal: boolean;
heading: string;
}
const CustomModal: React.FC<Props> = ({toggleModalVisible, showModal, heading, children}) => {
  const theme = useTheme();
  const currentTheme = useThemeContext();
  return (
		<Modal
			animationType='fade'
			transparent={true}
			visible={showModal}
			onRequestClose={() => {
				toggleModalVisible();
			}}
		>
			<Pressable
				style={styles.centeredView}
				onPress={toggleModalVisible}
			>
				<TouchableOpacity
					onPress={() =>
						console.log('do nothing')
					}
					activeOpacity={1}
					style={[
						currentTheme.isDarkTheme
							? styles.modalDark
							: styles.modalLight,
						styles.modalView,
					]}
				>
					<View style={styles.modalHeader}>
						<Heading size={2}>
							{heading}
						</Heading>
						<Pressable
							onPress={
								toggleModalVisible
							}
						>
							<FontAwesome
								name='times'
								size={20}
								color={
									theme
										.colors
										.text
								}
							/>
						</Pressable>
					</View>
					{children}
				</TouchableOpacity>
			</Pressable>
		</Modal>
  );
};

export default CustomModal;
const styles = StyleSheet.create({
  //   listItem: {
  //     flex: 1,
  //   },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 22,
    paddingHorizontal: 4,
  },
  modalLight: {
    backgroundColor: colors.offWhite1,
  },
  modalDark: { backgroundColor: colors.grey2 },

  modalView: {
    borderRadius: 20,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 8
  },
  modalHeader: {
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  modalContent: {
    padding: 4,
  },
  modalFooter: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

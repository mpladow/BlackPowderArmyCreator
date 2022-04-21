import { Modal, StyleSheet, Text, View, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { useThemeContext } from "../../Contexts/ThemeContext";
import { colors } from "../../Constants/Styling";
import Heading from "./Heading";
import { FontAwesome } from "@expo/vector-icons";

const CustomModal = (props) => {
  const theme = useTheme();
  const currentTheme = useThemeContext();
  return (
		<Modal
			animationType='fade'
			transparent={true}
			visible={props.showModal}
			onRequestClose={() => {
				props.toggleModalVisible();
			}}
		>
			<TouchableOpacity
				style={styles.centeredView}
				onPress={props.toggleModalVisible}
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
							{props.heading}
						</Heading>
						<Pressable
							onPress={
								props.toggleModalVisible
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
					{props.children}
				</TouchableOpacity>
			</TouchableOpacity>
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

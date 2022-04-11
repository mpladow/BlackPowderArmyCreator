import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native';
import { useThemeContext } from '../../../Contexts/ThemeContext';
import { Colors } from '../../../Constants/Styling';
const CustomModal = (props) => {
    const theme = useTheme();
    const currentTheme = useThemeContext()
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={props.showModal}
    onRequestClose={() => {
      props.toggleModalVisible();
    }}
  >
    <View style={styles.centeredView}>
          <View style={[ currentTheme.isDarkTheme? styles.modalDark: styles.modalLight,  styles.modalView]}>
  {props.children}
      </View>
    </View>
  </Modal>
  )
}

export default CustomModal
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
        backgroundColor: Colors.offWhite1,
      },
      modalDark: {backgroundColor: Colors.grey2},
    
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
    
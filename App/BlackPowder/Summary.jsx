import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Modal,
  Alert,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import ListItem from "../Components/Atoms/ListItem";
import Button from "../Components/Atoms/Button";
import ButtonContainer from "../Components/Atoms/ButtonContainer";
import { FontAwesome } from "@expo/vector-icons";
import Input from "../Components/Atoms/Input";
import { Controller, useForm } from "react-hook-form";
import { onChange } from "react-native-reanimated";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Summary = () => {
  const [showArmyModal, setShowArmyModal] = useState(false);
  const {
    control, 
    handleSubmit, 
    formState: {errors, isValid}
  } = useForm({mode: "onChange", defaultValues: {ArmyName: ""}})

  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
  ];

  const addArmyHandler = () => {
    // open up a modal to add a new army
    console.log("Add Army");
    setShowArmyModal(!showArmyModal);
  };
  return (
    <View>
      <Text>
        A lst of every single Black Powder army built. Cna include number of{" "}
      </Text>
      <FlatList
        data={DATA}
        renderItem={(item) => <ListItem title={item.item.title} />}
        keyExtractor={(item) => item.id}
      />
      <View>
        <ButtonContainer>
          <Button type="primary" onPress={addArmyHandler}>
            Add Army
          </Button>
        </ButtonContainer>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showArmyModal}
        onRequestClose={() => {
          setShowArmyModal(!showArmyModal);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <KeyboardAwareScrollView>
            <View style={styles.modalHeader}>
                <Text>Create Army</Text>
                <Pressable onPress={()=> setShowArmyModal(false)}><FontAwesome name="times" size={24} color="black" /></Pressable>
            </View>
            <View style={styles.modalContent}>
              <Controller control={control}
              name="ArmyName"
              render={({field: {onChange, value, onBlur}}) => (            
                <Input            
                  label="Army Name"            
                  placeholder="i.e., French I Corps"            
                  value={value}            
                  onChange={val => onChange(val)}          
                />        
              )} 
              />
              
            </View>
            <View style={styles.modalFooter}>
              <Button type="primary" onPress={() => setShowArmyModal(false)}>
                Cancel
              </Button>
            </View>
            </KeyboardAwareScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Summary;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 22,
    paddingHorizontal: 4
  },
  modalView: {
    backgroundColor: "white",
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
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

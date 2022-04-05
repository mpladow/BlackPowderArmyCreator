import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useForm } from "react-hook-form";
import { TextInput } from "react-native-web";

const CreateArmy = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      faction: "",
    },
  });

  return (
    <View>
      <Controller
        controler={control}
        rules={{ required: true }}
        name="name"
        render={({ field: { onChange, value } }) => {
          <>
            <Label>Army Name</Label>
            <TextInput onChange={onChange} value={value} />
          </>;
        }}
      />
      <Controller
        controler={control}
        name="faction"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => {
          <>
            <Label>Faction</Label>
            <TextInput onChange={onChange} value={value} />
          </>;
        }}
      />
      <Text>Popup that allows the user to select the nation, name of army</Text>
    </View>
  );
};

export default CreateArmy;

const styles = StyleSheet.create({});

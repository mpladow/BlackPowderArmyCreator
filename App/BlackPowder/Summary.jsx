import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import ListItem from '../Components/Atoms/ListItem';
import Button from '../Components/Atoms/Button';
import ButtonContainer from '../Components/Atoms/ButtonContainer';

const Summary = () => {
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  const addArmyHandler = () => {
    // open up a modal to add a new army
    console.log("Add Army")
  }
  return (
    <View>
      <Text>A lst of every single Black Powder army built. Cna include number of </Text>
      <FlatList
        data={DATA}
        renderItem={(item) => (<ListItem title={item.item.title}/>)}
        keyExtractor={item => item.id}
      /> 
      <View>
        <ButtonContainer>
      <Button type="primary" onPress={addArmyHandler}>Add Army</Button>
        </ButtonContainer>
      </View>
      
         </View>
  )
}

export default Summary

const styles = StyleSheet.create({})
import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '../../../Components/Atoms/Button'
import { Ionicons, Entypo } from '@expo/vector-icons';

const DivisionCommanderListItem = ({commander, onRemoveDivisionCommanderPress, onEditDivisionCommanderPress}) => {
  if (commander) {
return (
<View
						style={{
							flexDirection: 'row',
							justifyContent:
								'space-between',
							alignItems: 'center',
						}}
					>
						<View style={{ flex: 1 }}>
							<Text>
								{
									commander
										.DivisionCommanderName
								}
							</Text>
						</View>
						<View
							style={{
								flex: 1,
								alignItems: 'flex-end',
							}}
						>
							<Pressable
								onPress={() =>
									onRemoveDivisionCommanderPress()
								}
							>
								<Ionicons
									name='remove-circle-outline'
									size={
										24
									}
									color='red'
								/>
							</Pressable>
						</View>
					</View>
)
}

export default DivisionCommanderListItem

const styles = StyleSheet.create({})
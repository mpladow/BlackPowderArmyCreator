import {
	StyleSheet,
	Text,
	View,
	Pressable,
	TouchableOpacity,
} from 'react-native';
import React from 'react';
import HomeStack from './ListCreator/HomeStack';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import Reference from './Reference/Reference';
import { useThemeContext } from '../../Contexts/ThemeContext';
import CombatAssistantStack from './CombatAssistant/CombatAssistantStack';
import { useTheme } from '@react-navigation/native';
import { colors } from '../../Themes/Styling';
import ScoringStack from './Scoring/ScoringStack';

const CustomTabBarButton = ({ children, onPress }) => {
	const theme = useTheme();
	return (
		<TouchableOpacity
			style={{
				top: -30,
				justifyContent: 'center',
				alignItems: 'center',
				...styles.shadow,
			}}
			onPress={onPress}
		>
			<View
				style={{
					width: 70,
					height: 70,
					borderRadius: 35,
					backgroundColor: theme.colors.primary,
				}}
			>
				{children}
			</View>
		</TouchableOpacity>
	);
};
const MainTabs = () => {
	const Tab = createBottomTabNavigator();
	const theme = useThemeContext();
	const currentTheme = useTheme();

	return (
		<Tab.Navigator
			screenOptions={{
				tabBarHideOnKeyboard: true,	
				tabBarLabelStyle: {
					fontFamily: 'Poppins_400Regular',
				},
				tabBarShowLabel: false,
				tabBarActiveTintColor: theme.currentTheme?.colors.primary,
				tabBarInactiveTintColor: theme.currentTheme?.colors.text,

				headerShown: false,
				headerShadowVisible: false,
				// tabBarStyle: {
				// 	position: 'absolute',
				// 	bottom: 20,
				// 	left: 20,
				// 	right: 20,
				// 	elevation: 0,
				// 	backgroundColor: currentTheme.dark
				// 		? colors.grey1
				// 		: colors.offWhite1,
				// 	borderRadius: 15,
				// 	height: 50,
				// 	...styles.shadow,
				// },
			}}
		>
			<Tab.Screen
				options={{
					headerShadowVisible: false,
					headerTitleStyle: {
						fontFamily: 'NotoSans_700Bold',
						fontSize: 24,
					},
					tabBarIcon: ({ color, size }) => (
						<Entypo
							name='list'
							size={size}
							color={color}
						/>
					),
				}}
				name='Home'
				component={HomeStack}
			/>
			<Tab.Screen
				options={{
					headerShadowVisible: false,
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name='scoreboard-outline'
							size={24}
							color={color}
						/>
					),
				}}
				name='Tracker'
				component={ScoringStack}
			/>
			{/* <Tab.Screen
				options={{
					headerShadowVisible: false,
					headerTitle: 'Quick Reference Sheet',
					headerTitleStyle: {
						fontFamily: 'NotoSans_700Bold',
						fontSize: 18,
					},
					headerShown: true,
					tabBarIcon: ({ color, size }) => (
						<Entypo
							name='text-document'
							size={18}
							color={color}
						/>
					),
					tabBarLabel: '',
					tabBarButton: (props) => (
						<CustomTabBarButton
							{...props}
						/>
					),
				}}
				name='Reference'
				component={Reference}
			/> */}

			<Tab.Screen
				options={{
					headerShadowVisible: false,
					headerTitle: 'Quick Reference Sheet',
					headerTitleStyle: {
						fontFamily: 'NotoSans_700Bold',
						fontSize: 18,
					},
					headerShown: true,
					tabBarIcon: ({ color, size }) => (
						<Entypo
							name='text-document'
							size={18}
							color={color}
						/>
					),
				}}
				name='Reference'
				component={Reference}
			/>
			<Tab.Screen
				options={{
					headerShadowVisible: false,
					headerTitle: 'Quick Reference Sheet',
					headerTitleStyle: {
						fontFamily: 'NotoSans_700Bold',
						fontSize: 18,
					},
					headerShown: true,
					tabBarIcon: ({ color, size }) => (
						<Entypo
							name='text-document'
							size={18}
							color={color}
						/>
					),
				}}
				name='Victory Points'
				component={Reference}
			/>
		</Tab.Navigator>
	);
};

export default MainTabs;

const styles = StyleSheet.create({
	shadow: {
		shadowColor: '#191230',
		shadowOffset: {
			width: 0,
			height: 15,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.5,
		elevation: 5,
	},
});

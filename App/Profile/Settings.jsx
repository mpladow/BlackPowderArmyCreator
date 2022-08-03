import { StyleSheet, Switch, View } from 'react-native';
import React from 'react';
import Text from '../Components/Atoms/Text';

import { useThemeContext } from '../Contexts/ThemeContext';
import Container from '../Components/Atoms/Container';

const Settings = () => {
	const themeContext = useThemeContext();
	return (
		<Container>
			<View style={{ flexDirection: 'row' }}>
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Text>Curent Theme: {themeContext.isDarkTheme ? 'Dark' : 'Light'}</Text>
				</View>
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
					<Switch
						trackColor={{ false: '#767577', true: '#81b0ff' }}
						thumbColor={themeContext.currentTheme.primary}
						ios_backgroundColor='#3e3e3e'
						onValueChange={themeContext.toggleDarkMode}
						value={themeContext.isDarkTheme}
					/>
				</View>
			</View>
		</Container>
	);
};

export default Settings;

const styles = StyleSheet.create({});

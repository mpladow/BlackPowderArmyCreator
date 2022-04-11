import { StyleSheet, Switch, View } from 'react-native'
import React from 'react'
import Text from '../Components/Atoms/Text';

import { useThemeContext } from '../../Contexts/ThemeContext'
import TextContainer from '../Components/Atoms/TextContainer';

const Settings = () => {
const themeContext = useThemeContext();
  return (
    <View>
      <TextContainer>
      <Text>Curent Theme: {themeContext.isDarkTheme? 'Dark' : 'Light'}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={themeContext.isDarkTheme ? themeContext.DarkThemeCustom.primary : themeContext.LightThemeCustom.primary}
        ios_backgroundColor="#3e3e3e"
        onValueChange={themeContext.toggleDarkMode}
        value={themeContext.isDarkTheme}
      />
      </TextContainer>
     
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({})
import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useContext, useState } from 'react'
import { Colors } from '../Constants/Styling';

const ThemeContext = createContext(undefined);

const ThemeProvider = ({ children }) => {
  // Manage theme state
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkTheme(!isDarkTheme);
  }
  return (
      <ThemeContext.Provider
          value={{ isDarkTheme, toggleDarkMode, LightThemeCustom, DarkThemeCustom }}>
          {children}
      </ThemeContext.Provider>
  )
}
// const LightThemeCustom = {
//   dark: false,
//   colors: {
//     text: '#121F19',
//     primary: '#0F7A6C',
//     background: '#E5EEF0',
//     card: '#72A1AD',
//     border: '#0F7A6C',
//     notification: '#0F7A6C'
//   }

// }
// const DarkThemeCustom = {
//   dark: true,
//   colors: {
//     text: '#E5EEF0',
//     primary: '#0F7A6C',
//     background: '#222B30',
//     card: '#72A1AD',
//     border: '#0F7A6C',
//     notification: '#0F7A6C'
//   }
// }
// primary: '#0F7A6C',
// secondary: '##72A1AD',
// grey1: '#485C66',
// grey2: '#222B30',
// lightGrey1: '#222B30',
// lightGrey2: '#222B30',
// offWhite1: '#222B30',
// black: '#222B30'
// }
const LightThemeCustom = {
  dark: false,
  colors: {
    text: Colors.black,
    primary: Colors.aquaMain,
    background: Colors.offWhite1,
    card: Colors.offWhite1,
    border: Colors.aquaMain,
    notification: '#0F7A6C'
  }

}
const DarkThemeCustom = {
  dark: true,
  colors: {
    text: Colors.offWhite1,
    primary: Colors.aquaMain,
    background: Colors.black,
    card: Colors.black,
    border: Colors.aquaMain,
    notification: '#0F7A6C'
  }
}





export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme can only be used wtihin an ArmyProvider")
  }
    return context;
}
export default ThemeProvider

const styles = StyleSheet.create({})
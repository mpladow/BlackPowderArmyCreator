import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useContext, useState } from 'react'
import { colors } from '../Constants/Styling';

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
    text: colors.black,
    primary: colors.aquaMain,
    background: colors.offWhite1,
    card: colors.offWhite1,
    border: colors.aquaMain,
    notification: '#0F7A6C'
  }

}
const DarkThemeCustom = {
  dark: true,
  colors: {
    text: colors.offWhite1,
    primary: colors.aquaMain,
    background: colors.black,
    card: colors.black,
    border: colors.aquaMain,
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
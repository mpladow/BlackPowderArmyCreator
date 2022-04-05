import { StyleSheet, Text, View } from 'react-native'
import React, { createContext } from 'react'

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  // Manage theme state
  const [theme, setTheme] = useState('light');

  const handleThemeChange = (theme) => {
setTheme(theme);
  }
  return (
      <ThemeContext.Provider
          value={{ theme, setTheme, handleThemechange }}>
          {children}
      </ThemeContext.Provider>
  )
}

export default {ThemeProvider, ThemeContext}

const styles = StyleSheet.create({})
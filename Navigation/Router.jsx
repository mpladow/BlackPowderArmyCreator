import { StyleSheet, Text, View, Modal, useColorScheme } from "react-native";
import React from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import MainTabs from "./MainTabs";
import DrawerPages from "./DrawerPages";
import Settings from "../App/Profile/Settings";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ThemeProvider, { useThemeContext } from "../Contexts/ThemeContext";
import ArmyProvider from "../Contexts/ArmyContext";
import { StatusBar } from "expo-status-bar";
import { colors } from "../Constants/Styling";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ReferenceProvider from "../Contexts/ReferenceContext";
import Summary from "../App/BlackPowder/Summary";
import Prototype from "../App/Debug/Prototype";

const Router = () => {
  const RootStack = createNativeStackNavigator();
  const theme = useThemeContext();

  return (
      <NavigationContainer
        theme={
          theme.isDarkTheme ? theme.DarkThemeCustom : theme.LightThemeCustom
        }
      >
        <RootStack.Navigator>
          <RootStack.Group screenOptions={{ headerShown: false }}>
            <RootStack.Screen name="MainTabs" component={MainTabs} />
          </RootStack.Group>
        </RootStack.Navigator>
      </NavigationContainer>
  );
  // return (
  //       <SafeAreaProvider>
  //         {/* <SafeAreaView style={{ flex: 1 }}> */}
  //           <View

  //           >
  //             <NavigationContainer
  //             >
  //               <RootStack.Navigator>
  //                 {/* <DrawerPages/> */}
  //                 <RootStack.Screen name="Prototype" component={Prototype} />

  //                 {/* <RootStack.Group screenOptions={{ headerShown: false }}>
  //                   <RootStack.Screen name="MainTabs" component={MainTabs} />
  //                 </RootStack.Group>
  //                 <RootStack.Group screenOptions={{ presentation: "modal" }}>
  //                   <RootStack.Screen name="Settings" component={Settings} />
  //                 </RootStack.Group> */}
  //               </RootStack.Navigator>
  //             </NavigationContainer>
  //             {/* <StatusBar
  //               style={theme.isDarkTheme ? "light" : "dark"}
  //               backgroundColor={
  //                 theme.isDarkTheme ? colors.black : colors.offWhite1
  //               }
  //             /> */}
  //           </View>
  //         {/* </SafeAreaView> */}
  //       </SafeAreaProvider>
  // );
  // return (
  //   <ReferenceProvider>
  //     <ArmyProvider>
  //       <SafeAreaProvider>
  //         {/* <SafeAreaView style={{ flex: 1 }}> */}
  //           <View
  //             style={[
  //               styles.container,
  //               theme.isDarkTheme
  //                 ? { backgroundColor: colors.black }
  //                 : { backgroundColor: colors.offWhite1 },
  //             ]}
  //           >
  //             <NavigationContainer
  //               theme={
  //                 theme.isDarkTheme
  //                   ? theme.DarkThemeCustom
  //                   : theme.LightThemeCustom
  //               }
  //             >
  //               <RootStack.Navigator>
  //                 {/* <DrawerPages/> */}
  //                 <RootStack.Screen name="Prototype" component={Prototype} />

  //                 {/* <RootStack.Group screenOptions={{ headerShown: false }}>
  //                   <RootStack.Screen name="MainTabs" component={MainTabs} />
  //                 </RootStack.Group>
  //                 <RootStack.Group screenOptions={{ presentation: "modal" }}>
  //                   <RootStack.Screen name="Settings" component={Settings} />
  //                 </RootStack.Group> */}
  //               </RootStack.Navigator>
  //             </NavigationContainer>
  //             {/* <StatusBar
  //               style={theme.isDarkTheme ? "light" : "dark"}
  //               backgroundColor={
  //                 theme.isDarkTheme ? colors.black : colors.offWhite1
  //               }
  //             /> */}
  //           </View>
  //         {/* </SafeAreaView> */}
  //       </SafeAreaProvider>
  //     </ArmyProvider>
  //   </ReferenceProvider>
  // );
};
export default Router;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
  },
});
